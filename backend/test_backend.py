import io
import sys
import unittest
sys.path.insert(0, 'backend')
import app
import pandas as pd
import numpy as np

class TestCreditGuardBackend(unittest.TestCase):
    def setUp(self):
        app.app.testing = True
        self.client = app.app.test_client()

    def test_health_endpoint(self):
        response = self.client.get('/api/health')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data.get('status'), 'ok')
        self.assertTrue(data.get('model_loaded'))
        self.assertEqual(data.get('features_required'), 30)
        print("[PASS] Health endpoint test passed:", data)

    def test_analyze_valid_csv(self):
        # Create a valid test DataFrame with 30 features (3 genuine rows, 1 fraud row)
        cols = app.REQUIRED_FEATURES
        data = {col: [0.0, 0.5, -0.2] for col in cols}
        # Genuine row 1
        data['Amount'] = [45.50, 120.00, 1809.21]
        data['Time'] = [100.0, 200.0, 472.0]
        # Make the 3rd row an extreme fraud signature (extreme V14, V4, V10, V12)
        data['V14'][2] = -8.125
        data['V4'][2] = 4.882
        data['V10'][2] = -6.654
        data['V12'][2] = -6.421
        data['V17'][2] = -8.954
        
        # Include optional metadata columns to test preservation
        data['Transaction ID'] = ['TXN-001', 'TXN-002', 'TXN-003']
        data['Merchant'] = ['Target', 'Best Buy', 'Crypto Store']
        data['Class'] = [0, 0, 1]  # Ground truth column that should be excluded from X

        df = pd.DataFrame(data)
        csv_bytes = io.BytesIO(df.to_csv(index=False).encode('utf-8'))

        response = self.client.post('/api/analyze', data={'file': (csv_bytes, 'test_transactions.csv')}, content_type='multipart/form-data')
        self.assertEqual(response.status_code, 200)
        res_data = response.get_json()
        self.assertTrue(res_data.get('success'))
        summary = res_data.get('summary')
        self.assertEqual(summary.get('total_transactions'), 3)
        self.assertIn('genuine_count', summary)
        self.assertIn('fraud_count', summary)
        txns = res_data.get('transactions')
        self.assertEqual(len(txns), 3)
        self.assertEqual(txns[0]['id'], 'TXN-001')
        self.assertIn('prediction', txns[0])
        self.assertIn('status', txns[0])
        self.assertIn('score', txns[0])
        print("[PASS] Valid CSV analysis test passed. Summary:", summary)
        print("  Sample transaction output:", txns[0])

    def test_analyze_missing_features_csv(self):
        # Only 3 features provided instead of 30
        df = pd.DataFrame({'Time': [1.0], 'Amount': [10.0], 'V1': [0.5]})
        csv_bytes = io.BytesIO(df.to_csv(index=False).encode('utf-8'))
        response = self.client.post('/api/analyze', data={'file': (csv_bytes, 'invalid.csv')}, content_type='multipart/form-data')
        self.assertEqual(response.status_code, 400)
        data = response.get_json()
        self.assertIn('error', data)
        self.assertIn('missing_features', data)
        print("[PASS] Missing features rejection test passed:", data.get('error'))

    def test_analyze_empty_csv(self):
        csv_bytes = io.BytesIO(b"")
        response = self.client.post('/api/analyze', data={'file': (csv_bytes, 'empty.csv')}, content_type='multipart/form-data')
        self.assertEqual(response.status_code, 400)
        print("[PASS] Empty CSV rejection test passed:", response.get_json().get('error'))

if __name__ == '__main__':
    unittest.main()

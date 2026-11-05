import urllib.request
import urllib.error
import uuid
import json

def test_valid_batch():
    with open('backend/sample_credit_card_batch.csv', 'rb') as f:
        csv_bytes = f.read()

    boundary = f'----WebKitFormBoundary{uuid.uuid4().hex}'
    header = f'--{boundary}\r\nContent-Disposition: form-data; name="file"; filename="sample_batch.csv"\r\nContent-Type: text/csv\r\n\r\n'.encode('utf-8')
    footer = f'\r\n--{boundary}--\r\n'.encode('utf-8')
    body = header + csv_bytes + footer

    req = urllib.request.Request(
        'http://localhost:5173/api/analyze',
        data=body,
        headers={'Content-Type': f'multipart/form-data; boundary={boundary}'}
    )

    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        print('[PASS] Valid Batch Analyze via Vite Proxy HTTP Status:', resp.status)
        print('       Summary:', data.get('summary'))
        print('       Total transactions:', len(data.get('transactions', [])))
        print('       Sample row 0 (Genuine):', data['transactions'][0]['id'], data['transactions'][0]['status'], f"Score={data['transactions'][0]['score']}")
        print('       Sample row 1 (Fraud):', data['transactions'][1]['id'], data['transactions'][1]['status'], f"Score={data['transactions'][1]['score']}")

def test_invalid_batch():
    invalid_csv = b'Time,Amount,V1\n100,25.5,0.1\n'
    boundary = f'----WebKitFormBoundary{uuid.uuid4().hex}'
    header = f'--{boundary}\r\nContent-Disposition: form-data; name="file"; filename="invalid.csv"\r\nContent-Type: text/csv\r\n\r\n'.encode('utf-8')
    footer = f'\r\n--{boundary}--\r\n'.encode('utf-8')
    body = header + invalid_csv + footer

    req = urllib.request.Request(
        'http://localhost:5173/api/analyze',
        data=body,
        headers={'Content-Type': f'multipart/form-data; boundary={boundary}'}
    )

    try:
        with urllib.request.urlopen(req) as resp:
            print('[FAIL] Expected 400 but got:', resp.status)
    except urllib.error.HTTPError as e:
        err_data = json.loads(e.read().decode())
        print(f'[PASS] Invalid CSV rejected with HTTP {e.code}')
        print('       Error message:', err_data.get('error'))
        print('       Missing features count:', len(err_data.get('missing_features', [])))

if __name__ == '__main__':
    test_valid_batch()
    test_invalid_batch()

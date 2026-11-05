import sys
import os
import joblib
import pandas as pd
import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import app

records = []

# 1. Genuine Transaction 1 (Small retail)
r1 = {c: 0.0 for c in app.REQUIRED_FEATURES}
r1['Time'] = 120.0
r1['Amount'] = 45.50
r1['V1'] = -0.925
r1['V2'] = 0.729
r1['V3'] = 1.579
r1['V4'] = -0.095
r1['Transaction ID'] = 'TXN-84291'
r1['Date & Time'] = '2026-11-05 14:32:18'
r1['Merchant'] = 'Whole Foods Market #102'
r1['Channel'] = 'POS Contactless'
records.append(r1)

# 2. Fraud Transaction 1 (High velocity anomaly)
r2 = {c: 0.0 for c in app.REQUIRED_FEATURES}
r2['Time'] = 40000.0
r2['Amount'] = 1809.21
r2['V1'] = -4.0
r2['V2'] = 3.5
r2['V3'] = -6.0
r2['V4'] = 6.0
r2['V5'] = -3.0
r2['V6'] = -1.5
r2['V7'] = -6.0
r2['V8'] = 2.0
r2['V9'] = -3.0
r2['V10'] = -8.0
r2['V11'] = 5.0
r2['V12'] = -8.0
r2['V14'] = -9.0
r2['V16'] = -5.0
r2['V17'] = -9.0
r2['V18'] = -3.0
r2['V19'] = 2.0
r2['Transaction ID'] = 'TXN-84292'
r2['Date & Time'] = '2026-11-05 14:30:05'
r2['Merchant'] = 'Digital Electronics Online'
r2['Channel'] = 'E-Commerce CNP'
records.append(r2)

# 3. Genuine Transaction 2 (Subscription)
r3 = {c: 0.0 for c in app.REQUIRED_FEATURES}
r3['Time'] = 1450.0
r3['Amount'] = 12.99
r3['V1'] = 0.125
r3['V2'] = -0.042
r3['V3'] = 0.812
r3['Transaction ID'] = 'TXN-84293'
r3['Date & Time'] = '2026-11-05 14:28:44'
r3['Merchant'] = 'Spotify Premium'
r3['Channel'] = 'Subscription Recurring'
records.append(r3)

# 4. Genuine Transaction 3 (Enterprise B2B)
r4 = {c: 0.0 for c in app.REQUIRED_FEATURES}
r4['Time'] = 12450.0
r4['Amount'] = 890.00
r4['V1'] = 1.189
r4['V2'] = 0.014
r4['V3'] = 0.542
r4['Transaction ID'] = 'TXN-84294'
r4['Date & Time'] = '2026-11-05 14:25:10'
r4['Merchant'] = 'Cloud Services EU'
r4['Channel'] = 'B2B Wire'
records.append(r4)

# 5. Fraud Transaction 2 (Card Takeover)
r5 = {c: 0.0 for c in app.REQUIRED_FEATURES}
r5['Time'] = 40500.0
r5['Amount'] = 2125.87
r5['V1'] = -4.5
r5['V2'] = 3.8
r5['V3'] = -6.5
r5['V4'] = 6.2
r5['V5'] = -3.2
r5['V7'] = -6.2
r5['V10'] = -8.5
r5['V11'] = 5.2
r5['V12'] = -8.3
r5['V14'] = -9.4
r5['V16'] = -5.2
r5['V17'] = -9.3
r5['Transaction ID'] = 'TXN-84295'
r5['Date & Time'] = '2026-11-05 14:20:55'
r5['Merchant'] = 'Luxury Jewelry Exchange'
r5['Channel'] = 'E-Commerce CNP'
records.append(r5)

# 6. Genuine Transaction 4 (Petrol)
r6 = {c: 0.0 for c in app.REQUIRED_FEATURES}
r6['Time'] = 18200.0
r6['Amount'] = 68.20
r6['V1'] = 0.421
r6['V2'] = -0.184
r6['Transaction ID'] = 'TXN-84296'
r6['Date & Time'] = '2026-11-05 14:15:30'
r6['Merchant'] = 'Shell Petrol Station'
r6['Channel'] = 'EMV Chip In-Person'
records.append(r6)

# 7. Genuine Transaction 5 (Hotel)
r7 = {c: 0.0 for c in app.REQUIRED_FEATURES}
r7['Time'] = 21400.0
r7['Amount'] = 320.00
r7['V1'] = -0.321
r7['V2'] = 0.095
r7['Transaction ID'] = 'TXN-84297'
r7['Date & Time'] = '2026-11-05 14:10:02'
r7['Merchant'] = 'Hilton Hotels'
r7['Channel'] = 'Hotel Terminal'
records.append(r7)

# 8. Genuine Transaction 6 (Coffee)
r8 = {c: 0.0 for c in app.REQUIRED_FEATURES}
r8['Time'] = 25000.0
r8['Amount'] = 5.40
r8['V1'] = 0.014
r8['Transaction ID'] = 'TXN-84298'
r8['Date & Time'] = '2026-11-05 14:04:19'
r8['Merchant'] = 'Starbucks Coffee #441'
r8['Channel'] = 'Mobile Wallet NFC'
records.append(r8)

df = pd.DataFrame(records)
df.to_csv('backend/sample_credit_card_batch.csv', index=False)
df.to_csv('frontend/public/sample_credit_card_batch.csv', index=False)

preds = app.model.predict(df[app.REQUIRED_FEATURES])
probas = app.model.predict_proba(df[app.REQUIRED_FEATURES])
print(f"Generated {len(df)} authentic transactions.")
for idx in range(len(df)):
    t_id = df.iloc[idx]['Transaction ID']
    p = preds[idx]
    fraud_prob = probas[idx][1]
    status = "Potential Fraud" if p == 1 else "Genuine"
    print(f"  {t_id}: Status={status} (Fraud Prob={fraud_prob:.1%})")

print(f"Summary: Total={len(preds)}, Genuine={int(np.sum(preds == 0))}, Fraud={int(np.sum(preds == 1))}")

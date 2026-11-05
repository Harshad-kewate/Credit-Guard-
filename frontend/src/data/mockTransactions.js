/**
 * Credit Guard - Realistic Demo Transactions Ledger
 * For testing search, filtering, pagination, and detail views.
 * Contains only realistic customer transaction metadata (no V1-V28 technical PCA features).
 */

export const INITIAL_DEMO_TRANSACTIONS = [
  {
    id: 'TXN-84291',
    timestamp: '2026-11-05 14:32:18',
    amount: 45.50,
    currency: 'USD',
    merchant: 'Whole Foods Market #102',
    channel: 'POS Contactless',
    cardLast4: '4821',
    status: 'Genuine',
    flagReason: 'Normal domestic consumer purchase profile'
  },
  {
    id: 'TXN-84292',
    timestamp: '2026-11-05 14:30:05',
    amount: 1809.21,
    currency: 'USD',
    merchant: 'Digital Electronics Store Online',
    channel: 'E-Commerce CNP',
    cardLast4: '3190',
    status: 'Potential Fraud',
    flagReason: 'High-velocity transaction exceeding typical cardholder variance'
  },
  {
    id: 'TXN-84293',
    timestamp: '2026-11-05 14:28:44',
    amount: 12.99,
    currency: 'USD',
    merchant: 'Spotify Premium Recurring',
    channel: 'Subscription Recurring',
    cardLast4: '9012',
    status: 'Genuine',
    flagReason: 'Recurring bill pattern confirmed'
  },
  {
    id: 'TXN-84294',
    timestamp: '2026-11-05 14:25:10',
    amount: 890.00,
    currency: 'USD',
    merchant: 'Enterprise Cloud Services EU',
    channel: 'B2B Invoice Wire',
    cardLast4: '7721',
    status: 'Pending',
    flagReason: 'Awaiting model batch inference or secondary manual review'
  },
  {
    id: 'TXN-84295',
    timestamp: '2026-11-05 14:20:55',
    amount: 2125.87,
    currency: 'USD',
    merchant: 'Luxury Jewelry Exchange',
    channel: 'E-Commerce CNP',
    cardLast4: '1104',
    status: 'Potential Fraud',
    flagReason: 'Mismatched geolocation and sudden spending volume anomaly'
  },
  {
    id: 'TXN-84296',
    timestamp: '2026-11-05 14:15:30',
    amount: 68.20,
    currency: 'USD',
    merchant: 'Shell Petrol Station',
    channel: 'EMV Chip In-Person',
    cardLast4: '5561',
    status: 'Genuine',
    flagReason: 'Physical chip authorization verified'
  },
  {
    id: 'TXN-84297',
    timestamp: '2026-11-05 14:10:02',
    amount: 320.00,
    currency: 'USD',
    merchant: 'Hilton Hotels & Resorts',
    channel: 'Terminal Hotel Check-in',
    cardLast4: '6743',
    status: 'Pending',
    flagReason: 'Awaiting batch model scoring'
  },
  {
    id: 'TXN-84298',
    timestamp: '2026-11-05 14:04:19',
    amount: 5.40,
    currency: 'USD',
    merchant: 'Starbucks Coffee #441',
    channel: 'Mobile Wallet NFC',
    cardLast4: '4821',
    status: 'Genuine',
    flagReason: 'Standard tokenized consumer activity'
  }
];

export const DEMO_CSV_STRING = `Transaction_ID,Date_Time,Amount,Merchant,Channel
TXN-90101,2026-11-05 15:01:22,89.50,Target Store #402,POS Terminal
TXN-90102,2026-11-05 15:02:40,2450.00,Crypto Exchange Transfer,Online CNP
TXN-90103,2026-11-05 15:05:11,14.20,Starbucks Store #19,NFC Mobile
TXN-90104,2026-11-05 15:10:05,650.00,Best Buy Electronics,Online CNP
TXN-90105,2026-11-05 15:12:33,42.00,Chevron Gas Station,Chip Read
TXN-90106,2026-11-05 15:15:50,1920.80,Luxury Fashion Boutique,Online CNP
TXN-90107,2026-11-05 15:18:14,28.75,CVS Pharmacy #88,POS Terminal
TXN-90108,2026-11-05 15:21:00,110.00,Amazon Retail,Online CNP`;

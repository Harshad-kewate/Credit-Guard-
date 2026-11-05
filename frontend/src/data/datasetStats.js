// Credit Guard - Official Dataset & Experimental Benchmark Metrics
// Sourced from Credit Card Fraud Detection Dataset (284,807 transactions)

export const DATASET_STATS = {
  totalTransactions: {
    raw: 284807,
    formatted: '284,807',
    label: 'Total Transactions',
    description: 'European cardholders in September 2013 across a 48-hour recording window.'
  },
  genuineTransactions: {
    raw: 284315,
    formatted: '284,315',
    percentage: '99.827%',
    label: 'Genuine Transactions',
    description: 'Legitimate normal transactions forming the overwhelming majority class.'
  },
  fraudulentTransactions: {
    raw: 492,
    formatted: '492',
    percentage: '0.173%',
    label: 'Fraudulent Transactions',
    description: 'Confirmed fraudulent transactions reflecting extreme class imbalance.'
  },
  datasetFeatures: {
    raw: 30,
    formatted: '30',
    label: 'Dataset Features',
    description: '28 PCA components (V1–V28) plus Time (seconds elapsed) and Amount (EUR).'
  }
};

export const MODEL_PERFORMANCE = {
  logisticRegression: {
    name: 'Logistic Regression',
    type: 'Linear Baseline Model',
    description: 'Standard baseline classifier. Captures high recall by flagging broad anomalies, but suffers from high false-positive rates.',
    metrics: {
      precision: 6.10,
      recall: 91.84,
      f1Score: 11.44,
      accuracy: 97.55
    },
    pros: 'High recall (91.84%) detects most fraud cases',
    cons: 'Very low precision (6.10%) yields excessive false alarm investigations'
  },
  randomForest: {
    name: 'Random Forest',
    type: 'Ensemble Decision Trees',
    description: 'Robust non-linear ensemble model. Delivers superior precision with strong recall, dramatically minimizing costly false alarms.',
    metrics: {
      precision: 96.05,
      recall: 74.49,
      f1Score: 83.91,
      accuracy: 99.95
    },
    pros: 'Exceptional precision (96.05%) & F1-score (83.91%) with 99.95% accuracy',
    cons: 'Higher computational overhead and memory footprint during deployment'
  }
};

export const WORKFLOW_STAGES = [
  {
    step: '01',
    title: 'Transaction Data',
    subtitle: 'Stream Ingestion',
    description: 'Raw transactional record captured with 30 parameters including timestamp offset, purchase magnitude, and cryptographic terminal signatures.'
  },
  {
    step: '02',
    title: 'Data Preprocessing',
    subtitle: 'PCA Transformation',
    description: 'V1–V28 principal components preserve user privacy while eliminating multicollinearity. Time and Amount are standardized to the model distribution.'
  },
  {
    step: '03',
    title: 'Machine Learning Analysis',
    subtitle: 'Random Forest Ensemble',
    description: 'Ensemble decision trees evaluate non-linear feature splits, anomalous boundary distances, and historical fraudulent behavioral vectors.'
  },
  {
    step: '04',
    title: 'Fraud Classification',
    subtitle: 'Decision Boundary',
    description: 'Weighted probability scoring segregates Class 0 (Genuine) from Class 1 (Fraudulent), calibrating precision against false-positive thresholds.'
  },
  {
    step: '05',
    title: 'Prediction Result',
    subtitle: 'Real-time Verdict',
    description: 'Immediate editorial diagnostic output indicating legitimacy status, risk classification, and confidence scoring for financial authorization.'
  }
];

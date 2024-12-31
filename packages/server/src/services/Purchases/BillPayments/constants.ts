export const ERRORS = {
  BILL_VENDOR_NOT_FOUND: 'VENDOR_NOT_FOUND',
  PAYMENT_MADE_NOT_FOUND: 'PAYMENT_MADE_NOT_FOUND',
  BILL_PAYMENT_NUMBER_NOT_UNQIUE: 'BILL_PAYMENT_NUMBER_NOT_UNQIUE',
  PAYMENT_ACCOUNT_NOT_FOUND: 'PAYMENT_ACCOUNT_NOT_FOUND',
  PAYMENT_ACCOUNT_NOT_CURRENT_ASSET_TYPE:
    'PAYMENT_ACCOUNT_NOT_CURRENT_ASSET_TYPE',
  BILL_ENTRIES_IDS_NOT_FOUND: 'BILL_ENTRIES_IDS_NOT_FOUND',
  BILL_PAYMENT_ENTRIES_NOT_FOUND: 'BILL_PAYMENT_ENTRIES_NOT_FOUND',
  INVALID_BILL_PAYMENT_AMOUNT: 'INVALID_BILL_PAYMENT_AMOUNT',
  PAYMENT_NUMBER_SHOULD_NOT_MODIFY: 'PAYMENT_NUMBER_SHOULD_NOT_MODIFY',
  BILLS_NOT_OPENED_YET: 'BILLS_NOT_OPENED_YET',
  VENDOR_HAS_PAYMENTS: 'VENDOR_HAS_PAYMENTS',
  WITHDRAWAL_ACCOUNT_CURRENCY_INVALID: 'WITHDRAWAL_ACCOUNT_CURRENCY_INVALID',
};

export const DEFAULT_VIEWS = [];

export const BillsPaymentsSampleData = [
  {
    'Payment Date': '2024-03-01',
    Vendor: 'Gabriel Kovacek',
    'Payment No.': 'P-10001',
    'Reference No.': 'REF-1',
    'Payment Account': 'Petty Cash',
    Statement: 'Vel et dolorem architecto veniam.',
    'Bill No': 'B-120',
    'Payment Amount': 100,
  },
  {
    'Payment Date': '2024-03-02',
    Vendor: 'Gabriel Kovacek',
    'Payment No.': 'P-10002',
    'Reference No.': 'REF-2',
    'Payment Account': 'Petty Cash',
    Statement: 'Id est molestias.',
    'Bill No': 'B-121',
    'Payment Amount': 100,
  },
  {
    'Payment Date': '2024-03-03',
    Vendor: 'Gabriel Kovacek',
    'Payment No.': 'P-10003',
    'Reference No.': 'REF-3',
    'Payment Account': 'Petty Cash',
    Statement: 'Quam cupiditate at nihil dicta dignissimos non fugit illo.',
    'Bill No': 'B-122',
    'Payment Amount': 100,
  },
];

export const defaultBillPaymentPdfTemplateAttributes = {
  // # Colors
  primaryColor: '#000',
  secondaryColor: '#000',

  // # Company logo
  showCompanyLogo: true,
  companyLogoUri: '',

  // # Company name
  companyName: 'Bigcapital Technology, Inc.',

  // # Vendor address
  showVendorAddress: true,
  vendorAddress: '',

  // # Company address
  showCompanyAddress: true,
  companyAddress: '',
  billedFromLabel: 'Pay From',
  billedToLabel: 'Pay To',

  // Total
  total: '$1000.00',
  totalLabel: 'Total',
  showTotal: true,

  // Subtotal
  subtotal: '1000/00',
  subtotalLabel: 'Subtotal',
  showSubtotal: true,

  lines: [
    {
      billNumber: 'INV-00001',
      billAmount: '$1000.00',
      billDueAmount: '$1000.00',
      paidAmount: '$1000.00',
    },
  ],
  // Payment received number
  showPaymentReceivedNumber: true,
  billPaymentNumberLabel: 'Payment Number',
  billPaymentNumber: '346D3D40-0001',

  // Payment date.
  billPaymentDate: 'September 3, 2024',
  showPaymentReceivedDate: true,
  billPaymentDateLabel: 'Payment Date',
};
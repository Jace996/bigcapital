export const ERRORS = {
  VENDOR_CREDIT_NOT_FOUND: 'VENDOR_CREDIT_NOT_FOUND',
  VENDOR_CREDIT_ALREADY_OPENED: 'VENDOR_CREDIT_ALREADY_OPENED',
  VENDOR_CREDIT_HAS_NO_REMAINING_AMOUNT:
    'VENDOR_CREDIT_HAS_NO_REMAINING_AMOUNT',
  VENDOR_CREDIT_APPLY_TO_BILLS_NOT_FOUND:
    'VENDOR_CREDIT_APPLY_TO_BILLS_NOT_FOUND',
  BILLS_HAS_NO_REMAINING_AMOUNT: 'BILLS_HAS_NO_REMAINING_AMOUNT',
  VENDOR_CREDIT_HAS_REFUND_TRANSACTIONS:
    'VENDOR_CREDIT_HAS_REFUND_TRANSACTIONS',
  VENDOR_CREDIT_HAS_APPLIED_BILLS: 'VENDOR_CREDIT_HAS_APPLIED_BILLS',
};

export const DEFAULT_VIEW_COLUMNS = [];
export const DEFAULT_VIEWS = [
  {
    name: 'vendor_credit.view.draft',
    slug: 'draft',
    rolesLogicExpression: '1',
    roles: [
      { index: 1, fieldKey: 'status', comparator: 'equals', value: 'draft' },
    ],
    columns: DEFAULT_VIEW_COLUMNS,
  },
  {
    name: 'vendor_credit.view.published',
    slug: 'published',
    rolesLogicExpression: '1',
    roles: [
      {
        index: 1,
        fieldKey: 'status',
        comparator: 'equals',
        value: 'published',
      },
    ],
    columns: DEFAULT_VIEW_COLUMNS,
  },
  {
    name: 'vendor_credit.view.open',
    slug: 'open',
    rolesLogicExpression: '1',
    roles: [
      {
        index: 1,
        fieldKey: 'status',
        comparator: 'equals',
        value: 'open',
      },
    ],
    columns: DEFAULT_VIEW_COLUMNS,
  },
  {
    name: 'vendor_credit.view.closed',
    slug: 'closed',
    rolesLogicExpression: '1',
    roles: [
      {
        index: 1,
        fieldKey: 'status',
        comparator: 'equals',
        value: 'closed',
      },
    ],
    columns: DEFAULT_VIEW_COLUMNS,
  },
];

export const VendorCreditsSampleData = [
  {
    Vendor: 'Randall Kohler VENDOR',
    'Vendor Credit Date': '2024-01-01',
    'Vendor Credit No.': 'VC-0001',
    'Reference No.': 'REF-00001',
    'Exchange Rate': '',
    Note: 'Note',
    Open: 'T',
    'Item Name': 'Hettinger, Schumm and Bartoletti',
    Quantity: 100,
    Rate: 100,
  },
];

export const defaultVendorCreditBrandingAttributes = {
  // # Colors
  primaryColor: '',
  secondaryColor: '',
  
  // # Company logo
  showCompanyLogo: true,
  companyLogoKey: '',
  companyLogoUri: '',

  // # Company name
  companyName: 'Bigcapital Technology, Inc.',

  // # Vendor address
  showVendorAddress: true,
  vendorAddress: '',

  // # Company address
  showCompanyAddress: true,
  companyAddress: '',
  billedToLabel: 'Billed To',

  // Total
  total: '$1000.00',
  totalLabel: 'Total',
  showTotal: true,

  // Subtotal
  subtotal: '1000/00',
  subtotalLabel: 'Subtotal',
  showSubtotal: true,

  // Vendor note
  showVendorNote: true,
  vendorNote:
    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  vendorNoteLabel: 'Vendor Note',

  // Terms & conditions
  showTermsConditions: true,
  termsConditions:
    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  termsConditionsLabel: 'Terms & Conditions',

  lines: [
    {
      item: 'Simply dummy text',
      description: 'Simply dummy text of the printing and typesetting',
      rate: '1',
      quantity: '1000',
      total: '$1000.00',
    },
  ],
  // Vendor credit number.
  showCreditNoteNumber: true,
  vendorCreditNumberLabel: 'Credit Number',
  vendorCreditNumber: '346D3D40-0001',

  // Vendor credit date.
  vendorCreditDate: 'September 3, 2024',
  showCreditNoteDate: true,
  vendorCreditDateLabel: 'Credit Date',
  vendorCreditReferenceLabel: 'Reference',
  vendorCreditReference: 'Reference',
  vendorCreditRemainingLabel: 'Credit Remaining',
  vendorCreditRemaining: 'Reference',
};
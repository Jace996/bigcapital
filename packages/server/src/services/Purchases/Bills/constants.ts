export const ERRORS = {
  BILL_NOT_FOUND: 'BILL_NOT_FOUND',
  BILL_VENDOR_NOT_FOUND: 'BILL_VENDOR_NOT_FOUND',
  BILL_ITEMS_NOT_PURCHASABLE: 'BILL_ITEMS_NOT_PURCHASABLE',
  BILL_NUMBER_EXISTS: 'BILL_NUMBER_EXISTS',
  BILL_ITEMS_NOT_FOUND: 'BILL_ITEMS_NOT_FOUND',
  BILL_ENTRIES_IDS_NOT_FOUND: 'BILL_ENTRIES_IDS_NOT_FOUND',
  NOT_PURCHASE_ABLE_ITEMS: 'NOT_PURCHASE_ABLE_ITEMS',
  BILL_ALREADY_OPEN: 'BILL_ALREADY_OPEN',
  BILL_NO_IS_REQUIRED: 'BILL_NO_IS_REQUIRED',
  BILL_HAS_ASSOCIATED_PAYMENT_ENTRIES: 'BILL_HAS_ASSOCIATED_PAYMENT_ENTRIES',
  VENDOR_HAS_BILLS: 'VENDOR_HAS_BILLS',
  BILL_HAS_ASSOCIATED_LANDED_COSTS: 'BILL_HAS_ASSOCIATED_LANDED_COSTS',
  BILL_ENTRIES_ALLOCATED_COST_COULD_DELETED:
    'BILL_ENTRIES_ALLOCATED_COST_COULD_DELETED',
  LOCATED_COST_ENTRIES_SHOULD_BIGGE_THAN_NEW_ENTRIES:
    'LOCATED_COST_ENTRIES_SHOULD_BIGGE_THAN_NEW_ENTRIES',
  LANDED_COST_ENTRIES_SHOULD_BE_INVENTORY_ITEMS:
    'LANDED_COST_ENTRIES_SHOULD_BE_INVENTORY_ITEMS',
  BILL_HAS_APPLIED_TO_VENDOR_CREDIT: 'BILL_HAS_APPLIED_TO_VENDOR_CREDIT',
  BILL_AMOUNT_SMALLER_THAN_PAID_AMOUNT: 'BILL_AMOUNT_SMALLER_THAN_PAID_AMOUNT',
};

export const DEFAULT_VIEW_COLUMNS = [];

export const DEFAULT_VIEWS = [
  {
    name: 'Draft',
    slug: 'draft',
    rolesLogicExpression: '1',
    roles: [
      { index: 1, fieldKey: 'status', comparator: 'equals', value: 'draft' },
    ],
    columns: DEFAULT_VIEW_COLUMNS,
  },
  {
    name: 'Opened',
    slug: 'opened',
    rolesLogicExpression: '1',
    roles: [
      { index: 1, fieldKey: 'status', comparator: 'equals', value: 'opened' },
    ],
    columns: DEFAULT_VIEW_COLUMNS,
  },
  {
    name: 'Unpaid',
    slug: 'unpaid',
    rolesLogicExpression: '1',
    roles: [
      { index: 1, fieldKey: 'status', comparator: 'equals', value: 'unpaid' },
    ],
    columns: DEFAULT_VIEW_COLUMNS,
  },
  {
    name: 'Overdue',
    slug: 'overdue',
    rolesLogicExpression: '1',
    roles: [
      { index: 1, fieldKey: 'status', comparator: 'equals', value: 'overdue' },
    ],
    columns: DEFAULT_VIEW_COLUMNS,
  },
  {
    name: 'Partially paid',
    slug: 'partially-paid',
    rolesLogicExpression: '1',
    roles: [
      {
        index: 1,
        fieldKey: 'status',
        comparator: 'equals',
        value: 'partially-paid',
      },
    ],
    columns: DEFAULT_VIEW_COLUMNS,
  },
];

export const BillsSampleData = [
  {
    'Bill No.': 'B-101',
    'Reference No.': 'REF0',
    Date: '2024-01-01',
    'Due Date': '2024-03-01',
    Vendor: 'Gabriel Kovacek',
    'Exchange Rate': 1,
    Note: 'Vel in sit sint.',
    Open: 'T',
    Item: 'VonRueden, Ruecker and Hettinger',
    Quantity: 100,
    Rate: 100,
    'Line Description': 'Id a vel quis vel aut.',
  },
  {
    'Bill No.': 'B-102',
    'Reference No.': 'REF0',
    Date: '2024-01-01',
    'Due Date': '2024-03-01',
    Vendor: 'Gabriel Kovacek',
    'Exchange Rate': 1,
    Note: 'Quia ut dolorem qui sint velit.',
    Open: 'T',
    Item: 'Thompson - Reichert',
    Quantity: 200,
    Rate: 50,
    'Line Description':
      'Nesciunt in adipisci quia ab reiciendis nam sed saepe consequatur.',
  },
  {
    'Bill No.': 'B-103',
    'Reference No.': 'REF0',
    Date: '2024-01-01',
    'Due Date': '2024-03-01',
    Vendor: 'Gabriel Kovacek',
    'Exchange Rate': 1,
    Note: 'Dolore aut voluptatem minus pariatur alias pariatur.',
    Open: 'T',
    Item: 'VonRueden, Ruecker and Hettinger',
    Quantity: 100,
    Rate: 100,
    'Line Description': 'Quam eligendi provident.',
  },
];

export const defaultBillPdfTemplateAttributes = {
  primaryColor: 'red',
  secondaryColor: 'red',

  companyName: 'Bigcapital Technology, Inc.',

  showCompanyLogo: true,
  companyLogoKey: '',
  companyLogoUri: '',

  dueDateLabel: 'Date due',
  showDueDate: true,

  dateIssueLabel: 'Date of issue',
  showDateIssue: true,

  // # Bill number,
  billNumberLabel: 'Bill number',
  showBillNumber: true,
  referenceNumberLabel: 'Reference',


  // # Vendor address
  showVendorAddress: true,
  vendorAddress: '',

  // # Company address
  showCompanyAddress: true,
  companyAddress: '',
  billedToLabel: 'Billed To',

  // Entries
  lineItemLabel: 'Item',
  lineQuantityLabel: 'Qty',
  lineRateLabel: 'Rate',
  lineTotalLabel: 'Total',

  totalLabel: 'Total',
  subtotalLabel: 'Subtotal',
  discountLabel: 'Discount',
  paymentMadeLabel: 'Payment Amount',
  balanceDueLabel: 'Due Amount',

  // Totals
  showTotal: true,
  showSubtotal: true,
  showDiscount: true,
  showTaxes: true,
  showPaymentMade: true,
  showDueAmount: true,
  showBalanceDue: true,

  discount: '0.00',

  // Footer paragraphs.
  noteLabel: 'Note',
  showNote: true,

  lines: [
    {
      item: 'Simply dummy text',
      description: 'Simply dummy text of the printing and typesetting',
      rate: '1',
      quantity: '1000',
      total: '$1000.00',
    },
  ],
  taxes: [
    { label: 'Sample Tax1 (4.70%)', amount: '11.75' },
    { label: 'Sample Tax2 (7.00%)', amount: '21.74' },
  ],

  // # Statement
  statementLabel: 'Statement',
  showStatement: true,
};

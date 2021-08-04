
export const ERRORS = {
  NOT_FOUND: 'NOT_FOUND',
  ITEMS_NOT_FOUND: 'ITEMS_NOT_FOUND',

  ITEM_NAME_EXISTS: 'ITEM_NAME_EXISTS',
  ITEM_CATEOGRY_NOT_FOUND: 'ITEM_CATEOGRY_NOT_FOUND',
  COST_ACCOUNT_NOT_COGS: 'COST_ACCOUNT_NOT_COGS',
  COST_ACCOUNT_NOT_FOUMD: 'COST_ACCOUNT_NOT_FOUMD',
  SELL_ACCOUNT_NOT_FOUND: 'SELL_ACCOUNT_NOT_FOUND',
  SELL_ACCOUNT_NOT_INCOME: 'SELL_ACCOUNT_NOT_INCOME',

  INVENTORY_ACCOUNT_NOT_FOUND: 'INVENTORY_ACCOUNT_NOT_FOUND',
  INVENTORY_ACCOUNT_NOT_INVENTORY: 'INVENTORY_ACCOUNT_NOT_INVENTORY',

  ITEMS_HAVE_ASSOCIATED_TRANSACTIONS: 'ITEMS_HAVE_ASSOCIATED_TRANSACTIONS',
  ITEM_HAS_ASSOCIATED_TRANSACTINS: 'ITEM_HAS_ASSOCIATED_TRANSACTINS',

  ITEM_HAS_ASSOCIATED_INVENTORY_ADJUSTMENT:
    'ITEM_HAS_ASSOCIATED_INVENTORY_ADJUSTMENT',
  ITEM_CANNOT_CHANGE_INVENTORY_TYPE: 'ITEM_CANNOT_CHANGE_INVENTORY_TYPE',
  TYPE_CANNOT_CHANGE_WITH_ITEM_HAS_TRANSACTIONS: 'TYPE_CANNOT_CHANGE_WITH_ITEM_HAS_TRANSACTIONS',
  INVENTORY_ACCOUNT_CANNOT_MODIFIED: 'INVENTORY_ACCOUNT_CANNOT_MODIFIED'
};


export const DEFAULT_VIEW_COLUMNS = [

];

export const DEFAULT_VIEWS = [
  {
    name: 'Services',
    slug: 'services',
    rolesLogicExpression: '1',
    roles: [
      { index: 1, fieldKey: 'type', comparator: 'equals', value: 'service' },
    ],
    columns: DEFAULT_VIEW_COLUMNS,
  },
  {
    name: 'Inventory',
    slug: 'inventory',
    rolesLogicExpression: '1',
    roles: [
      { index: 1, fieldKey: 'type', comparator: 'equals', value: 'inventory' },
    ],
    columns: DEFAULT_VIEW_COLUMNS,
  },
  {
    name: 'Non Inventory',
    slug: 'non-inventory',
    rolesLogicExpression: '1',
    roles: [
      { index: 1, fieldKey: 'type', comparator: 'equals', value: 'non-inventory' },
    ],
    columns: DEFAULT_VIEW_COLUMNS,
  },
]
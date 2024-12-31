/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex('pdf_templates').insert([
    {
      resource: 'SaleInvoice',
      templateName: 'Standard Template',
      predefined: true,
      default: true,
    },
    {
      resource: 'SaleEstimate',
      templateName: 'Standard Template',
      predefined: true,
      default: true,
    },
    {
      resource: 'SaleReceipt',
      templateName: 'Standard Template',
      predefined: true,
      default: true,
    },
    {
      resource: 'CreditNote',
      templateName: 'Standard Template',
      predefined: true,
      default: true,
    },
    {
      resource: 'PaymentReceive',
      templateName: 'Standard Template',
      predefined: true,
      default: true,
    },
    {
      resource: 'Bill',
      templateName: 'Standard Template',
      predefined: true,
      default: true,
    },
    {
      resource: 'BillPayment',
      templateName: 'Standard Template',
      predefined: true,
      default: true,
    },
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};

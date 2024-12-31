import { pickBy } from 'lodash';
import { IBill } from '@/interfaces';
import { contactAddressTextFormat } from '@/utils/address-text-format';
import { BillPaperTemplateProps } from '@bigcapital/pdf-templates';

export const mergePdfTemplateWithDefaultAttributes = (
  brandingTemplate?: Record<string, any>,
  defaultAttributes: Record<string, any> = {}
) => {
  const brandingAttributes = pickBy(
    brandingTemplate,
    (val, key) => val !== null && Object.keys(defaultAttributes).includes(key)
  );
  return {
    ...defaultAttributes,
    ...brandingAttributes,
  };
};

export const transformBillToPdfTemplate = (
  bill: IBill
): Partial<BillPaperTemplateProps> => {
  return {
    dueDate: bill.formattedDueDate,
    dateIssue: bill.formattedBillDate,
    billNumber: bill.billNumber,
    referenceNumber: bill.referenceNo,

    total: bill.totalFormatted,
    subtotal: bill.subtotalFormatted,
    paymentMade: bill.formattedPaymentAmount,
    dueAmount: bill.formattedDueAmount,
    discount: bill.discountAmountFormatted,
    adjustment: bill.adjustmentFormatted,
    discountLabel: bill.discountPercentageFormatted
      ? `Discount [${bill.discountPercentageFormatted}]`
      : 'Discount',

    note: bill.note,
    // statement: bill.billMessage,

    lines: bill.entries.map((entry) => ({
      item: entry.item.name,
      description: entry.description,
      rate: entry.rateFormatted,
      quantity: entry.quantityFormatted,
      discount: entry.discountFormatted,
      total: entry.totalFormatted,
    })),
    taxes: bill.taxes.map((tax) => ({
      label: tax.name,
      amount: tax.taxRateAmountFormatted,
    })),
    showLineDiscount: bill.entries.some((entry) => entry.discountFormatted),
    vendorAddress: contactAddressTextFormat(bill.vendor),
  };
};

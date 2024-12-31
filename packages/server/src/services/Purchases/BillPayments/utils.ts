import {
  IBillPayment,
  BillPaymentPdfTemplateAttributes,
} from '@/interfaces';
import { contactAddressTextFormat } from '@/utils/address-text-format';

export const transformBillPaymentToPdfTemplate = (
  payment: IBillPayment
): Partial<BillPaymentPdfTemplateAttributes> => {
  return {
    total: payment.formattedAmount,
    subtotal: payment.amount,
    billPaymentNumber: payment.paymentNumber,
    billPaymentDate: payment.formattedPaymentDate,
    reference: payment.reference,
    account: payment.paymentAccount.name,
    vendorName: payment.vendor.displayName,
    lines: payment.entries.map((entry) => ({
      billDate: entry.bill.formattedBillDate,
      billNumber: entry.bill.billNumber,
      billAmount: entry.bill.totalFormatted,
      billDueAmount: entry.bill.formattedDueAmount,
      paidAmount: entry.paymentAmountFormatted,
    })),
    vendorAddress: contactAddressTextFormat(payment.vendor),
  };
};

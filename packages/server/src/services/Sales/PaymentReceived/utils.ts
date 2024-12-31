import {
  IPaymentReceived,
  PaymentReceivedPdfTemplateAttributes,
} from '@/interfaces';
import { contactAddressTextFormat } from '@/utils/address-text-format';

export const transformPaymentReceivedToPdfTemplate = (
  payment: IPaymentReceived
): Partial<PaymentReceivedPdfTemplateAttributes> => {
  return {
    total: payment.formattedAmount,
    subtotal: payment.subtotalFormatted,
    paymentReceivedNumebr: payment.paymentReceiveNo,
    reference: payment.referenceNo,
    paymentReceivedDate: payment.formattedPaymentDate,
    account: payment.depositAccount.name,
    customerName: payment.customer.displayName,
    lines: payment.entries.map((entry) => ({
      invoiceDate: entry.invoice.invoiceDateFormatted,
      invoiceNumber: entry.invoice.invoiceNo,
      invoiceAmount: entry.invoice.totalFormatted,
      dueAmount: entry.invoice.dueAmountFormatted,
      paidAmount: entry.paymentAmountFormatted,
    })),
    customerAddress: contactAddressTextFormat(payment.customer),
  };
};

export const transformPaymentReceivedToMailDataArgs = (payment: any) => {
  return {
    'Customer Name': payment.customer.displayName,
    'Payment Number': payment.paymentReceiveNo,
    'Payment Date': payment.formattedPaymentDate,
    'Payment Amount': payment.formattedAmount,
  };
};

import { VendorCreditPdfTemplateAttributes, IVendorCredit } from '@/interfaces';
import { contactAddressTextFormat } from '@/utils/address-text-format';

export const transformVendorCreditToPdfTemplate = (
  vendorCredit: IVendorCredit
): Partial<VendorCreditPdfTemplateAttributes> => {
  return {
    vendorCreditDate: vendorCredit.formattedVendorCreditDate,
    vendorCreditNumber: vendorCredit.vendorCreditNumber,
    vendorCreditReference: vendorCredit.referenceNo,
    vendorCreditRemaining: vendorCredit.creditsRemaining,

    total: vendorCredit.formattedAmount,
    subtotal: vendorCredit.formattedSubtotal,

    lines: vendorCredit.entries?.map((entry) => ({
      item: entry.item.name,
      description: entry.description,
      rate: entry.rateFormatted,
      quantity: entry.quantityFormatted,
      total: entry.totalFormatted,
    })),
    vendorNote: vendorCredit.note,
    termsConditions: vendorCredit.termsConditions,
    vendorAddress: contactAddressTextFormat(vendorCredit.vendor),
  };
};

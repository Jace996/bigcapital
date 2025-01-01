import { Box } from '../lib/layout/Box';
import { Stack } from '../lib/layout/Stack';
import { Group } from '../lib/layout/Group';
import {
  PaperTemplate,
  PaperTemplateProps,
  PaperTemplateTotalBorder,
} from './PaperTemplate';
import {
  DefaultPdfTemplateAddressBilledFrom,
  DefaultPdfTemplateAddressBilledTo,
} from './_constants';

export interface BillPaymentPaperTemplateProps extends PaperTemplateProps {
  // # Company logo
  showCompanyLogo?: boolean;
  companyLogoUri?: string;

  // # Company name
  companyName?: string;

  // Vendor address
  showVendorAddress?: boolean;
  vendorAddress?: string;

  // Company address
  showCompanyAddress?: boolean;
  companyAddress?: string;

  billedFromLabel?: string;
  billedToLabel?: string;

  // Total.
  total?: string;
  showTotal?: boolean;
  totalLabel?: string;

  // Subtotal.
  subtotal?: string;
  showSubtotal?: boolean;
  subtotalLabel?: string;

  lines?: Array<{
    paidAmount: string;
    billAmount: string;
    billDueAmount: string;
    billDate: string;
    billNumber: string;
  }>;

  // Issue date.
  billPaymentDateLabel?: string;
  showBillPaymentDate?: boolean;
  billPaymentDate?: string;

  // Payment received number.
  billPaymentNumber?: string;
  billPaymentNumberLabel?: string;
  referenceLabel?: string;
  reference?: string;
  accountLabel?: string;
  account?: string;
  showBillPaymentNumber?: boolean;
}

export function BillPaymentPaperTemplate({
  // # Colors
  primaryColor,
  secondaryColor,

  // # Company logo
  showCompanyLogo = true,
  companyLogoUri,

  // # Company name
  companyName = 'Bigcapital Technology, Inc.',

  // # Vendor address
  showVendorAddress = true,
  vendorAddress = DefaultPdfTemplateAddressBilledTo,

  // # Company address
  showCompanyAddress = true,
  companyAddress = DefaultPdfTemplateAddressBilledFrom,

  billedFromLabel = 'Pay From',
  billedToLabel = 'Pay To',

  total = '$1000.00',
  totalLabel = 'Total',
  showTotal = true,

  subtotal = '1000/00',
  subtotalLabel = 'Subtotal',
  showSubtotal = true,

  lines = [
    {
      billDate: 'September 3, 2024',
      billNumber: 'INV-00001',
      billAmount: '$1000.00',
      billDueAmount: '$1000.00',
      paidAmount: '$1000.00',
    },
  ],
  showBillPaymentNumber = true,
  billPaymentNumberLabel = 'Payment Number',
  billPaymentNumber = '346D3D40-0001',
  referenceLabel = 'Reference',
  reference = 'Reference',
  accountLabel = 'Payment Account',
  account = 'Account',

  billPaymentDate = 'September 3, 2024',
  showBillPaymentDate = true,
  billPaymentDateLabel = 'Payment Date',
}: BillPaymentPaperTemplateProps) {
  return (
    <PaperTemplate primaryColor={primaryColor} secondaryColor={secondaryColor}>
      <Stack spacing={24}>
        <Group align={'start'} spacing={10}>
          <Stack flex={1}>
            <PaperTemplate.BigTitle title={'Payment Voucher 123'} />

            <PaperTemplate.TermsList>
              {showBillPaymentNumber && (
                <PaperTemplate.TermsItem label={billPaymentNumberLabel}>
                  {billPaymentNumber}
                </PaperTemplate.TermsItem>
              )}

              {showBillPaymentDate && (
                <PaperTemplate.TermsItem label={billPaymentDateLabel}>
                  {billPaymentDate}
                </PaperTemplate.TermsItem>
              )}
  
              <PaperTemplate.TermsItem label={accountLabel}>
                {account}
              </PaperTemplate.TermsItem>
              <PaperTemplate.TermsItem label={referenceLabel}>
                {reference}
              </PaperTemplate.TermsItem>
             
            </PaperTemplate.TermsList>
          </Stack>

          {companyLogoUri && showCompanyLogo && (
            <PaperTemplate.Logo logoUri={companyLogoUri} />
          )}
        </Group>

        <PaperTemplate.AddressesGroup>
          {showCompanyAddress && (
            <PaperTemplate.Address>
              <strong>{billedFromLabel}</strong>
              <Box dangerouslySetInnerHTML={{ __html: companyAddress }} />
            </PaperTemplate.Address>
          )}

          {showVendorAddress && (
            <PaperTemplate.Address>
              <strong>{billedToLabel}</strong>
              <Box dangerouslySetInnerHTML={{ __html: vendorAddress }} />
            </PaperTemplate.Address>
          )}
        </PaperTemplate.AddressesGroup>

        <Stack spacing={0}>
          <PaperTemplate.Table
            columns={[
              { label: 'Bill Date', accessor: 'billDate' },
              { label: 'Bill #', accessor: 'billNumber' },
              {
                label: 'Bill Amount',
                accessor: 'billAmount',
                align: 'right',
              },
              {
                label: 'Amount Due',
                accessor: 'billDueAmount',
                align: 'right',
              },
              { label: 'Paid Amount', accessor: 'paidAmount', align: 'right' },
            ]}
            data={lines}
          />
          <PaperTemplate.Totals>
            {showSubtotal && (
              <PaperTemplate.TotalLine
                label={subtotalLabel}
                amount={subtotal}
                border={PaperTemplateTotalBorder.Gray}
              />
            )}
            {showTotal && (
              <PaperTemplate.TotalLine
                label={totalLabel}
                amount={total}
                border={PaperTemplateTotalBorder.Dark}
                style={{ fontWeight: 500 }}
              />
            )}
          </PaperTemplate.Totals>
        </Stack>
      </Stack>
    </PaperTemplate>
  );
}

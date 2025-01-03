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

export interface PaymentReceivedPaperTemplateProps extends PaperTemplateProps {
  // # Company logo
  showCompanyLogo?: boolean;
  companyLogoUri?: string;

  // # Company name
  companyName?: string;

  // Customer address
  showCustomerAddress?: boolean;
  customerAddress?: string;

  // Company address
  showCompanyAddress?: boolean;
  companyAddress?: string;

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
    invoiceAmount: string;
    invoiceNumber: string;
    invoiceDate: string;
    dueAmount: string;
  }>;

  // Issue date.
  paymentReceivedDateLabel?: string;
  showPaymentReceivedDate?: boolean;
  paymentReceivedDate?: string;

  // Payment received number.
  paymentReceivedNumebr?: string;
  paymentReceivedNumberLabel?: string;
  showPaymentReceivedNumber?: boolean;

  //Extra
  billedFromLabel?: string,

  referenceLabel ?: string,
  reference ?: string,
  accountLabel ?: string,
  account ?: string,
}

export function PaymentReceivedPaperTemplate({
  // # Colors
  primaryColor,
  secondaryColor,

  // # Company logo
  showCompanyLogo = true,
  companyLogoUri,

  // # Company name
  companyName = 'Bigcapital Technology, Inc.',

  // # Customer address
  showCustomerAddress = true,
  customerAddress = DefaultPdfTemplateAddressBilledTo,

  // # Company address
  showCompanyAddress = true,
  companyAddress = DefaultPdfTemplateAddressBilledFrom,

  billedToLabel = 'To',
  billedFromLabel = 'Received From',

  referenceLabel = 'Reference',
  reference = 'Reference',
  accountLabel = 'Payment Account',
  account = 'Account',

  total = '$1000.00',
  totalLabel = 'Total',
  showTotal = true,

  subtotal = '1000/00',
  subtotalLabel = 'Subtotal',
  showSubtotal = true,

  lines = [
    {
      invoiceNumber: 'INV-00001',
      invoiceAmount: '$1000.00',
      paidAmount: '$1000.00',
      invoiceDate: 'September 3, 2024',
      dueAmount: '$1000.00',
    },
  ],
  showPaymentReceivedNumber = true,
  paymentReceivedNumberLabel = 'Payment Number',
  paymentReceivedNumebr = '346D3D40-0001',

  paymentReceivedDate = 'September 3, 2024',
  showPaymentReceivedDate = true,
  paymentReceivedDateLabel = 'Payment Date',
}: PaymentReceivedPaperTemplateProps) {
  return (
    <PaperTemplate primaryColor={primaryColor} secondaryColor={secondaryColor}>
      <Stack spacing={24}>
        <Group align={'start'} spacing={10}>
          <Stack flex={1}>
            <PaperTemplate.BigTitle title={'Payment'} />

            <PaperTemplate.TermsList>
              {showPaymentReceivedNumber && (
                <PaperTemplate.TermsItem label={paymentReceivedNumberLabel}>
                  {paymentReceivedNumebr}
                </PaperTemplate.TermsItem>
              )}

              {showPaymentReceivedDate && (
                <PaperTemplate.TermsItem label={paymentReceivedDateLabel}>
                  {paymentReceivedDate}
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
          {showCustomerAddress && (
            <PaperTemplate.Address>
              <strong>{billedFromLabel}</strong>
              <Box dangerouslySetInnerHTML={{ __html: customerAddress }} />
            </PaperTemplate.Address>
          )}

          {showCompanyAddress && (
            <PaperTemplate.Address>
              <strong>{billedToLabel}</strong>
              <Box dangerouslySetInnerHTML={{ __html: companyAddress }} />
            </PaperTemplate.Address>
          )}
        </PaperTemplate.AddressesGroup>

        <Stack spacing={0}>
          <PaperTemplate.Table
            columns={[
              { label: 'Invoice Date', accessor: 'invoiceDate' },
              { label: 'Invoice #', accessor: 'invoiceNumber' },
              {
                label: 'Invoice Amount',
                accessor: 'invoiceAmount',
                align: 'right',
              },
              {
                label: 'Amount Due',
                accessor: 'dueAmount',
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

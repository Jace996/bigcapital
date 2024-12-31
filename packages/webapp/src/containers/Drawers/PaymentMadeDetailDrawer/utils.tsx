// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import { getColumnWidth } from '@/utils';
import { FormatNumberCell } from '@/components';
import { usePaymentMadeDetailContext } from './PaymentMadeDetailProvider';

export const usePaymentMadeEntriesColumns = () => {
  // Payment made details context.
  const {
    paymentMade: { entries },
  } = usePaymentMadeDetailContext();

  return React.useMemo(
    () => [
      {
        Header: intl.get('date'),
        accessor: 'bill.formatted_bill_date',
        width: 100,
        disableSortBy: true,
        className: 'date',
      },
      {
        Header: intl.get('bill_number'),
        accessor: 'bill.bill_number',
        width: 150,
        disableSortBy: true,
        className: 'bill_number',
      },
      {
        Header: intl.get('bill_amount'),
        accessor: 'bill.total_formatted',
        width: getColumnWidth(entries, 'bill.total_formatted', {
          minWidth: 60,
          magicSpacing: 5,
        }),
        align: 'right',
        textOverview: true,
      },
      {
        Header: intl.get('amount_due'),
        accessor: 'bill.formatted_due_amount',
        align: 'right',
        width: getColumnWidth(entries, 'bill.formatted_due_amount', {
          minWidth: 60,
          magicSpacing: 5,
        }),
        disableSortBy: true,
        textOverview: true,
      },
      {
        Header: intl.get('payment_amount'),
        accessor: 'payment_amount_formatted',
        width: getColumnWidth(entries, 'payment_amount_formatted', {
          minWidth: 60,
          magicSpacing: 5,
        }),
        disableSortBy: true,
        textOverview: true,
        align: 'right',
      },
    ],
    [],
  );
};

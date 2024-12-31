import { Knex } from 'knex';
import { IBill } from './Bill';
import { AttachmentLinkDTO } from './Attachments';

export interface IBillPaymentEntry {
  id?: number;
  billPaymentId: number;
  billId: number;
  paymentAmount: number;

  bill?: IBill;
}

export interface IBillPayment {
  id?: number;
  vendorId: number;
  amount: number;
  currencyCode: string;
  reference: string;
  paymentAccountId: number;
  paymentNumber: string;
  paymentDate: Date;
  exchangeRate: number | null;
  userId: number;
  entries: IBillPaymentEntry[];
  statement: string;
  createdAt: Date;
  updatedAt: Date;

  localAmount?: number;
  branchId?: number;
  pdfTemplateId?: number;
}

export interface IBillPaymentEntryDTO {
  billId: number;
  paymentAmount: number;
}

export interface IBillPaymentDTO {
  vendorId: number;
  paymentAccountId: number;
  paymentNumber?: string;
  paymentDate: Date;
  exchangeRate?: number;
  statement: string;
  reference: string;
  entries: IBillPaymentEntryDTO[];
  branchId?: number;
  attachments?: AttachmentLinkDTO[];
}

export interface IBillReceivePageEntry {
  billId: number;
  entryType: string;
  billNo: string;
  dueAmount: number;
  amount: number;
  totalPaymentAmount: number;
  paymentAmount: number;
  currencyCode: string;
  date: Date | string;
}

export interface IBillPaymentsService {
  validateVendorHasNoPayments(tenantId: number, vendorId): Promise<void>;
}

export interface IBillPaymentEventCreatedPayload {
  tenantId: number;
  billPayment: IBillPayment;
  billPaymentDTO: IBillPaymentDTO;
  billPaymentId: number;
  trx: Knex.Transaction;
}

export interface IBillPaymentCreatingPayload {
  tenantId: number;
  billPaymentDTO: IBillPaymentDTO;
  trx: Knex.Transaction;
}

export interface IBillPaymentEditingPayload {
  tenantId: number;
  billPaymentDTO: IBillPaymentDTO;
  oldBillPayment: IBillPayment;
  trx: Knex.Transaction;
}
export interface IBillPaymentEventEditedPayload {
  tenantId: number;
  billPaymentId: number;
  billPayment: IBillPayment;
  oldBillPayment: IBillPayment;
  billPaymentDTO: IBillPaymentDTO;
  trx: Knex.Transaction;
}

export interface IBillPaymentEventDeletedPayload {
  tenantId: number;
  billPaymentId: number;
  oldBillPayment: IBillPayment;
  trx: Knex.Transaction;
}

export interface IBillPaymentDeletingPayload {
  tenantId: number;
  oldBillPayment: IBillPayment;
  trx: Knex.Transaction;
}

export interface IBillPaymentPublishingPayload {
  tenantId: number;
  oldBillPayment: IBillPayment;
  trx: Knex.Transaction;
}

export enum IPaymentMadeAction {
  Create = 'Create',
  Edit = 'Edit',
  Delete = 'Delete',
  View = 'View',
}

export interface BillPaymentPdfTemplateAttributes {
  primaryColor: string;
  secondaryColor: string;
  showCompanyLogo: boolean;
  companyLogo: string;
  companyName: string;

  // Vendor Address
  showVendorAddress: boolean;
  vendorAddress: string;

  // Company address
  showCompanyAddress: boolean;
  companyAddress: string;
  billedToLabel: string;

  total: string;
  totalLabel: string;
  showTotal: boolean;

  subtotal: string;
  subtotalLabel: string;
  showSubtotal: boolean;

  lines: Array<{
    billNumber: string;
    billAmount: string;
    paidAmount: string;
  }>;

  showBillPaymentNumber: boolean;
  billPaymentNumberLabel: string;
  billPaymentNumber: string;
  reference: string;
  account: string;

  billPaymentDate: string;
  showBillPaymentDate: boolean;
  billPaymentDateLabel: string;
}

export interface IBillPaymentState {
  defaultTemplateId: number;
}
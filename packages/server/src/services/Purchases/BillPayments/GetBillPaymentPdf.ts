import { Inject, Service } from 'typedi';
import { renderBillPaymentPaperTemplateHtml } from '@bigcapital/pdf-templates';
import { ChromiumlyTenancy } from '@/services/ChromiumlyTenancy/ChromiumlyTenancy';
import { GetBillPayment } from './GetBillPayment';
import HasTenancyService from '@/services/Tenancy/TenancyService';
import { BillPaymentBrandingTemplate } from './BillPaymentBrandingTemplate';
import { transformBillPaymentToPdfTemplate } from './utils';
import { BillPaymentPdfTemplateAttributes } from '@/interfaces';
import { EventPublisher } from '@/lib/EventPublisher/EventPublisher';
import events from '@/subscribers/events';

@Service()
export default class GetBillPaymentPdf {
  @Inject()
  private tenancy: HasTenancyService;

  @Inject()
  private chromiumlyTenancy: ChromiumlyTenancy;

  @Inject()
  private getPaymentService: GetBillPayment;

  @Inject()
  private paymentBrandingTemplateService: BillPaymentBrandingTemplate;

  @Inject()
  private eventPublisher: EventPublisher;

  /**
   * Retrieves payment received html content.
   * @param {number} tenantId
   * @param {number} billPaymentId
   * @returns {Promise<string>}
   */
  public async getBillPaymentHtml(
    tenantId: number,
    billPaymentId: number
  ): Promise<string> {
    const brandingAttributes = await this.getPaymentBrandingAttributes(
      tenantId,
      billPaymentId
    );
    return renderBillPaymentPaperTemplateHtml(brandingAttributes);
  }

  /**
   * Retrieve bill pdf content.
   * @param {number} tenantId -
   * @param {IBillPayment} billPayment -
   * @returns {Promise<Buffer>}
   */
  async getBillPaymentPdf(
    tenantId: number,
    billPaymentId: number
  ): Promise<[Buffer, string]> {
    const htmlContent = await this.getBillPaymentHtml(
      tenantId,
      billPaymentId
    );
    const filename = await this.getBillPaymentFilename(
      tenantId,
      billPaymentId
    );
    // Converts the given html content to pdf document.
    const content = await this.chromiumlyTenancy.convertHtmlContent(
      tenantId,
      htmlContent
    );
    const eventPayload = { tenantId, billPaymentId };

    // Triggers the `onCreditNotePdfViewed` event.
    await this.eventPublisher.emitAsync(
      events.billPayment.onPdfViewed,
      eventPayload
    );
    return [content, filename];
  }

  /**
   * Retrieves the filename of the given payment.
   * @param {number} tenantId
   * @param {number} billPaymentId
   * @returns {Promise<string>}
   */
  private async getBillPaymentFilename(
    tenantId: number,
    billPaymentId: number
  ): Promise<string> {
    const { BillPayment } = this.tenancy.models(tenantId);

    const payment = await BillPayment.query().findById(billPaymentId);

    return `Payment-${payment.billPaymentNo}`;
  }

  /**
   * Retrieves the given payment received branding attributes.
   * @param {number} tenantId
   * @param {number} billPaymentId
   * @returns {Promise<BillPaymentPdfTemplateAttributes>}
   */
  async getPaymentBrandingAttributes(
    tenantId: number,
    billPaymentId: number
  ): Promise<BillPaymentPdfTemplateAttributes> {
    const { PdfTemplate } = this.tenancy.models(tenantId);

    const billPayment = await this.getPaymentService.getBillPayment(
      tenantId,
      billPaymentId
    );
    const templateId =
      billPayment?.pdfTemplateId ??
      (
        await PdfTemplate.query().findOne({
          resource: 'BillPayment',
          default: true,
        })
      )?.id;

    const brandingTemplate =
      await this.paymentBrandingTemplateService.getBillPaymentPdfTemplate(
        tenantId,
        templateId
      );
    return {
      ...brandingTemplate.attributes,
      ...transformBillPaymentToPdfTemplate(billPayment),
    };
  }
}

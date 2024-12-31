import { Inject, Service } from 'typedi';
import {
  renderBillPaperTemplateHtml,
  BillPaperTemplateProps,
} from '@bigcapital/pdf-templates';
import { ChromiumlyTenancy } from '@/services/ChromiumlyTenancy/ChromiumlyTenancy';
import { GetBill } from './GetBill';
import HasTenancyService from '@/services/Tenancy/TenancyService';
import { transformBillToPdfTemplate } from './utils';
import { BillPdfTemplate } from './BillPdfTemplate';
import { EventPublisher } from '@/lib/EventPublisher/EventPublisher';
import events from '@/subscribers/events';

@Service()
export class BillPdf {
  @Inject()
  private tenancy: HasTenancyService;

  @Inject()
  private chromiumlyTenancy: ChromiumlyTenancy;

  @Inject()
  private getBillService: GetBill;

  @Inject()
  private billBrandingTemplateService: BillPdfTemplate;

  @Inject()
  private eventPublisher: EventPublisher;

  /**
   * Retrieve bill html content.
   * @param {number} tenantId - Tenant Id.
   * @param {IBill} bill -
   * @returns {Promise<string>}
   */
  public async billHtml(
    tenantId: number,
    billId: number
  ): Promise<string> {
    const brandingAttributes = await this.getBillBrandingAttributes(
      tenantId,
      billId
    );
    return renderBillPaperTemplateHtml({
      ...brandingAttributes,
    });
  }

  /**
   * Retrieve bill pdf content.
   * @param {number} tenantId - Tenant Id.
   * @param {IBill} bill -
   * @returns {Promise<[Buffer, string]>}
   */
  public async billPdf(
    tenantId: number,
    billId: number
  ): Promise<[Buffer, string]> {
    const filename = await this.getBillPdfFilename(tenantId, billId);

    const htmlContent = await this.billHtml(tenantId, billId);

    // Converts the given html content to pdf document.
    const buffer = await this.chromiumlyTenancy.convertHtmlContent(
      tenantId,
      htmlContent
    );
    const eventPayload = { tenantId, billId: billId };

    // Triggers the `onBillPdfViewed` event.
    await this.eventPublisher.emitAsync(
      events.bill.onPdfViewed,
      eventPayload
    );
    return [buffer, filename];
  }

  /**
   * Retrieves the filename pdf document of the given bill.
   * @param {number} tenantId
   * @param {number} billId
   * @returns {Promise<string>}
   */
  private async getBillPdfFilename(
    tenantId: number,
    billId: number
  ): Promise<string> {
    const { Bill } = this.tenancy.models(tenantId);

    const bill = await Bill.query().findById(billId);

    return `Bill-${bill.billNo}`;
  }

  /**
   * Retrieves the branding attributes of the given bill.
   * @param {number} tenantId
   * @param {number} billId
   * @returns {Promise<BillPdfTemplateAttributes>}
   */
  async getBillBrandingAttributes(
    tenantId: number,
    billId: number
  ): Promise<BillPaperTemplateProps> {
    const { PdfTemplate } = this.tenancy.models(tenantId);

    const bill = await this.getBillService.getBill(
      tenantId,
      billId
    );
    // Retrieve the bill template id of not found get the default template id.
    const templateId =
      bill.pdfTemplateId ??
      (
        await PdfTemplate.query().findOne({
          resource: 'Bill',
          default: true,
        })
      )?.id;
    //  Getting the branding template attributes.
    const brandingTemplate =
      await this.billBrandingTemplateService.getBillPdfTemplate(
        tenantId,
        templateId
      );
    // Merge the branding template attributes with the bill.
    return {
      ...brandingTemplate.attributes,
      ...transformBillToPdfTemplate(bill),
    };
  }
}

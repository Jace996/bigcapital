import { Inject, Service } from 'typedi';
import { ChromiumlyTenancy } from '../../ChromiumlyTenancy/ChromiumlyTenancy';
import { TemplateInjectable } from '../../TemplateInjectable/TemplateInjectable';
import GetVendorCredit from './GetVendorCredit';
import { VendorCreditBrandingTemplate } from './VendorCreditBrandingTemplate';
import { VendorCreditPdfTemplateAttributes } from '@/interfaces';
import HasTenancyService from '../../Tenancy/TenancyService';
import { transformVendorCreditToPdfTemplate } from './utils';
import { EventPublisher } from '@/lib/EventPublisher/EventPublisher';
import events from '@/subscribers/events';

@Service()
export default class GetVendorCreditPdf {
  @Inject()
  private tenancy: HasTenancyService;

  @Inject()
  private chromiumlyTenancy: ChromiumlyTenancy;

  @Inject()
  private templateInjectable: TemplateInjectable;

  @Inject()
  private getVendorCreditService: GetVendorCredit;

  @Inject()
  private vendorCreditBrandingTemplate: VendorCreditBrandingTemplate;

  @Inject()
  private eventPublisher: EventPublisher;

  /**
   * Retrieves sale invoice pdf content.
   * @param {number} tenantId - Tenant id.
   * @param {number} vendorCreditId - Credit note id.
   * @returns {Promise<[Buffer, string]>}
   */
  public async getVendorCreditPdf(
    tenantId: number,
    vendorCreditId: number
  ): Promise<[Buffer, string]> {
    const brandingAttributes = await this.getVendorCreditBrandingAttributes(
      tenantId,
      vendorCreditId
    );
    const htmlContent = await this.templateInjectable.render(
      tenantId,
      'modules/vendor-credit-standard',
      brandingAttributes
    );
    const filename = await this.getVendorCreditFilename(tenantId, vendorCreditId);

    const document = await this.chromiumlyTenancy.convertHtmlContent(
      tenantId,
      htmlContent
    );
    const eventPayload = { tenantId, vendorCreditId };

    // Triggers the `onVendorCreditPdfViewed` event.
    await this.eventPublisher.emitAsync(
      events.vendorCredit.onPdfViewed,
      eventPayload
    );
    return [document, filename];
  }

  /**
   * Retrieves the filename pdf document of the given vendor credit.
   * @param {number} tenantId
   * @param {number} vendorCreditId
   * @returns {Promise<string>}
   */
  public async getVendorCreditFilename(
    tenantId: number,
    vendorCreditId: number
  ): Promise<string> {
    const { VendorCredit } = this.tenancy.models(tenantId);

    const vendorCredit = await VendorCredit.query().findById(vendorCreditId);

    return `Vendor-${vendorCredit.vendorCreditNumber}`;
  }

  /**
   * Retrieves vendor credit branding attributes.
   * @param {number} tenantId - The ID of the tenant.
   * @param {number} vendorCreditId - The ID of the vendor credit.
   * @returns {Promise<VendorCreditPdfTemplateAttributes>} The vendor credit branding attributes.
   */
  public async getVendorCreditBrandingAttributes(
    tenantId: number,
    vendorCreditId: number
  ): Promise<VendorCreditPdfTemplateAttributes> {
    const { PdfTemplate } = this.tenancy.models(tenantId);
    const vendorCredit = await this.getVendorCreditService.getVendorCredit(
      tenantId,
      vendorCreditId
    );
    // Retrieve the invoice template id of not found get the default template id.
    const templateId =
      vendorCredit.pdfTemplateId ??
      (
        await PdfTemplate.query().findOne({
          resource: 'VendorCredit',
          default: true,
        })
      )?.id;
    // Retrieves the vendor credit branding template.
    const brandingTemplate =
      await this.vendorCreditBrandingTemplate.getVendorCreditBrandingTemplate(
        tenantId,
        templateId
      );
    return {
      ...brandingTemplate.attributes,
      ...transformVendorCreditToPdfTemplate(vendorCredit),
    };
  }
}

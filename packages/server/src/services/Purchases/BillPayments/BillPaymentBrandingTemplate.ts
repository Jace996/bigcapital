import { GetPdfTemplate } from '@/services/PdfTemplate/GetPdfTemplate';
import { Inject, Service } from 'typedi';
import { mergePdfTemplateWithDefaultAttributes } from '../Bills/utils';
import { defaultBillPaymentPdfTemplateAttributes } from './constants';
import { PdfTemplate } from '@/models/PdfTemplate';
import { GetOrganizationBrandingAttributes } from '@/services/PdfTemplate/GetOrganizationBrandingAttributes';

@Service()
export class BillPaymentBrandingTemplate {
  @Inject()
  private getPdfTemplateService: GetPdfTemplate;

  @Inject()
  private getOrgBrandingAttributes: GetOrganizationBrandingAttributes;

  /**
   * Retrieves the payment received pdf template.
   * @param {number} tenantId
   * @param {number} paymentTemplateId
   * @returns
   */
  public async getBillPaymentPdfTemplate(
    tenantId: number,
    paymentTemplateId: number
  ) {
    const template = await this.getPdfTemplateService.getPdfTemplate(
      tenantId,
      paymentTemplateId
    );
    // Retrieves the organization branding attributes.
    const commonOrgBrandingAttrs =
      await this.getOrgBrandingAttributes.getOrganizationBrandingAttributes(
        tenantId
      );
    // Merges the default branding attributes with common organization branding attrs.
    const organizationBrandingAttrs = {
      ...defaultBillPaymentPdfTemplateAttributes,
      ...commonOrgBrandingAttrs,
    };
    const brandingTemplateAttrs = {
      ...template.attributes,
      companyLogoUri: template.companyLogoUri,
    };
    const attributes = mergePdfTemplateWithDefaultAttributes(
      brandingTemplateAttrs,
      organizationBrandingAttrs
    );
    return {
      ...template,
      attributes,
    };
  }
}

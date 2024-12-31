import { Inject, Service } from 'typedi';
import { mergePdfTemplateWithDefaultAttributes } from './utils';
import { GetPdfTemplate } from '@/services/PdfTemplate/GetPdfTemplate';
import { defaultBillPdfTemplateAttributes } from './constants';
import { GetOrganizationBrandingAttributes } from '@/services/PdfTemplate/GetOrganizationBrandingAttributes';

@Service()
export class BillPdfTemplate {
  @Inject()
  private getPdfTemplateService: GetPdfTemplate;

  @Inject()
  private getOrgBrandingAttributes: GetOrganizationBrandingAttributes;

  /**
   * Retrieves the bill pdf template.
   * @param {number} tenantId
   * @param {number} billTemplateId
   * @returns
   */
  async getBillPdfTemplate(tenantId: number, billTemplateId: number) {
    const template = await this.getPdfTemplateService.getPdfTemplate(
      tenantId,
      billTemplateId
    );
    // Retrieves the organization branding attributes.
    const commonOrgBrandingAttrs =
      await this.getOrgBrandingAttributes.getOrganizationBrandingAttributes(
        tenantId
      );
    const organizationBrandingAttrs = {
      ...defaultBillPdfTemplateAttributes,
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

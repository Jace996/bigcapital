import { Inject } from 'typedi';
import { GetPdfTemplate } from '../../PdfTemplate/GetPdfTemplate';
import { defaultVendorCreditBrandingAttributes } from './constants';
import { mergePdfTemplateWithDefaultAttributes } from '../../Purchases/Bills/utils';
import { GetOrganizationBrandingAttributes } from '../../PdfTemplate/GetOrganizationBrandingAttributes';

export class VendorCreditBrandingTemplate {
  @Inject()
  private getPdfTemplateService: GetPdfTemplate;

  @Inject()
  private getOrgBrandingAttributes: GetOrganizationBrandingAttributes;

  /**
   * Retrieves the credit note branding template.
   * @param {number} tenantId
   * @param {number} templateId
   * @returns {}
   */
  public async getVendorCreditBrandingTemplate(
    tenantId: number,
    templateId: number
  ) {
    const template = await this.getPdfTemplateService.getPdfTemplate(
      tenantId,
      templateId
    );
    // Retrieves the organization branding attributes.
    const commonOrgBrandingAttrs =
      await this.getOrgBrandingAttributes.getOrganizationBrandingAttributes(
        tenantId
      );
    // Merges the default branding attributes with common organization branding attrs.
    const organizationBrandingAttrs = {
      ...defaultVendorCreditBrandingAttributes,
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

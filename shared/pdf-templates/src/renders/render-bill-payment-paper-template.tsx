import {
  BillPaymentPaperTemplateProps,
  BillPaymentPaperTemplate,
} from '../components/BillPaymentPaperTemplate';
import { renderSSR } from './render-ssr';

export const renderBillPaymentPaperTemplateHtml = (
  props: BillPaymentPaperTemplateProps
) => {
  return renderSSR(<BillPaymentPaperTemplate {...props} />);
};

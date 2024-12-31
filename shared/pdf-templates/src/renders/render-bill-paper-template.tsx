import {
  BillPaperTemplate,
  BillPaperTemplateProps,
} from '../components/BillPaperTemplate';
import { renderSSR } from './render-ssr';

export const renderBillPaperTemplateHtml = (
  props: BillPaperTemplateProps
) => {
  return renderSSR(
    <BillPaperTemplate {...props} />
  );
};

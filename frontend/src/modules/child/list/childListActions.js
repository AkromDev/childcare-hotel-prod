import ChildService from 'modules/child/childService';
import paginationAction from 'modules/shared/pagination/paginationAction';
import selectors from 'modules/child/list/childListSelectors';
import { i18n } from 'i18n';
import exporterFields from 'modules/child/list/childListExporterFields';

const prefix = 'PET_LIST';

export default paginationAction(
  prefix,
  ChildService.list,
  selectors,
  i18n('entities.child.exporterFileName'),
  exporterFields,
);

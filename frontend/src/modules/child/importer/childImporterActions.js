import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/child/importer/childImporterSelectors';
import ChildService from 'modules/child/childService';
import fields from 'modules/child/importer/childImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'PET_IMPORTER',
  selectors,
  ChildService.import,
  fields,
  i18n('entities.child.importer.fileName'),
);

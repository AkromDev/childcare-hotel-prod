import ChildService from 'modules/child/childService';
import formActions from 'modules/shared/form/formActions';

const prefix = 'PET_FORM';

export default formActions({
  prefix,
  createFn: ChildService.create,
  createSuccessMessageI18nKey:
    'entities.child.create.success',
  updateFn: ChildService.update,
  updateSuccessMessageI18nKey:
    'entities.child.update.success',
  findFn: ChildService.find,
  redirectTo: '/child',
});

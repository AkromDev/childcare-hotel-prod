import destroyActions from 'modules/shared/destroy/destroyActions';
import listActions from 'modules/child/list/childListActions';
import ChildService from 'modules/child/childService';

const prefix = 'PET_DESTROY';

export default destroyActions({
  prefix,
  destroyAllFn: ChildService.destroyAll,
  destroySuccessMessageI18nKey:
    'entities.child.destroy.success',
  destroyAllSuccessMessageI18nKey:
    'entities.child.destroyAll.success',
  redirectTo: '/child',
  listActions,
});

import viewActions from 'modules/shared/view/viewActions';
import ChildService from 'modules/child/childService';

const prefix = 'PET_VIEW';

export default viewActions({
  prefix,
  findFn: ChildService.find,
  redirectToOnError: '/child',
});

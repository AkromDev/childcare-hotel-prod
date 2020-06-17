import list from 'modules/child/list/childListReducers';
import form from 'modules/child/form/childFormReducers';
import view from 'modules/child/view/childViewReducers';
import destroy from 'modules/child/destroy/childDestroyReducers';
import importerReducer from 'modules/child/importer/childImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});

import { createActions } from 'redux-actions';


export const uiActions = createActions({
    CHANGE_UI_LOADER_FLAG: ({ status, path }) => ({ status, path }),
    SWITCH_CRM_PAGE:       (ref, options) => ({ ref, options }),
    GET_ONE_TIME_ACCESS:   (toDo, onSuccess, onFail, id) => ({ toDo, onSuccess, onFail, id }),
});

import * as CONSTANTS from './ActionTypes';

export const changeDarkMode = mode => ({
    type: CONSTANTS.CHANGE_MODE,
    payload: mode
});
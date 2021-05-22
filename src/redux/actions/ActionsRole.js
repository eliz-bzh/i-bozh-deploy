import * as CONSTANTS from "./ActionTypes";

export const updateRole = role => ({
    type: CONSTANTS.UPDATE_ROLE,
    payload: role
});
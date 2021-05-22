import * as CONSTANTS from "./ActionTypes";

export const addItemInCart = item => ({
  type: CONSTANTS.ADD_ITEM_IN_CART,
  payload: item
});
export const deleteCartItem = id => ({
  type: CONSTANTS.DELETE_CART_ITEM,
  payload: id
});
export const updateQuantityCartItem = object => ({
  type: CONSTANTS.UPDATE_QUANTITY_CART_ITEM,
  payload: object
});
export const clearCart = () => ({
  type: CONSTANTS.CLEAR_CART,
  payload: []
});
import * as CONSTANTS from "../actions/ActionTypes";

// If multiple components need access to some data, in that case we store such data in redux.
const initialState = {
  cartItems: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_ITEM_IN_CART: {
      let index = state.cartItems.findIndex(x => x.id === action.payload.id);

      // Is the item user wants to add already in the cart?
      if (index !== -1) {
        // Yes, update the quantity.
        let cloneCartItems = [...state.cartItems];
        cloneCartItems[index] = {
          ...cloneCartItems[index],
          quantity: state.cartItems[index].quantity + action.payload.quantity
        };

        return { ...state, cartItems: cloneCartItems };
      }

      // No, add a new item.
      return { ...state, cartItems: state.cartItems.concat(action.payload) };
    }
    case CONSTANTS.DELETE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.id !== action.payload)
      };
    case CONSTANTS.UPDATE_QUANTITY_CART_ITEM: {
      let index = state.cartItems.findIndex(x => x.id === action.payload.id);

      // User wants to update quantity of existing item.
      if (index !== -1) {
        let cloneCartItems = [...state.cartItems];
        cloneCartItems[index] = {
          ...cloneCartItems[index],
          quantity: action.payload.quantity
        };

        return { ...state, cartItems: cloneCartItems };
      }

      // If we couldn't find such item, do nothing.
      return state;
    }
    case CONSTANTS.CLEAR_CART: {
      return { ...state, cartItems: action.payload };
    }
    default:
      return state;
  }
};

export default cartReducer;

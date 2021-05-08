import { ActionTypes } from "./action-types"

const setCartOpen = (dispatch, payload) => {
  dispatch({ type: ActionTypes.SET_OPEN_CART, payload })
}
const setAddToCartFirstTime = (dispatch, payload) => {
  dispatch({ type: ActionTypes.SET_ADD_TO_CART_FIRST_TIME, payload })
}
const addItemToCart = (dispatch, payload) => {
  if (payload.stock > 0) {
    dispatch({ type: ActionTypes.ADD_ITEM_TO_CART, payload })
  }
}
const removeItemFromCart = (dispatch, payload) => {
  dispatch({ type: ActionTypes.REMOVE_ITEM_FROM_CART, payload })
}
const incrementItemInCart = (dispatch, payload) => {
  if (payload.quantity >= payload.stock) {
    alert('Cannot add robots more than stock.')
    return
  }
  dispatch({ type: ActionTypes.INCREMENT_ITEM_IN_CART, payload })
}
const decrementItemInCart = (dispatch, payload) => {  
  if (payload.quantity <= 1) {
    dispatch({ type: ActionTypes.REMOVE_ITEM_FROM_CART, payload })  
    return
  }
  dispatch({ type: ActionTypes.DECREMENT_ITEM_IN_CART, payload })
}

export {
  setCartOpen,
  setAddToCartFirstTime,
  addItemToCart,
  removeItemFromCart,
  incrementItemInCart,
  decrementItemInCart
}
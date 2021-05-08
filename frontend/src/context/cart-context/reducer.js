import { ActionTypes } from './action-types'

export const initialState = {
  isCartOpen: false,
  isAddToCartFirstTime: true,
  cartItems: []
}

export const CartReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_OPEN_CART:
      return {
        ...state,
        isCartOpen: action.payload
      }
    case ActionTypes.SET_ADD_TO_CART_FIRST_TIME:
      return {
        ...state,
        isAddToCartFirstTime: action.payload
      }
    case ActionTypes.ADD_ITEM_TO_CART: 
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      }
    case ActionTypes.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.name !== action.payload.name
        )
      }
    case ActionTypes.INCREMENT_ITEM_IN_CART:
      return {
        ...state,
        cartItems: state.cartItems.map((obj) => {
          const item = {...obj}
          if (item.name === action.payload.name) {
            item.quantity++
          }
          return item
        })
      }
    case ActionTypes.DECREMENT_ITEM_IN_CART:
      return {
        ...state,
        cartItems: state.cartItems.map((obj) => {
          const item = {...obj}
          if (item.name === action.payload.name) {
            item.quantity--
          }
          return item
        })
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
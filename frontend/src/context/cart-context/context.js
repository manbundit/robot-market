import { useContext, createContext, useReducer, useMemo } from 'react'
import { CartReducer, initialState } from './reducer'

const CartStateContext = createContext()
const CartDispatchContext = createContext()

export const useCartState = () => useContext(CartStateContext)
export const useCartDispatch = () => useContext(CartDispatchContext)

export const CartContextProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(CartReducer, initialState)  

  const totalAmount = useMemo(() => {
    return cart.cartItems.reduce((acc, item) => {
      return acc += item.quantity
    }, 0)     
  }, [cart.cartItems])

  const totalPrice = useMemo(() => {
    const total = cart.cartItems.reduce((acc, item) => {
      return acc += item.quantity * item.price
    }, 0) 
    return total
  }, [cart.cartItems])

  return (
    <CartStateContext.Provider value={{...cart, totalAmount, totalPrice}}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  )
}
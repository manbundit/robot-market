import React, { useEffect, useState } from 'react';
import CartContextProvider, {
  useCartState,
  useCartDispatch,
  setCartOpen
} from 'context/cart-context/index'
import RobotList from 'components/robox-list/RobotList'
import Cart from 'components/cart/Cart'

function App() {
  const dispatch = useCartDispatch()
  const { isCartOpen, totalAmount } = useCartState()
  const [rippleButton, setRippleButton] = useState(false)
  const handleCartButtonClick = () => {
    setCartOpen(dispatch, !isCartOpen)
  }

  useEffect(() => {
    if (totalAmount) {
      setRippleButton(true)
    }
  }, [totalAmount])

  useEffect(() => {
    setTimeout(() => {
      setRippleButton(false)
    }, 100)
  }, [rippleButton])

  return (
    <div className="App">
      <header className="fixed">
        <h1>Robot Market</h1>
        <div className={`cartBtn ${rippleButton && 'ripple'}`}>
          {!!totalAmount && <span className="bubble">{totalAmount}</span>}
          <button
            className={`${isCartOpen && 'active'}`}
            onClick={handleCartButtonClick}>
              My Cart
          </button>
        </div>
      </header> 
      <RobotList />
      <Cart />
    </div>
  );
}

function AppWithCartContext () {
  return (
    <CartContextProvider>
      <App />
    </CartContextProvider>
  )
}

export default AppWithCartContext;

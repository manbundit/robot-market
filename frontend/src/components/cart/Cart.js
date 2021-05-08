import { priceFormatter } from 'utils/formatter'
import CartItem from './CartItem'
import { useCartState } from 'context/cart-context/index'
import styles from 'styles/component/cart/cart.module.scss'

export default function Cart() {
  const { isCartOpen, cartItems, totalAmount, totalPrice } = useCartState()  
  
  return (
    <section className={`${styles.cart} ${isCartOpen && styles.active}`}>      
      {
        cartItems.length 
        ? cartItems.map((item) => <CartItem key={item.name} {...item}/>)
        : <span className={styles.emptyCart}>Your Cart Is Empty.</span>
      }
      <div className={styles.totalContainer}>
        <div className={styles.total}>
          Total Amount: <span className={styles.price}>{totalAmount}</span>
        </div>
        <div className={styles.total}>
          Total Price: <span className={styles.price}>{priceFormatter.format(totalPrice)}</span>
        </div>
      </div>
    </section>
  )
}
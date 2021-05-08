import { useMemo } from 'react'
import { priceFormatter } from 'utils/formatter'
import { useCartDispatch, incrementItemInCart, decrementItemInCart } from 'context/cart-context'
import styles from 'styles/component/cart/cart-item.module.scss'

export default function CartItem(item) {
  const { name, price, stock, quantity, image} = item
  const dispatch = useCartDispatch()  

  const handleIncrement = () => {    
    incrementItemInCart(dispatch, { ...item })
  }

  const handleDecrement = () => {    
    decrementItemInCart(dispatch, { ...item })          
  }
  
  return (
    <div className={styles.cartItem}>
      <div className={styles.imgCol}>
        <div className={styles.thumb}>
          <img className={styles.img} src={image} alt={name}/>
        </div>
      </div>
      <div className={styles.detail}>
        <div className={styles.name}>{name}</div>
        <div className={styles.price}>{priceFormatter.format(price)}</div>
      </div>
      <Quantity 
        onIncrement={handleIncrement} 
        onDecrement={handleDecrement} 
        quantity={quantity}
        price={price}
      />
    </div>
  )
}

const Quantity = ({ quantity, price, onIncrement, onDecrement }) => {
  const totalPrice = useMemo(() => {    
    return priceFormatter.format(quantity * price)
  }, [quantity, price])
  return (
    <div className={styles.quantityWrapper}>
      <div className={styles.subtract} onClick={onDecrement}/>
      <div className={styles.add} onClick={onIncrement}/>
      <span className={styles.count}>{quantity.toString()}</span>
      <span className={styles.totalPrice}>{totalPrice}</span>
    </div>
  )
}
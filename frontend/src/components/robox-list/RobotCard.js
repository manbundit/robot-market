import { useCartDispatch, useCartState, addItemToCart, incrementItemInCart, setAddToCartFirstTime, setCartOpen } from 'context/cart-context/index'
import { priceFormatter } from 'utils/formatter'
import styles from 'styles/component/robot-list/robot-card.module.scss'

export default function RobotCard(props) {
  const { name, image, material, price, stock, stockLeft, createdAt, ...otherProps} = props
  const dispatch = useCartDispatch()
  const { cartItems, isAddToCartFirstTime } = useCartState()

  const addToCart = () => {    
    const payload = {
      name,
      image,
      price,
      stock,
      stockLeft,
    }    
    const itemInCart = cartItems.find((item) => item.name === name)
    const isItemExistInCart = !!itemInCart
    if (!isItemExistInCart) {
      if (cartItems.length >= 5) {
        alert('You can only add maximum robot up to 5!!')
        return
      }
      addItemToCart(dispatch, { ...payload, quantity: 1 } )
      if (isAddToCartFirstTime) {
        setAddToCartFirstTime(dispatch, false)
        setCartOpen(dispatch, true)
        setTimeout(() => {
          setCartOpen(dispatch, false)
        }, 1200)
      }
    } else {      
      incrementItemInCart(dispatch, { ...payload, quantity: itemInCart.quantity })
    }
  }

  const formatPrice = (price) => {
    return priceFormatter.format(price)
  }

  return (
    <div className={`${styles.card} ${stockLeft <= 0 && styles.outOfStock}`} {...otherProps}>
      <figure className={styles.thumb}>
        <img src={image} alt={name} />
        <span className={styles.overlay}>
          <button className={styles.addToCartBtn} onClick={() => addToCart()} disabled={stockLeft <= 0}>
            {stockLeft <= 0 ? 'Out of Stock' : 'Add To Cart'}
          </button>
        </span>
      </figure>
      <div className={styles.detail}>
        <h3 className={styles.title}>{name}</h3>
        <div className={styles.material}>{material}</div>
        <div className={styles.price}>{formatPrice(price)}</div>
        <div className={styles.stock}>Stock: {stockLeft}</div>
        <div className={styles.date}>Created Date: {new Date(createdAt).toLocaleDateString('th-TH').replace(/\//g, '-')}</div>
      </div>
    </div>
  )
}
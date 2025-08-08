import { useLoaderData, Link } from "react-router-dom";
import styles from './Cart.module.css';
import { getHostProducts } from "../../util";
import { useCart } from "../../CartContext";

export async function loader() {
    console.log("cartloader")
    return getHostProducts()
}

const Cart = () => {
    const products = useLoaderData()
    const { cart, addToCart, removeFromCart, getTotalItems } = useCart()

    // Filter products to only show items in cart
    const cartItems = products.filter(product => cart[product.id])

    const handlePurchase = () => {
        alert("Purchase functionality would go here!")
        // In a real app, you'd redirect to checkout or process payment
    }

    return (
        <div className={styles.container}>
            <Link
                to={'..'}
                relative="path"
                className={styles.backLink}
            >
                <p>{"<-- back to parent page"}</p>
            </Link>

            <h1>Your Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <div className={styles.cartItems}>
                        {cartItems.map(product => (
                            <div key={product.id} className={styles.cartItem}>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className={styles.itemImage}
                                />
                                <div className={styles.itemDetails}>
                                    <h3>{product.title}</h3>
                                    <p className={styles.itemPrice}>${product.price}</p>
                                </div>
                                <div className={styles.quantityControls}>
                                    <button
                                        className={styles.quantityBtn}
                                        onClick={() => removeFromCart(product.id)}
                                    >
                                        -
                                    </button>
                                    <span className={styles.quantity}>
                                        {cart[product.id]}
                                    </span>
                                    <button
                                        className={styles.quantityBtn}
                                        onClick={() => addToCart(product.id)}
                                    >
                                        +
                                    </button>
                                </div>
                                <p className={styles.itemTotal}>
                                    ${(product.price * cart[product.id]).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className={styles.cartSummary}>
                        <p className={styles.totalItems}>
                            Total Items: {getTotalItems()}
                        </p>
                        <p className={styles.totalPrice}>
                            Total: ${cartItems.reduce(
                                (sum, product) => sum + (product.price * cart[product.id]),
                                0
                            ).toFixed(2)}
                        </p>
                        <button
                            className={styles.purchaseBtn}
                            onClick={handlePurchase}
                        >
                            Purchase
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Cart;

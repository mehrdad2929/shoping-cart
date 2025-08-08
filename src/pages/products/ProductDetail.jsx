import { Link, useLocation, useLoaderData } from "react-router";
import { getProducts } from "../../util";
import styles from './ProductsDetail.module.css';
import { useCart } from "../../CartContext";
export async function loader({ params }) {
    return getProducts(params.id)
}

const ProductDetail = () => {
    const { cart, addToCart, removeFromCart, getProductCount } = useCart()
    const productData = useLoaderData()
    const location = useLocation()

    return (
        <div className={styles.productDetailSection}>
            <Link
                to={location.state?.search ? `..${location.state.search}` : ".."}
                relative="path"
                className={styles.backLink}
            >
                <p className={styles.backText}>
                    {`← Back to ${location.state?.search?.split("=")[1] || "products"} page`}
                </p>
            </Link>

            <h1 className={styles.productTitle}>{productData.title}</h1>

            <div className={styles.productImageContainer}>
                <img
                    src={productData.image}
                    alt={productData.title}
                    className={styles.productImage}
                />
            </div>

            <p className={styles.productPrice}>Price: ${productData.price}</p>

            <p className={styles.productDescription}>
                <strong>Description:</strong> {productData.description}
            </p>

            {getProductCount(productData.id) > 0 ? (
                <div className={styles.inlineQuantityControls}>
                    <button
                        className={styles.quantityBtn}
                        onClick={() => removeFromCart(productData.id)}
                    >
                        −
                    </button>
                    <input
                        className={styles.quantityInput}
                        value={getProductCount(productData.id)}
                        readOnly
                    />
                    <button
                        className={styles.quantityBtn}
                        onClick={() => addToCart(productData.id)}
                    >
                        +
                    </button>
                </div>
            ) : (
                <button className={styles.addToCartBtn} onClick={() => addToCart(productData.id)}>
                    ➕ Add to Cart
                </button>
            )}
        </div>
    )
}

export default ProductDetail;

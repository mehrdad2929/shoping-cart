import { useLoaderData, Link } from "react-router-dom";
import styles from './Cart.module.css';
import { getHostProducts } from "../../util";

export async function loader() {
    // await getHostProducts(request)
    // console.log("params and request:", { params, request })
    console.log("cartloader")
    return getHostProducts()
}
const Cart = () => {
    const cartData = useLoaderData()
    console.log("loaderdata:", cartData)

    return (
        <div className={styles.container}>
            <Link
                to={'..'}
                relative="path"
                className={styles.backLink}
            >
                <p>{"<-- back to parent page"}</p>
            </Link>
            <p>shoping cart</p>

        </div>
    )
}
export default Cart;

import { Link, useLocation, useLoaderData } from "react-router";
import { getProducts } from "../../util";

export async function loader({ params }) {
    return getProducts(params.id)
}
const ProductDetail = () => {
    const productData = useLoaderData()
    const location = useLocation()
    return (
        <div>
            <Link
                to={location.state?.search ? `..${location.state.search}` : ".."}
                relative="path"
            >
                <p>{`<-- back to ${location.state?.search?.split("=")[1] || "products"} page`}</p>
            </Link>
            <h1>this is {productData.title} .</h1>
            <img src={productData.image} alt={productData.title} width={200} />
            <i>price : ${productData.price}/day</i>
            <p>description:{productData.description}</p>
            <button
            /* onClick={(e) => {
                e.preventDefault()
                //functionality to add to cart

            }} */
            >add this to cart</button>
        </div>
    )
}
export default ProductDetail;

import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    redirect,
    Route
} from "react-router"
import Home from "./pages/Home"
import Products, { loader as productsLoader } from "./pages/products/Products.jsx"
import Error from "./components/Error.jsx"
import ProductDetail, { loader as productDetailLoader } from "./pages/products/ProductDetail.jsx"
import Layout from "./components/Layout"
import NotFoundPage from "./pages/NotFoundPage.jsx"
import { requireAuth } from "./util.js"
import Login, { loginAction, loginLoader } from "./pages/Login.jsx"
import Logout, { logoutAction } from "./pages/Logout.jsx"
import Cart, { loader as cartLoader } from "./pages/cart/Cart.jsx"
import { CartProvider } from "./CartContext.jsx"
const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} loader={loginLoader} action={loginAction} />
        <Route
            path="logout"
            element={<Logout />}
            action={logoutAction}
            loader={async ({ request }) => {
                await requireAuth(request)
                return null
            }}
        />
        <Route path="products" element={<Products />} loader={productsLoader} />
        <Route path="products/:id" element={<ProductDetail />} loader={productDetailLoader} />


        <Route
            path="cart"
            element={<Cart />}
            loader={async () => {
                //await requireAuth(request)
                return cartLoader()
            }}
        />

        {/* <Route
            path="cart/:id"
            element={<HostproductsDetailLayout />}
            loader={async (args) => {
                const request = args.request
                await requireAuth(request)
                return hostproductsDetailLoader(args)
            }}
        >
            <Route index element={<HostproductsInfo />} />
            <Route path="pricing" element={<HostproductsPricing />} />
            <Route path="photos" element={<HostproductsPhotos />} />
            <Route path="*" element={<NotFoundPage />} />
        </Route> */}
        <Route path="*" element={<NotFoundPage />} />
    </Route>
))
function App() {
    return (
        < CartProvider >
            <RouterProvider router={router} />
        </CartProvider >
    )
}
export default App;

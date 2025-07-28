import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	redirect,
	Route
} from "react-router"
// import "./server"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans, { loader as vansLoader } from "./pages/Vans/Vans"
import Error from "./components/Error.jsx"
import VanDetail, { loader as vanDetailLoader } from "./pages/Vans/VanDetail"
import Layout from "./components/Layout"
import HostLayout from "./pages/Host/HostLayout"
import Dashboard from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostVans, { loader as hostVansLoader } from "./pages/Host/HostVans"
import HostVansInfo from "./pages/Host/HostVansInfo"
import HostVansDetailLayout, { loader as hostVansDetailLoader } from "./pages/Host/HostVansDetailLayout";
import HostVansPhotos from "./pages/Host/HostVansPhotos";
import HostVansPricing from "./pages/Host/HostVansPricing";
import NotFoundPage from "./pages/NotFoundPage.jsx"
import { requireAuth } from "./util.js"
import Login, { loginAction, loginLoader } from "./pages/Login.jsx"
import Logout, { logoutAction } from "./pages/Logout.jsx"
const router = createBrowserRouter(createRoutesFromElements(
	<Route path="/" element={<Layout />} errorElement={<Error />}>
		<Route index element={<Home />} />
		<Route path="about" element={<About />} />
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
		<Route path="vans" element={<Vans />} loader={vansLoader} />
		<Route path="vans/:id" element={<VanDetail />} loader={vanDetailLoader} />
		<Route path="host" element={<HostLayout />} >
			<Route
				index
				element={<Dashboard />}
				loader={async ({ request }) => {
					await requireAuth(request)
					return null
				}}
			/>
			<Route
				path="income"
				element={<Income />}
				loader={async ({ request }) => {
					await requireAuth(request)
					return null
				}}
			/>
			<Route
				path="reviews"
				element={<Reviews />}
				loader={async ({ request }) => {
					await requireAuth(request)
					return null
				}}
			/>
			<Route
				path="vans"
				element={<HostVans />}
				loader={async ({ request }) => {
					await requireAuth(request)
					return hostVansLoader()
				}}
			/>
			<Route
				path="vans/:id"
				element={<HostVansDetailLayout />}
				loader={async (args) => {
					const request = args.request
					await requireAuth(request)
					return hostVansDetailLoader(args)
				}}
			>
				<Route index element={<HostVansInfo />} />
				<Route path="pricing" element={<HostVansPricing />} />
				<Route path="photos" element={<HostVansPhotos />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
			<Route path="*" element={<NotFoundPage />} />
		</Route>
		<Route path="*" element={<NotFoundPage />} />
	</Route>
))
function App() {
	return (
		<RouterProvider router={router} />
	)
}
export default App;

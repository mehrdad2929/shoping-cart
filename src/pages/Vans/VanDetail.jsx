import { Link, useLocation, useLoaderData } from "react-router";
import { getVans } from "../../api";

export function loader({ params }) {
	return getVans(params.id)
}
const VanDetail = () => {
	const vanData = useLoaderData()
	const location = useLocation()
	return (
		<div>
			<Link
				to={location.state?.search ? `..${location.state.search}` : ".."}
				relative="path"
			>
				<p>{`<-- back to ${location.state?.search?.split("=")[1] || "vans"} page`}</p>
			</Link>
			<h1>this is {vanData.name} .</h1>
			<img src={vanData.imageUrl} alt={vanData.name} width={200} />
			<i>price : ${vanData.price}/day</i>
			<p>description:{vanData.description}</p>
		</div>
	)
}
export default VanDetail;

import { useOutletContext, Link } from "react-router-dom";
const HostVansPricing = () => {
	const { vanData } = useOutletContext();
	return (
		<div>
			<Link
				to={'..'}
				relative="path"
			>
			</Link>
			<i>this van will cost you {vanData.price} dollar per day</i>
		</div>
	)
}
export default HostVansPricing;

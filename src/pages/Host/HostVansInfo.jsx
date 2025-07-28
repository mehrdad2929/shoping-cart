import { useOutletContext } from "react-router-dom";
const HostVansDetail = () => {
	const { vanData } = useOutletContext();
	return (
		<div>
			<p>Category: {vanData.type}</p>

			<p>description: {vanData.description}</p>
		</div>
	)
}
export default HostVansDetail;

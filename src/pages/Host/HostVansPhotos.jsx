import { useOutletContext } from "react-router-dom";
import styles from "./HostVansPhotos.module.css"
const HostVansPhotos = () => {
	const { vanData } = useOutletContext();
	return (
		<div className={styles.imageContainer}>
			<img src={vanData.imageUrl} alt={vanData.name} />
		</div>
	)
}
export default HostVansPhotos;

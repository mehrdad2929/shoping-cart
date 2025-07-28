import { useLoaderData, Outlet, Link, NavLink } from "react-router-dom";
import styles from './HostVansDetailLayout.module.css';
import { getHostVans } from "../../api";
import { requireAuth } from "../../util";

export async function loader({ params, request }) {
	await requireAuth(request)
	return getHostVans(params.id)
}
const HostVansDetailLayout = () => {
	const vanData = useLoaderData()

	return (
		<div className={styles.container}>
			<Link
				to={'..'}
				relative="path"
				className={styles.backLink}
			>
				<p>{"<-- back to parent page"}</p>
			</Link>

			<div className={styles.layout}>
				<div className={styles.sidebar}>
					<div className={styles.vanInfo}>
						<h1>{vanData.name}</h1>
						<img src={vanData.imageUrl} alt={vanData.name} />
						<p>${vanData.price}/day</p>
					</div>

					<nav className={styles.navbar}>
						<NavLink
							to='.'
							className={({ isActive }) =>
								`${styles.navlink} ${isActive ? styles.active : ''}`
							}
							end
						>
							info
						</NavLink>
						<NavLink
							to='pricing'
							className={({ isActive }) =>
								`${styles.navlink} ${isActive ? styles.active : ''}`
							}
						>
							pricing
						</NavLink>
						<NavLink
							to='photos'
							className={({ isActive }) =>
								`${styles.navlink} ${isActive ? styles.active : ''}`
							}
						>
							photos
						</NavLink>
					</nav>
				</div>

				<section className={styles.content}>
					<Outlet context={{ vanData }} />
				</section>
			</div>
		</div>
	)
}
export default HostVansDetailLayout;

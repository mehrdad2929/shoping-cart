// components/HostLayout.jsx
import { Outlet, NavLink } from "react-router-dom"
import styles from './HostLayout.module.css';
const HostLayout = () => {
	return (
		<div>
			<nav className={styles.navbar}>
				<NavLink
					className={({ isActive }) =>
						`${styles.navlink} ${isActive ? styles.active : ''}`
					}
					end
					to="."
				>
					Dashboard
				</NavLink>
				<NavLink

					className={({ isActive }) =>
						`${styles.navlink} ${isActive ? styles.active : ''}`
					}
					to="income"
				>
					Income
				</NavLink>
				<NavLink

					className={({ isActive }) =>
						`${styles.navlink} ${isActive ? styles.active : ''}`
					}
					to="vans"
				>
					Vans
				</NavLink>
				<NavLink

					className={({ isActive }) =>
						`${styles.navlink} ${isActive ? styles.active : ''}`
					}
					to="reviews"
				>
					Reviews
				</NavLink>

			</nav>
			<div>
				<Outlet /> {/* This renders Dashboard, Income, or Reviews */}
			</div>
		</div>
	)
}

export default HostLayout

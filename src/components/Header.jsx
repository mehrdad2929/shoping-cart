import { Link, NavLink } from "react-router-dom"
import styles from "./Header.module.css"
import { useCart } from "../CartContext"

const Header = ({ isLoggedIn }) => {
    const { getTotalItems } = useCart()

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link className={styles.logo} to="/">
                    <span className={styles.logoIcon}>🛒</span>
                    <span className={styles.logoText}>EupShop</span>
                </Link>

                <nav className={styles.navbar}>
                    <NavLink
                        className={({ isActive }) =>
                            `${styles.navlink} ${isActive ? styles.active : ''}`
                        }
                        to="/"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `${styles.navlink} ${isActive ? styles.active : ''}`
                        }
                        to="/products"
                    >
                        Products
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `${styles.navlink} ${isActive ? styles.active : ''}`
                        }
                        to="/cart"
                    >
                        <span className={styles.cartIcon}>🛒</span>
                        <span>Cart</span>
                        {getTotalItems() > 0 && (
                            <span className={styles.cartCount}>
                                {getTotalItems()}
                            </span>
                        )}
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}

export default Header

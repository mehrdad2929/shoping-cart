import { Link, NavLink } from "react-router-dom"
import React from "react"
import styles from "./Header.module.css"
const Header = ({ isLoggedIn }) => {
    return (
        <div className={styles.header}>
            <Link className={styles.sitelogo} to="/">#(randomshop)Shoping Cart</Link>
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
                    to="/cart"
                >
                    Cart
                </NavLink>
                <NavLink

                    className={({ isActive }) =>
                        `${styles.navlink} ${isActive ? styles.active : ''}`
                    }
                    to="/products"
                >
                    Products
                </NavLink>
            </nav>
        </div>
    )
}
export default Header;

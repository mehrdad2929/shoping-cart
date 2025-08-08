import { Link, NavLink } from "react-router-dom"
import { useState, useEffect } from "react"
import styles from "./Header.module.css"
import { useCart } from "../CartContext"
const Header = ({ isLoggedIn }) => {
    const { getTotalItems } = useCart()

    /* const [cart, setCart] = useState(() => {
        const cartList = JSON.parse(localStorage.getItem("cart")) || {}
        return cartList
    })

    useEffect(() => {
        const handleStorageChange = () => {
            const saved = localStorage.getItem("cart");
            setCart(saved ? JSON.parse(saved) : {});
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const getAllProductCount = () => {
        console.log("count")
        let sum = 1
        Object.values(cart).forEach(value => {
            sum += parseInt(value);
        })
        return sum;
    }; */
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
                    Cart : {getTotalItems()}
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

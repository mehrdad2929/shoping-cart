import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'; // Used in React Router v6+
import Header from './Header';
import Footer from './Footer';
import style from './Layout.module.css'
const Layout = () => {
	const [isLoggedin, setIsloggedIn] = useState(() => {
		return localStorage.getItem("loggedin") === "true"
	})
	useEffect(() => {
		const handleStorageChange = () => {
			setIsloggedIn(localStorage.getItem("loggedin") === "true")
		}
		window.addEventListener("storage", handleStorageChange)
		const interval = setInterval(handleStorageChange, 1000)
		return () => {
			window.removeEventListener("storage", handleStorageChange)
			clearInterval(interval)
		}
	}, [])
	return (
		<div className={style.layout}>
			<Header isLoggedIn={isLoggedin} />
			<main>
				<Outlet />
			</main>

			<Footer />
		</div>
	);
};

export default Layout;

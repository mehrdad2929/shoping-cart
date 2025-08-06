import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'; // Used in React Router v6+
import Header from './Header';
import Footer from './Footer';
import style from './Layout.module.css'
const Layout = () => {
    //NOTE: can i lift cart products state to this coponent level? 
    //WARN: not realy,if u save this kinda data(username/password , choosen products id's)
    //in state upon reloads they will disappear so maybe save them on local storage(which is 
    //not safe atleast not for user/pass) or on a database(firestore maybe)
    //TODO:for now use localestorage for user/pass(auth) and choosen products 
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

import styles from './Home.module.css'

const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <h1 className={styles.title}>Welcome to EupShop</h1>
                <p className={styles.subtitle}>Your one-stop destination for amazing products</p>

                <div className={styles.cta}>
                    <a href="/products" className={styles.button}>
                        Shop Now
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Home

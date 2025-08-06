import { Link, useSearchParams, useLoaderData, Await } from "react-router"
import { Suspense } from "react"
import styles from './Products.module.css'
import { getProducts } from "../../util"

export async function loader() {
    return getProducts()
}
export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const typeFilter = searchParams.get("type");
    const products = useLoaderData()

    const handleFilterClick = (type) => {
        setSearchParams({ type: type })
    }

    const clearFilters = () => {
        setSearchParams({})
    }

    return (
        <section className={styles.productsSection}>
            <h1 className={styles.productsTitle}>Explore our product options</h1>
            <Suspense fallback={<div>loading products...</div>}>
                <Await resolve={products}>
                    {(products) => {
                        const displayedproducts = typeFilter ? products.filter(product => product.type === typeFilter.toLowerCase()) : products;
                        const productsEls = displayedproducts.map(product => (
                            <Link
                                to={String(product.id)}
                                state={{ search: `?${searchParams.toString()}` }}
                                key={product.id}
                                className={styles.productCard}
                            >
                                <img
                                    src={product.image}
                                    alt={`Photo of ${product.title}`}
                                    className={styles.productImage}
                                />
                                <div className={styles.productInfo}>
                                    <h3>{product.title}</h3>
                                    <p>${product.price}/day</p>
                                    {product.category && <span className={`${styles.productType} ${styles[product.category]}`}>{product.category}</span>}
                                </div>
                            </Link>
                        ))

                        return (
                            <>
                                {/*
                                * TODO:figure out the filtering of it 
                                */}
                                <div className={styles.filtersContainer}>
                                    <button
                                        onClick={() => handleFilterClick("mens-clothing")}
                                        className={`${styles.filterButton} ${typeFilter === "mens-Clothing" ? styles.active : ""}`}
                                    >
                                        mens-clothing
                                    </button>
                                    <button
                                        onClick={() => handleFilterClick("jewlery")}
                                        className={`${styles.filterButton} ${typeFilter === "juxury" ? styles.active : ""}`}
                                    >
                                        jewlery
                                    </button>
                                    <button
                                        onClick={() => handleFilterClick("electronics")}
                                        className={`${styles.filterButton} ${typeFilter === "electronics" ? styles.active : ""}`}
                                    >
                                        electronics
                                    </button>
                                    <button
                                        onClick={() => handleFilterClick("womens-Clothing")}
                                        className={`${styles.filterButton} ${typeFilter === "womens-Clothing" ? styles.active : ""}`}
                                    >
                                        womens-Clothing
                                    </button>
                                    {typeFilter && (
                                        <button
                                            onClick={clearFilters}
                                            className={styles.clearFilters}
                                        >
                                            Clear filters
                                        </button>
                                    )}
                                </div>
                                <div className={styles.productsContainer}>
                                    {
                                        products.length > 0 ? (
                                            <div className={styles.productsGrid}>
                                                {productsEls}
                                            </div>
                                        ) : (
                                            <h2 className={styles.loading}>Loading...</h2>
                                        )
                                    }
                                </div>
                            </>
                        )
                    }}
                </Await>
            </Suspense>
            <Link
                to={'.'}
                relative="path"
                className={styles.toTopLink}
                onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" })
                }}
            >
                <p>^ Back to top ^</p>
            </Link>
        </section>
    )
}

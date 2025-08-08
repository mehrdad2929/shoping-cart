import { Link, useSearchParams, useLoaderData } from "react-router-dom"
import { useState } from "react"
import styles from './Products.module.css'
import { getProducts } from "../../util"
import { useCart } from "../../CartContext"

export async function loader() {
    return getProducts()
}

export default function Products() {
    const { cart, addToCart, removeFromCart, getProductCount } = useCart()
    const [searchParams, setSearchParams] = useSearchParams();
    const typeFilter = searchParams.get("category");
    const products = useLoaderData()

    const handleFilterClick = (category) => {
        setSearchParams({ category: category })
    }

    const clearFilters = () => {
        setSearchParams({})
    }

    // Function to normalize CSS class names (remove special characters)
    const getCssClass = (category) => {
        if (!category) return '';
        return category
            .toLowerCase()
            .replace(/'/g, '')  // Remove apostrophes
            .replace(/\s+/g, '-')  // Replace spaces with hyphens
            .replace(/[^\w-]/g, '');  // Remove other special chars
    }

    const displayedproducts = typeFilter
        ? products.filter(product => product.category === typeFilter)
        : products;

    const productsEls = displayedproducts.map(product => (
        <div className={styles.productCardContainer} key={product.id}>
            <Link
                to={String(product.id)}
                state={{ search: `?${searchParams.toString()}` }}
                className={styles.productCard}
            >
                <div className={styles.imageContainer}>
                    <img
                        src={product.image}
                        alt={`Photo of ${product.title}`}
                        className={styles.productImage}
                    />
                </div>

                <div className={styles.productInfo}>
                    <h3 className={styles.productTitle}>{product.title}</h3>
                    <p className={styles.productPrice}>
                        ${product.price}
                    </p>
                    {product.category && (
                        <span className={`${styles.productType} ${styles[getCssClass(product.category)]}`}>
                            {product.category}
                        </span>
                    )}
                </div>
            </Link>

            {getProductCount(product.id) > 0 ? (
                <div className={styles.inlineQuantityControls}>
                    <button
                        className={styles.quantityBtn}
                        onClick={(e) => {
                            e.preventDefault();
                            removeFromCart(product.id);
                        }}
                    >
                        −
                    </button>
                    <input
                        className={styles.quantityInput}
                        value={getProductCount(product.id)}
                        readOnly
                    />
                    <button
                        className={styles.quantityBtn}
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product.id);
                        }}
                    >
                        +
                    </button>
                </div>
            ) : (
                <button
                    className={styles.addToCartBtn}
                    onClick={(e) => {
                        e.preventDefault();
                        addToCart(product.id);
                    }}
                >
                    ➕ Add to Cart
                </button>
            )}
        </div>
    ))

    return (
        <section className={styles.productsSection}>
            <h1 className={styles.productsTitle}>Explore our product options</h1>

            <div className={styles.filtersContainer}>
                <button
                    onClick={() => handleFilterClick("men's clothing")}
                    className={`${styles.filterButton} ${typeFilter === "men's clothing" ? styles.active : ""}`}
                >
                    men's clothing
                </button>
                <button
                    onClick={() => handleFilterClick("jewelery")}
                    className={`${styles.filterButton} ${typeFilter === "jewelery" ? styles.active : ""}`}
                >
                    jewelery
                </button>
                <button
                    onClick={() => handleFilterClick("electronics")}
                    className={`${styles.filterButton} ${typeFilter === "electronics" ? styles.active : ""}`}
                >
                    electronics
                </button>
                <button
                    onClick={() => handleFilterClick("women's clothing")}
                    className={`${styles.filterButton} ${typeFilter === "women's clothing" ? styles.active : ""}`}
                >
                    women's clothing
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
                {products.length > 0 ? (
                    <div className={styles.productsGrid}>
                        {productsEls}
                    </div>
                ) : (
                    <h2 className={styles.loading}>No products found</h2>
                )}
            </div>

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

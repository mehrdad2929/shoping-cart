import { Link, useSearchParams, useLoaderData, Await } from "react-router"
import { Suspense } from "react"
import styles from './Vans.module.css'
import { getVans } from "../../api"
import { setLogLevel } from "firebase/app"

export async function loader() {
	return getVans()
}
export default function Vans() {
	const [searchParams, setSearchParams] = useSearchParams();
	const typeFilter = searchParams.get("type");
	const vans = useLoaderData()



	const handleFilterClick = (type) => {
		setSearchParams({ type: type })
	}

	const clearFilters = () => {
		setSearchParams({})
	}

	return (
		<section className={styles.vansSection}>
			<h1 className={styles.vansTitle}>Explore our van options</h1>
			<Suspense fallback={<div>loading vans...</div>}>
				<Await resolve={vans}>
					{(vans) => {
						const displayedVans = typeFilter ? vans.filter(van => van.type === typeFilter.toLowerCase()) : vans;
						const vansEls = displayedVans.map(van => (
							<Link
								to={van.id}
								state={{ search: `?${searchParams.toString()}` }}
								key={van.id}
								className={styles.vanCard}
							>
								<img
									src={van.imageUrl}
									alt={`Photo of ${van.name}`}
									className={styles.vanImage}
								/>
								<div className={styles.vanInfo}>
									<h3>{van.name}</h3>
									<p>${van.price}/day</p>
									{van.type && <span className={`${styles.vanType} ${styles[van.type]}`}>{van.type}</span>}
								</div>
							</Link>
						))

						return (
							<>
								<div className={styles.filtersContainer}>
									<button
										onClick={() => handleFilterClick("Simple")}
										className={`${styles.filterButton} ${typeFilter === "Simple" ? styles.active : ""}`}
									>
										Simple
									</button>
									<button
										onClick={() => handleFilterClick("Luxury")}
										className={`${styles.filterButton} ${typeFilter === "Luxury" ? styles.active : ""}`}
									>
										Luxury
									</button>
									<button
										onClick={() => handleFilterClick("Rugged")}
										className={`${styles.filterButton} ${typeFilter === "Rugged" ? styles.active : ""}`}
									>
										Rugged
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
								<div className={styles.vansContainer}>
									{
										vans.length > 0 ? (
											<div className={styles.vansGrid}>
												{vansEls}
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

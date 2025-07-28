import { Link } from 'react-router-dom';
const NotFoundPage = () => {
	return (
		<div>
			<h1>404</h1>
			<p>not found sir!</p>
			<Link to={"/"}>
				<button>
					back to vanlife
				</button>
			</Link>
		</div>
	);
};
export default NotFoundPage;

import { useRouteError } from 'react-router-dom';
const ErrorPage = () => {
	const error = useRouteError();
	return (
		<div>
			<h1>Oops!</h1>
			<p>sorry and unexpected error happend</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
};
export default ErrorPage;

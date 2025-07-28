import { Form, redirect } from "react-router-dom"

export async function logoutAction() {
	localStorage.setItem("loggedin", "false")
	const redirectResponse = redirect("/")
	// redirectResponse.body = true
	return redirectResponse
}

export default function Logout() {
	return (
		<div className="logout-container">
			<h1>Are you sure you want to logout?</h1>
			<Form method="post">
				<button type="submit">Logout</button>
			</Form>
		</div>
	)
}

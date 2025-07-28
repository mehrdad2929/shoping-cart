import { redirect } from "react-router"

export async function requireAuth(request) {
	const pathname = new URL(request.url).pathname
	const isLoggedIn = localStorage.getItem("loggedin") === "true" || false

	if (!isLoggedIn) {
		const response = redirect(`/login?message=You must log in first.&redirectTo=${pathname}`)
		// response.body = true
		throw response
	}
}

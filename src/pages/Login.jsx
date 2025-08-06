import { useLoaderData, Form, redirect, useActionData, useNavigation } from "react-router-dom"
import { loginUser } from "../util"

export function loginLoader({ request }) {
    return new URL(request.url).searchParams.get("message")
}
export async function loginAction({ request }) {
    const pathname = new URL(request.url)
        .searchParams.get("redirectTo") || "/host"
    try {
        const formData = await request.formData()
        const creds = {
            email: formData.get("email"),
            password: formData.get("password")
        }
        const data = await loginUser(creds)
        localStorage.setItem("loggedin", "true")
        const redirectResponse = redirect(pathname)
        // redirectResponse.body = true
        return redirectResponse;
    } catch (err) {
        return { error: err.message, status: "error" }
    }
}
export default function Login() {
    const redirectMessage = useLoaderData()
    const actionData = useActionData()
    const error = actionData?.error
    const navigation = useNavigation()
    const status = navigation.state

    return (
        <div className="login-container">
            {redirectMessage &&
                <h3>{redirectMessage}</h3>
            }
            <h1>Sign in to your account</h1>
            {error &&
                <h3>{error.message}</h3>
            }
            <Form className="login-form" method="post" replace>
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button disabled={status === "submitting"}>
                    {status === "submitting" ? "logging in..." : "log in "}
                </button>
            </Form>
            {/* {status === "success" && userName &&
				<h1>welcome back {userName} , you've loged in congrats!</h1>
			 */}
        </div>
    )

}

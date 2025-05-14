import { Login } from "../components/login"
import { Link } from "react-router-dom"

export const LoginPage = () => {

    return (
        <>
            <h3>Login</h3>
            <Login />
            <p className="small">Need an account? <Link to={'/register'}>Register</Link></p>

        </>
    )
}
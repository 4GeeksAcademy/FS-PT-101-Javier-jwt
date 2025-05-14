import { Register } from "../components/register"
import { Link } from "react-router-dom"
export const RegisterPage = () => {

    return (
        <>
            <h3>Register</h3>
            <Register />
            <p className="small">Already have an account? <Link to={'/login'}>Login</Link></p>
        </>
    )
}
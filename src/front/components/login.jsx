import { useState } from "react"
import userServices from "../services/userServices"

export const Login = () => {


    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        //aqui disparamos servicio para registrar/logear
        userServices.login(formData).then(data=> {
            //almacenamos en el localStorage el token de incio de sesion
            localStorage.setItem('token', data.token)
        })
    }

    return (
        <form onSubmit={handleSubmit}>

            <input type="email" placeholder="email" value={formData.email} name="email" onChange={handleChange} />
            <input type="password" placeholder="password" value={formData.password} name="password" onChange={handleChange} />
            <input type="submit" />

        </form>
    )

}

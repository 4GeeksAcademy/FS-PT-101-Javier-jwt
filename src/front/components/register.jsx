import { useState } from "react"
import userServices from "../services/userServices"

export const Register = () => {


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
        userServices.register(formData)
    }

    return (
        <form onSubmit={handleSubmit}>

            <input type="email" placeholder="email" value={FormData.email} name="email" onChange={handleChange} />
            <input type="password" placeholder="password" value={FormData.password} name="password" onChange={handleChange} />
            <input type="submit" />

        </form>
    )

}

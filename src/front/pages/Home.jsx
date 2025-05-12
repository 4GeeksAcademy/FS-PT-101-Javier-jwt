import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Register } from "../components/register.jsx";
import { Login } from "../components/login.jsx";
import { Private } from "../components/private.jsx";
import userServices from "../services/userServices.js";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

const handleClick = () => {
	userServices.getUserInfo().then(data=> dispatch({type: 'getUserInfo', payload: data.user}))
}

	return (
		<div className="text-center mt-5">
			<h2>1. Register</h2>
			<Register />
			<h2>2. Login</h2>
			<Login/>

			<h2>Aqui aparecera el privado!</h2>
			<button onClick={handleClick}>get user info</button>
			{store.user && <Private/>}
		</div>
	);
}; 
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";


//what visitors will see when they open the website
export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<Navbar />
			<h1>Hello Rigo!!</h1>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				start creating
			</p>
			<button onClick={() => { window.location.href = '/login'; }}>Login</button>
			<button onClick={() => { window.location.href = '/register'; }}>Register</button>
		</div>
	);
};

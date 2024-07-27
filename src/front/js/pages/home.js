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
		<div className = "homepageContainer" >
			<Navbar />
			<h2>god plays the artist</h2>
			<div className="alert alert-info">
				{store.message || "In the beginning..."}
			</div>
			<p>
				Create
			</p>
			<button onClick={() => { window.location.href = '/login'; }}>Login</button>
			<button onClick={() => { window.location.href = '/register'; }}>Register</button>
		</div>
	);
};

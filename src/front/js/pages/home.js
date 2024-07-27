import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import { randomParagraph } from "../component/randomParagraph";


//what visitors will see when they open the website
export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className = "homepageContainer" >
			<Navbar />
			<h1>
				{store.message || "In the beginning..." || {randomParagraph}}
			</h1>
			<p className="createSubtitle">
				Create
			</p>
			<button onClick={() => { window.location.href = '/login'; }}>Login</button>
			<button onClick={() => { window.location.href = '/register'; }}>Register</button>
		</div>
	);
};

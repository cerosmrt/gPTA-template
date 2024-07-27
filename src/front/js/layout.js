import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import injectContext from "./store/appContext";

import { Home } from "./pages/home";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { Forgot } from "./pages/forgot";
import { Editor } from "./pages/editor";
import { Artist } from "./pages/artist";
import { Letters} from "./pages/letters";
import { Voider } from "./pages/voider";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    {/* <Navbar /> */}
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Register />} path="/register" />                        
                        <Route element={<Login />} path="/login" />                        
                        <Route element={<Forgot />} path="/forgot" />                        
                        <Route element={<Editor />} path="/editor" />                        
                        <Route element={<Artist />} path="/artist" />                        
                        <Route element={<Letters />} path="/letters" />
                        <Route element={<Voider />} path="/voider" />                        
                    </Routes>
                    {/* <Footer /> */}
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);

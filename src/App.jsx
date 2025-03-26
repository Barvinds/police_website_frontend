import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./components/Login";
import "./App.css";
import PreLoader from "./components/Preloader";
import TranslateWidget from "./components/TranslateWidget";
import Scan from "./pages/Scan";
import DocumentGenerator from "./pages/Document";
import List from "./pages/List";


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // New state for preloader

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false); // Simulating preloader delay
        }, 2000); // Adjust time as needed

        const authState = localStorage.getItem("isAuthenticated");
        if (authState === "true") {
            setIsAuthenticated(false);
            setShowPopup(true);
        }
    }, []);

    const handleLogin = (username, password) => {
        if (username === "admin" && password === "1234") {
            setIsAuthenticated(true);
            localStorage.setItem("isAuthenticated", "true");
            setShowPopup(true);
        } else {
            alert("Invalid credentials");
        }
    };

    const handleAccept = () => {
        setShowPopup(false);
    };

    if (isLoading) {
        return <PreLoader />;
    }

    return (
        <Router>
            {!isAuthenticated ? (
                <Login onLogin={handleLogin} />
            ) : showPopup ? (
                <div className="popup">
                    <div className="popup-content">
                        <h2>PLEASE SELECT LANGUAGE</h2>
                        <TranslateWidget />
                        <p>POLICE</p>
                        <button onClick={handleAccept}>Submit</button>
                    </div>
                </div>
            ) : (
                <div>
                    <Nav />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/document" element={<DocumentGenerator />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/scan" element={<Scan />} />
                            <Route path="/list" element={<List />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </main>
                </div>
            )}
        </Router>
    );
};

export default App;

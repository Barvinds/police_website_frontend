import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import About from './pages/About';
import Login from './components/Login';
import './App.css';
import PreLoader from './components/Preloader';
import TranslateWidget from './components/TranslateWidget';
import Scan from './pages/Scan';
import DocumentGenerator from './pages/Document';
import List from './pages/List';

const App = () => {
    const [showPopup, setShowPopup] = useState(true);
    const [showLogin, setShowLogin] = useState(false);

    const handleAccept = () => {
        setShowPopup(false);
    };

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    return (
        <>
            <PreLoader />
            <Router>
                <div>
                    <Nav onLoginClick={handleLoginClick} />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/document" element={<DocumentGenerator />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/scan" element={<Scan />} />
                            <Route path="/list" element={<List />} />

                            
                        </Routes>
                    </main>
                </div>
            </Router>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>TAMIL NADU</h2>
                        <TranslateWidget />
                        <p>POLICE</p>
                        <button onClick={handleAccept}>Accept</button>
                    </div>
                </div>
            )}
            {showLogin && <Login onClose={handleCloseLogin} />}
        </>
    );
}

export default App;

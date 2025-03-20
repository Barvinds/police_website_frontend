import React, { useState } from 'react';
import './Nav.css';
import { Link, useLocation } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { LuScanFace } from "react-icons/lu";
import { TbInfoHexagonFilled } from "react-icons/tb";
import { BsPersonCircle } from "react-icons/bs";
import { FaSearchLocation } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";


const Nav = ({ onLoginClick }) => {
    const location = useLocation();

    return (
        <nav className="nav containers fixed-top">
            <Link to="/" className="nav__logo">POLICE</Link>

            <div className="nav__menu" id="nav-menu">
                <ul className="nav__list">
                    <li className="nav__item">
                        <Link to="/" className={`nav__link ${location.pathname === '/' ? 'active-link' : ''}`}>
                            <AiFillHome />
                            <span className="nav__name">Home</span>
                        </Link>
                    </li>

                    <li className="nav__item">
                        <Link to="/scan" className={`nav__link ${location.pathname === '/scan' ? 'active-link' : ''}`}>
                            <LuScanFace />
                            <span className="nav__name">Scan</span>
                        </Link>
                    </li>

                    <li className="nav__item">
                        <Link to="/document" className={`nav__link ${location.pathname === '/document' ? 'active-link' : ''}`}>
                            <IoDocumentText />
                            <span className="nav__name">Document</span>
                        </Link>
                    </li>
                    
                    <li className="nav__item">
                        <Link to="/list" className={`nav__link ${location.pathname === '/list' ? 'active-link' : ''}`}>
                            <FaSearchLocation />
                            <span className="nav__name">List</span>
                        </Link>
                    </li>

                    <li className="nav__item">
                        <Link to="/about" className={`nav__link ${location.pathname === '/about' ? 'active-link' : ''}`}>
                            <TbInfoHexagonFilled />
                            <span className="nav__name">About</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="nav__img-container" onClick={onLoginClick}>
            <BsPersonCircle size={35}/>
            </div>
        </nav>
    );
}

export default Nav;

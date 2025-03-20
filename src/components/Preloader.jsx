import React, { useEffect } from "react";
import { preLoaderAnim } from "../animations";
import './Preloader.css';

const PreLoader = () => {
  useEffect(() => {
    preLoaderAnim();
  }, []);
  return (
    <div className="preloader">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/TamilNadu_Logo.svg/1200px-TamilNadu_Logo.svg.png" width="150px" height="150px" />
    </div>
  );
};

export default PreLoader;
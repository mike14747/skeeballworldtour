import React from 'react';
import { Link } from 'react-router-dom';
import './css/header.css';
import skeeballLogo from './images/skeeball_logo.png';

function Header() {
    return (
        <div className="header-bg row mb-0">
            <div className="col-2 p-2 my-auto text-left">
                <Link to="/"><img className="img-fluid" src={skeeballLogo} alt="Skeeball World Tour" /></Link>
            </div>
        </div>
    );
}

export default Header;

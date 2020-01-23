import React from 'react';
import { Link } from 'react-router-dom';
import './css/header.css';
import skeeballLogo from './images/skeeball_logo.png';
import SearchBar from '../searchbar/searchbar';

function Header() {
    return (
        <div className="header-bg row mb-0">
            <div className="col-logo p-2 my-auto text-left">
                <Link to="/"><img className="img-fluid" src={skeeballLogo} alt="Skeeball World Tour" /></Link>
            </div>
            <div className="col-8 d-flex justify-content-center align-items-end mb-1">
                <SearchBar />
            </div>
        </div>
    );
}

export default Header;

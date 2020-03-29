import React from 'react';
import { Link } from 'react-router-dom';
import './css/header.css';
import skeeballLogo from './images/skeeball_logo.png';
import SearchBar from './subcomponents/searchbar/searchbar';
import HeaderNav from './subcomponents/headerNav/headerNav';
import JoinFun from './subcomponents/joinFun/joinFun';

function Header() {
    return (
        <div className="header-bg row mb-0">
            <div className="col-3 p-2 my-auto text-left">
                <Link to="/"><img className="img-fluid" src={skeeballLogo} alt="Skeeball World Tour" /></Link>
            </div>
            <div className="col-6 d-flex flex-column justify-content-center align-items-center mb-2 p-0">
                <JoinFun />
                <SearchBar />
            </div>
            <div className="col-3 p-2 my-auto text-right">
                <HeaderNav />
            </div>
        </div>
    );
}

export default Header;

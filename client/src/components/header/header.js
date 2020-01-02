import React from 'react';
import { Link } from 'react-router-dom';
import './css/header.css';
import skeeballLogo from './images/skeeball_logo.png';
import winkingLizardLogo from './images/winking_lizard_logo.png';
import bellMusicLogo from './images/bell_music_logo.png';
const today = new Date();
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function Header() {
    return (
        <div className="header-bg row mb-3">
            <div className="col-4 p-2 my-auto text-left">
                <Link to="/"><img className="img-fluid" src={skeeballLogo} alt="Skeeball World Tour" /></Link>
            </div>
            <div className="col-4 p-2 my-auto text-center">
                <p>Brought to you by:</p>
                <img className="mx-2 img-fluid" src={winkingLizardLogo} alt="Winking Lizard" width="70" height="60" />
                <img className="mx-2 img-fluid" src={bellMusicLogo} alt="Bell Music" width="150" height="56" />
            </div>
            <div className="col-4 p-2 mb-auto">
                <p className="text-right font-weight-bolder">{months[today.getMonth()]} {today.getDate()}, {today.getFullYear()}</p>
            </div>
        </div>
    );
}

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import moment from "moment";
const today = moment().format("dddd, MMMM DD, YYYY");

function Header() {
    return (
        <div className="row mb-3" style={{ backgroundImage: "url('./images/head_bg_new.jpg')", backgroundSize: "cover" }}>
            <div className="col-4 p-2 my-auto text-left">
                <Link to="/"><img className="img-fluid" src="./images/skeeball_logo.png" alt="Skeeball World Tour" /></Link>
            </div>
            <div className="col-4 p-2 my-auto text-center">
                <p>Brought to you by:</p>
                <img className="mx-2 img-fluid" src="./images/winking_lizard_logo.png" alt="Winking Lizard" width="70" height="60" /><img className="mx-2 img-fluid" src="./images/bell_music_logo.png" alt="Bell Music" width="150" height="56" />
            </div>
            <div className="col-4 p-2 mb-auto">
                <p className="text-right font-weight-bolder">{today}</p>
            </div>
        </div>
    )
}

export default Header;
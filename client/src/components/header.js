import React from 'react';
import moment from "moment";
const today = moment().format("dddd, MMMM DD, YYYY");

function Header() {
    return (
        <div className="row mb-3" style={{ backgroundImage: "url('./images/head_bg_new.jpg')", backgroundSize: "cover" }}>
            <div className="col-4 p-2 text-left">
                <img className="img-fluid" src="./images/skeeball_logo.png" alt="Skeeball World Tour" />
            </div>
            <div className="col-8 p-2 text-left">
                <p>Brought to you by:</p>
                <img src="./images/winking_lizard_logo.png" alt="Winking Lizard" width="70" height="60" /><img className="ml-2" src="./images/bell_music_logo.png" alt="Bell Music" width="150" height="56" />
                <p className="text-right font-weight-bolder">{today}</p>
            </div>
        </div>
    )
}

export default Header;
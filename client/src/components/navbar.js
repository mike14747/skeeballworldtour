import React, { Component } from "react";
// import { Link } from "react-router-dom";
import './css/navbar.css';

class NavBar extends Component {
    state = {

    };

    render() {
        return (
            <div className="row">
                <div className="col-sm-12 justify-content-center text-center">
                    <nav className="navbar navbar-expand-sm justify-content-center">
                        <ul className="navbar-nav">
                            <li className="nav-item mr-2 mb-1">
                                <a className="nav-link a-custom2" href="/standings">Standings</a>
                            </li>
                            <li className="nav-item dropdown mr-2 mb-1">
                                <a className="nav-link dropdown-toggle a-custom2" href="#" id="navbardrop" data-toggle="dropdown">Results</a>
                                <div className="dropdown-menu pt-0 pb-0">

                                </div>
                            </li>
                            <li className="nav-item dropdown navbar-custom mr-2 mb-1">
                                <a className="nav-link dropdown-toggle a-custom2" href="#" id="navbardrop" data-toggle="dropdown">Schedule</a>
                                <div className="dropdown-menu">
                                </div>
                            </li>
                            <li className="nav-item dropdown navbar-custom mr-2 mb-1">
                                <a className="nav-link dropdown-toggle a-custom2" href="#" id="navbardrop" data-toggle="dropdown">Stores</a>
                                <div className="dropdown-menu pt-0 pb-0">
                                </div>
                            </li>
                            <li className="nav-item mr-2 mb-1">
                                <a className="nav-link a-custom2" href="/rules">Rules</a>
                            </li>
                            <li className="nav-item mr-2 mb-1">
                                <a className="nav-link a-custom2" href="/champions">Champions</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link a-custom2 mr-2" href="mailto:sal@automaticmusic.com">Contact</a>
                            </li>
                        </ul >
                    </nav >
                </div >
            </div >
        )
    }
}

export default NavBar;
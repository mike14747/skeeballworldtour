import React from 'react';
import './css/headerNav.css';

const HeaderNav = () => {
    return (
        // <div className="h-nav">
        //     <label htmlFor="toggle">&#9776;</label>
        //     <input type="checkbox" id="toggle" />
        //     <div className="menu">
        //         <a href="/champions">Champions</a>
        //         <a href="/rules">Rules</a>
        //         <a href="/leaders">Leaders</a>
        //         <a href="/all-time">All-Time Records</a>
        //     </div>
        // </div>
        <div className="h-nav ml-2">
            <button className="h-nav-btn">&#9776;</button>
            <ul className="h-nav-content">
                <a href="/champions"><li className="current">Champions</li></a>
                <a href="/rules"><li className="current">Rules</li></a>
                <a href="/leaders"><li className="current">Leaders</li></a>
                <a href="/all-time"><li className="current">All-Time Records</li></a>
            </ul>
        </div>
    );
};

export default HeaderNav;

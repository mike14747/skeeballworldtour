import React from 'react';
import { Link } from 'react-router-dom';
import UserBar from './subcomponents/userBar/userBar';

const Header = () => {
    return (
        <div className="row border-bottom mb-4">
            <div className="col-6">
                Skeeball World Tour Admin Area
                <nav>
                    <ul>
                        <li><Link to='/'>Admin Central</Link></li>
                        <li><Link to='/unprotected'>Unprotected Page</Link></li>
                        <li><Link to='login'>Login</Link></li>
                        <li><Link to='blah'>Bad Route</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="col-6 text-right">
                <UserBar />
            </div>
        </div>
    );
};

export default Header;

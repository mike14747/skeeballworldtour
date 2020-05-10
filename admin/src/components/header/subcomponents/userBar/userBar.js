import React, { useState, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../../../context/userContext';
import axios from 'axios';

const UserBar = () => {
    const [user, setUser] = useContext(UserContext);
    const [error, setError] = useState(null);

    function handleLogout(event) {
        event.preventDefault();
        axios.get('/api/auth/logout')
            .then(() => {
                setUser(null);
            })
            .catch(error => {
                console.log(error);
                setError('An error occurred trying to log out the user!');
            });
    }

    return (
        <Fragment>
            {user
                ? (<Fragment>
                    <div className="mb-4">
                        Logged in as: {user.username}
                    </div>
                    <div>
                        <form onSubmit={handleLogout}>
                            <button>Log Out</button>
                        </form></div>
                </Fragment>)
                : <Link to='/login'>Log In</Link>
            }
            {error &&
                <div className="text-danger font-weight-bolder">
                    {error}
                </div>
            }
        </Fragment>
    );
};

export default UserBar;

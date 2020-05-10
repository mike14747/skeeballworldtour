import React, { useState, useContext, Fragment } from 'react';
import UserContext from '../../context/userContext';
import axios from 'axios';

const AdminCentral = () => {
    const [error, setError] = useState(null);
    const [user, setUser] = useContext(UserContext);

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
            <h1>This is the Admin Central Page</h1>
            {user && user.username &&
                <div className="text-success">
                    {user.username}
                </div>
            }
            <form onSubmit={handleLogout}>
                <button>Log Out</button>
            </form>
            {error &&
                <div className="text-danger font-weight-bolder">
                    {error}
                </div>
            }
        </Fragment>
    );
};

export default AdminCentral;

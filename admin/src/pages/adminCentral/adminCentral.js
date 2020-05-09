import React, { useState, useContext, Fragment } from 'react';
import UserContext from '../../context/userContext';
import axios from 'axios';

const AdminCentral = () => {
    const [error, setError] = useState(null);
    const [user, setUser] = useContext(UserContext);
    console.log(user);

    function handleLogout(event) {
        event.preventDefault();
        axios.get('/api/auth/logout')
            .then(() => {
                setUser(null);
                setError('The user has been logged out!');
            })
            .catch(error => {
                console.log(error);
                setError('An error occurred trying to log out the user!');
            });
    }
    return (
        <Fragment>
            <h1>This is the Admin Central Page</h1>
            {user &&
                <form onSubmit={handleLogout}>
                    <button>Log Out</button>
                </form>
            }
            {error &&
                <div className="text-danger font-weight-bolder">
                    {error}
                </div>
            }
            {user && user.username &&
                <div className="text-success">
                    {user.username}
                </div>
            }
        </Fragment>
    );
};

export default AdminCentral;

import React, { useEffect, useContext, Fragment } from 'react';
import UserContext from '../../context/userContext';
import axios from 'axios';

const UserStatus = () => {
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        axios.get('/api/auth/status')
            .then(response => {
                if (response.status === 200) {
                    setUser(response.data.user);
                } else {
                    setUser(null);
                }
            })
            .catch(error => console.log(error));
    }, [setUser]);

    return (
        <Fragment>
            {user && user.username
                ? <Fragment>{user.username}</Fragment>
                : <Fragment>User is not logged in</Fragment>
            }
        </Fragment>
    );
};

export default UserStatus;

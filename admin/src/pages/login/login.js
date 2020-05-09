import React, { useState } from 'react';
import axios from 'axios';
import UserContext from '../../context/userContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [user, setUser] = useState(UserContext);

    function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        if (username.match(/^[a-zA-Z][a-zA-Z0-9-_]{3,10}[a-zA-Z0-9]$/) && password.match(/^[a-zA-Z0-9-_]{6,12}$/)) {
            axios.post('/api/auth/login', {
                username: username,
                password: password,
            })
                .then(response => {
                    setUser({
                        id: response.data.user.user_id,
                        username: response.data.user.username,
                    });
                })
                .catch(error => {
                    console.log(error);
                    setError('An error occurred trying to log in the user!');
                });
        } else {
            setError('Username and Password must be in the proper format!');
        }
    }

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
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" value={username} name="username" onChange={event => setUsername(event.target.value)} />
                <label>Password</label>
                <input type="password" value={password} name="password" onChange={event => setPassword(event.target.value)} />
                <button>Submit</button>
            </form>
            <form onSubmit={handleLogout}>
                <button>Log Out</button>
            </form>
            {error &&
                <div className="text-danger font-weight-bolder">
                    {error}
                </div>
            }
            {user &&
                <div className="text-success font-weight-bolder">
                    {user.username}
                </div>
            }
        </div>
    );
};

export default Login;

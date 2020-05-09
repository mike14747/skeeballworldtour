import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../../context/userContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [user, setUser] = useContext(UserContext);

    function handleSubmit(event) {
        event.preventDefault();
        setMessage(null);
        if (username.match(/^[a-zA-Z][a-zA-Z0-9-_]{3,10}[a-zA-Z0-9]$/) && password.match(/^[a-zA-Z0-9-_]{6,12}$/)) {
            axios.post('/api/auth/login', {
                username: username,
                password: password,
            })
                .then(response => {
                    if (response.status === 200) {
                        setUser({
                            id: response.data.user.id,
                            username: response.data.user.username,
                        });
                    } else {
                        setUser(null);
                        setMessage(response.data.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                    setMessage('An error occurred trying to log in the user!');
                });
        } else {
            setMessage('Username and Password must be in the proper format!');
        }
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
            {message &&
                <div className="text-danger font-weight-bolder">
                    {message}
                </div>
            }
            {user && user.username &&
                <div className="text-success">
                    {user.username}
                </div>
            }
        </div>
    );
};

export default Login;
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

const Login = ({ user, setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        if (username.match(/^[a-zA-Z][a-zA-Z0-9-_]{4,10}[a-zA-Z0-9]$/) && password.match(/^[a-zA-Z0-9-_]{6,12}$/)) {
            console.log(username, password);
        } else {
            alert('Username and Password must be in the proper format!');
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
        </div>
    );
};

Login.propTypes = {
    user: PropTypes.object,
    setUser: PropTypes.func,
};

export default Login;

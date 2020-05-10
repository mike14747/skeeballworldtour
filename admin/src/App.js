import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AdminCentral from './pages/adminCentral/adminCentral';
import Login from './pages/login/login';
import './css/my_style.css';
import UserContext from './context/userContext';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import axios from 'axios';

function App() {
    const [user, setUser] = useState(null);

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
        <Router>
            <nav>
                <ul>
                    <li><Link to='/'>Admin Central</Link></li>
                </ul>
            </nav>
            <UserContext.Provider value={[user, setUser]}>
                <Switch>
                    <ProtectedRoute exact path="/" component={AdminCentral} user={user} />
                    <Route path='/login' component={Login} />
                    <Route component={NotFound} />
                </Switch>
            </UserContext.Provider>
        </Router >
    );
}

function NotFound() {
    return (
        <div>
            <h1>Page not found!</h1>
        </div>
    );
}

export default App;

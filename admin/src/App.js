import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import AdminCentral from './pages/adminCentral/adminCentral';
import Login from './pages/login/login';
import './css/my_style.css';
import UserContext from './context/userContext';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import NoMatch from './pages/noMatch/noMatch';
import axios from 'axios';

function App() {
    const [user, setUser] = useState(null);
    console.log('App.js: ', user);

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
                    <li><Link to='/unprotected'>Unprotected Page</Link></li>
                    <li><Link to='login'>Login</Link></li>
                    <li><Link to='blah'>Bad Route</Link></li>
                </ul>
            </nav>
            <UserContext.Provider value={[user, setUser]}>
                <Switch>
                    <ProtectedRoute exact path="/" component={AdminCentral} user={user} />
                    <Route exact path="/login">
                        {user ? <Redirect to="/" /> : <Login />}
                    </Route>
                    {/* <Route exact path="/login" component={Login} /> */}
                    <Route exact path="/unprotected" component={UnprotectedPage} />
                    <Route component={NoMatch} />
                </Switch>
            </UserContext.Provider>
        </Router >
    );
}

function UnprotectedPage() {
    return (
        <div>
            <h1>Unprotected Page</h1>
        </div>
    );
}

export default App;

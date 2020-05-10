import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AdminCentral from './pages/adminCentral/adminCentral';
import Login from './pages/login/login';
import './css/my_style.css';
import UserContext from './context/userContext';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import UserStatus from './components/userStatus/userStatus';

function App() {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to='/'>Admin Central</Link></li>
                </ul>
            </nav>
            <UserContext.Provider value={[user, setUser]}>
                <UserStatus />
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

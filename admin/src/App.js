import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AdminCentral from './pages/adminCentral/adminCentral';
import Login from './pages/login/login';
import './css/my_style.css';
import UserContext from './context/userContext';

function App() {
    const [user, setUser] = useState(null);
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to='/'>Admin Central</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                </ul>
            </nav>
            <UserContext.Provider value={[user, setUser]}>
                <Switch>
                    <Route exact path="/" component={AdminCentral} />
                    <Route path='/login' component={Login} />
                </Switch>
            </UserContext.Provider>
        </Router >
    );
}

export default App;

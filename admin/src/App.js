import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminCentral from './pages/adminCentral/adminCentral';
import Login from './pages/login/login';
import './css/my_style.css';
import UserContext from './context/userContext';

function App() {
    const [user, setUser] = useState({
        id: null,
        username: null,
    });
    return (
        <UserContext.Provider value={[user, setUser]}>
            <Router>
                <Switch>
                    <Route exact path="/" component={AdminCentral} />
                    <Route path='/login' component={Login} />
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}

export default App;

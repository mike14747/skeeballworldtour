import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AdminCentral from './pages/adminCentral/adminCentral';
import Login from './pages/login/login';
import './css/my_style.css';
import './css/style.css';
import UserContext from './context/userContext';
import ProtectedRoute from './utils/protectedRoute';
import NoMatch from './pages/noMatch/noMatch';
import axios from 'axios';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import AddStore from './pages/stores/addStore/addStore';
import EditStore from './pages/stores/editStore/editStore';

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
    }, []);

    // console.log('App.js re-render: ', user);

    return (
        <Router>
            <div className="container border bg-white">
                <UserContext.Provider value={[user, setUser]}>
                    <Header />
                    <Switch>
                        <ProtectedRoute exact path="/" component={AdminCentral} user={user} />
                        <ProtectedRoute exact path='/add-store' component={AddStore} user={user} />
                        <ProtectedRoute exact path='/edit-store' component={EditStore} user={user} />
                        <Route exact path="/login">
                            {user ? <Redirect to="/" /> : <Login />}
                        </Route>
                        <Route exact path="/unprotected" component={UnprotectedPage} />
                        <Route component={NoMatch} />
                    </Switch>
                    <Footer />
                </UserContext.Provider>
            </div>
        </Router >
    );
}

function UnprotectedPage() {
    return (
        <h1 className="text-center">Unprotected Page</h1>
    );
}

export default App;

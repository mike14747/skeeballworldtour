import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './pages/home';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/test" component={Home} />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
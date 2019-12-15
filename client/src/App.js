import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Rules from './pages/rules';
import Standings from './pages/standings';
import Search from './pages/search';
import Teams from './pages/teams';
import Header from './components/header';
import NavBar from './components/navbar';
import SearchBar from './components/searchbar';
import Footer from './components/footer';

export default function App() {
    return (
        <Router>
            <div className="container border bg-white">
                <Header />
                <NavBar />
                <SearchBar />
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route exact path="/rules" component={Rules} />
                    <Route path="/standings/:seasonid?" component={Standings} />
                    <Route path="/teams/:teamid/:seasonid?" component={Teams} />
                    <Route path="/search/:searchstring" component={Search} />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

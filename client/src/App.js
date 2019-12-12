import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Rules from './pages/rules';
import Standings from './pages/standings';
import Search from './pages/search';
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
                    <Route exact path="/rules"><Rules /></Route>
                    <Route exact path="/standings"><Standings /></Route>
                    <Route exact path="/search"><Search /></Route>
                </Switch>
                <Footer />
            </div>
        </Router >
    );
}

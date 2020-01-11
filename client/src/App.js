import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home/home';
import Rules from './pages/rules/rules';
import Standings from './pages/standings/standings';
import Search from './pages/search/search';
import Champions from './pages/champions/champions';
import Teams from './pages/teams/teams';
import Results from './pages/results/results';
import Header from './components/header/header';
import NavBar from './components/navbar/navbar';
import SearchBar from './components/searchbar/searchbar';
import Footer from './components/footer/footer';
import CurrentSeasonContext from './components/currentSeasonContext';
import axios from 'axios';
import './css/style.css';
import './css/my_style.css';

export default function App() {
    const [currentSeasonId, setCurrentSeasonId] = useState(0);
    useEffect(() => {
        axios.get('/api/settings/current-season')
            .then((response) => {
                setCurrentSeasonId(response.data[0].current_season_id);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <Router>
            <div className="container border bg-white">
                <Header />
                <NavBar />
                <SearchBar />
                <Switch>
                    <CurrentSeasonContext.Provider value={currentSeasonId}>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/rules" component={Rules} />
                        <Route path="/standings/:seasonid?" component={Standings} />
                        <Route path="/teams/:teamid/:seasonid?" component={Teams} />
                        <Route path="/results/:storeid/:divisionid/:seasonid?" component={Results} />
                        <Route path="/champions" component={Champions} />
                        <Route path="/search/:searchstring" component={Search} />
                    </CurrentSeasonContext.Provider>
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

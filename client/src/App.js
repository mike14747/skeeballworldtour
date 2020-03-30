import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home/home';
import Rules from './pages/rules/rules';
import Standings from './pages/standings/standings';
import Search from './pages/search/search';
import Champions from './pages/champions/champions';
import Players from './pages/players/players';
import Teams from './pages/teams/teams';
import Results from './pages/results/results';
import Schedule from './pages/schedule/schedule';
import AllTime from './pages/allTime/allTime';
import Leaders from './pages/leaders/leaders';
import Qualifiers from './pages/qualifiers/qualifiers';
import NoMatch from './pages/noMatch/noMatch';
import Header from './components/header/header';
import NavBar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import CurrentSeasonContext from './context/currentSeasonContext';
import SettingsContext from './context/settingsContext';
import axios from 'axios';
import './css/style.css';
import './css/my_style.css';

export default function App() {
    const [currentSeasonId, setCurrentSeasonId] = useState(null);
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        axios.get('/api/settings/current-season')
            .then((response) => {
                setCurrentSeasonId(response.data[0].current_season_id);
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get('/api/settings')
            .then((response) => {
                setSettings(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Router>
            <div className="container border bg-white">
                <SettingsContext.Provider value={settings}>
                    <Header />
                    <CurrentSeasonContext.Provider value={currentSeasonId}><NavBar /></CurrentSeasonContext.Provider>
                    <Switch>
                        <Route exact path="/"><CurrentSeasonContext.Provider value={currentSeasonId}><Home /></CurrentSeasonContext.Provider></Route>
                        <Route exact path="/rules" component={Rules} />
                        <Route exact path="/standings"><CurrentSeasonContext.Provider value={currentSeasonId}><Standings /></CurrentSeasonContext.Provider></Route>
                        <Route exact path="/teams/:teamid"><CurrentSeasonContext.Provider value={currentSeasonId}><Teams /></CurrentSeasonContext.Provider></Route>
                        <Route exact path="/players/:playerid"><CurrentSeasonContext.Provider value={currentSeasonId}><Players /></CurrentSeasonContext.Provider></Route>
                        <Route exact path="/results/:storeid/:divisionid/:seasonid?"><CurrentSeasonContext.Provider value={currentSeasonId}><Results /></CurrentSeasonContext.Provider></Route>
                        <Route exact path="/schedule/:storeid/:divisionid/:seasonid?"><CurrentSeasonContext.Provider value={currentSeasonId}><Schedule /></CurrentSeasonContext.Provider></Route>
                        <Route exact path="/leaders"><CurrentSeasonContext.Provider value={currentSeasonId}><Leaders /></CurrentSeasonContext.Provider></Route>
                        <Route exact path="/all-time" component={AllTime} />
                        <Route exact path="/qualifiers"><CurrentSeasonContext.Provider value={currentSeasonId}><Qualifiers /></CurrentSeasonContext.Provider></Route>
                        <Route exact path="/champions" component={Champions} />
                        <Route path="/search/:searchstring" component={Search} />
                        <Route component={NoMatch} />
                    </Switch>
                    <Footer />
                </SettingsContext.Provider>
            </div>
        </Router>
    );
}

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
import SettingsContext from './context/settingsContext';
import axios from 'axios';
import './css/style.css';
import './css/my_style.css';

export default function App() {
    const [settings, setSettings] = useState({});

    useEffect(() => {
        axios.get('/api/settings')
            .then((response) => {
                response.data[0] ? setSettings(response.data[0]) : setSettings({});
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
                    <NavBar />
                    <Switch>
                        <Route exact path="/"><Home /></Route>
                        <Route exact path="/rules" component={Rules} />
                        <Route exact path="/standings" component={Standings} />
                        <Route exact path="/teams/:teamid" component={Teams} />
                        <Route exact path="/players/:playerid" component={Players} />
                        <Route exact path="/results/:storeid/:divisionid/:seasonid?" component={Results} />
                        <Route exact path="/schedule/:storeid/:divisionid/:seasonid?" component={Schedule} />
                        <Route exact path="/leaders" component={Leaders} />
                        <Route exact path="/all-time" component={AllTime} />
                        <Route exact path="/qualifiers" component={Qualifiers} />
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

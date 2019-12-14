import React, { useState } from 'react';
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
import SettingsContext from './components/settingsContext';
import axios from 'axios';

export default function App() {
    const [currentSeasonId, setCurrentSeasonId] = useState(0);
    const [displaySchedule, setDisplaySchedule] = useState(0);
    const [showRegButton, setShowRegButton] = useState(0);
    const [regButtonUrl, setRegButtonUrl] = useState(0);
    const [regButtonText, setRegButtonText] = useState(0);

    axios.get('/api/settings')
        .then((response) => {
            setCurrentSeasonId(response.data[0].current_season);
            setDisplaySchedule(response.data[0].display_schedule);
            setShowRegButton(response.data[0].show_reg_button);
            setRegButtonUrl(response.data[0].reg_button_url);
            setRegButtonText(response.data[0].reg_button_text);
        })
        .catch((err) => {
            console.log(err);
        });
    return (
        <Router>
            <div className="container border bg-white">
                <SettingsContext.Provider value={{
                    currentSeasonId: currentSeasonId,
                    displaySchedule: displaySchedule,
                    showRegButton: showRegButton,
                    setRegButtonUrl: setRegButtonUrl,
                    setRegButtonText: setRegButtonText,
                }}>
                    <Header />
                    <NavBar />
                    <SearchBar />
                    <Switch>
                        <Route exact path="/"><Home /></Route>
                        <Route exact path="/rules" component={Rules} />
                        <Route path="/standings/:id?" component={Standings} />
                        <Route path="/teams/:id?" component={Teams} />
                        <Route exact path="/search"><Search /></Route>
                    </Switch>
                    <Footer />
                </SettingsContext.Provider>
            </div>
        </Router>
    );
}

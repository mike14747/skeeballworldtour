import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Rules from './pages/rules';
import Standings from './pages/standings';
import Search from './pages/search';
import Team from './pages/team';
import Header from './components/header';
import NavBar from './components/navbar';
import SearchBar from './components/searchbar';
import Footer from './components/footer';
import SettingsContext from './components/settingsContext';
import axios from 'axios';

export default function App() {
    const [currentSeasonId, setCurrentSeasonId] = useState(0);

    axios.get('/api/settings')
        .then((response) => {
            setCurrentSeasonId(response.data[0].current_season);
        })
        .catch((err) => {
            console.log(err);
        });
    return (
        <Router>
            <div className="container border bg-white">
                <SettingsContext.Provider value={currentSeasonId}>
                    <Header />
                    <NavBar />
                    <SearchBar />
                    <Switch>
                        <Route exact path="/"><Home /></Route>
                        <Route exact path="/rules"><Rules /></Route>
                        <Route exact path="/standings"><Standings /></Route>
                        {/* <Route path="/standings/:id?" component={Standings} /> */}
                        <Route path="/team/:id" component={Team} />
                        <Route exact path="/search"><Search /></Route>
                    </Switch>
                    <Footer />
                </SettingsContext.Provider>
            </div>
        </Router>
    );
}

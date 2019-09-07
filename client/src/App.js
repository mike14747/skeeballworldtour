import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Rules from './pages/rules';
import Standings from './pages/standings';
import Search from './pages/search';
import Header from './components/header';
import NavBar from './components/navbar';
import SearchBar from './components/searchbar';
import Footer from './components/footer';
import api from './utils/api';

class App extends Component {
    state = {
        settings: {},
        isLoaded: false,
    };

    componentDidMount() {
        api.getSettings()
            .then(res => this.setState({ settings: res[0], isLoaded: true }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Router>
                <div className="container border bg-white">
                    <Header />
                    {this.state.isLoaded &&
                        <div>
                            <NavBar current_season={this.state.settings.current_season} display_schedule={this.state.settings.display_schedule} />
                            <SearchBar />
                            <Switch>
                                <Route exact path="/" render={() => <Home show_reg_button={this.state.settings.show_reg_button} reg_button_url={this.state.settings.reg_button_url} reg_button_text={this.state.settings.reg_button_text} text_box_heading={this.state.settings.text_box_heading} text_box_text={this.state.settings.text_box_text} />} />
                                <Route exact path="/rules" component={Rules} />
                                <Route exact path="/standings" render={() => <Standings current_season={this.state.settings.current_season} />} />
                                <Route exact path="/search" component={Search} />
                            </Switch>
                        </div>
                    }
                    <Footer />
                </div>
            </Router>
        )
    }
}

export default App;

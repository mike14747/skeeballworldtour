import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/home';
import Rules from './pages/rules';
import Standings from './pages/standings';
import Header from './components/header';
import Footer from './components/footer';
import api from './utils/api';

class App extends Component {
    state = {
        settings: {},
        isLoaded: false
    };

    componentDidMount() {
        api.getSettings()
            .then(res => this.setState({ settings: res[0], isLoaded: true }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Router>
                <div className="container border bg-white my-3">
                    <Header />
                    {this.state.isLoaded &&
                        <Switch>
                            <Route exact path="/" render={() => <Home show_reg_button={this.state.settings.show_reg_button} reg_button_url={this.state.settings.reg_button_url} reg_button_text={this.state.settings.reg_button_text} text_box_heading={this.state.settings.text_box_heading} text_box_text={this.state.settings.text_box_text} />} />
                            <Route exact path="/rules" component={Rules} />
                            <Route exact path="/standings" render={() => <Standings current_season={this.state.settings.current_season} />} />
                        </Switch>
                    }
                    <Footer />
                </div>
            </Router>
        )
    }
}

export default App;
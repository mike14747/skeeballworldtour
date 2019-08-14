import React, { Component } from "react";
import api from '../utils/api';

class Search extends Component {
    state = {
        playerArray: [],
        teamArray: []
    };

    componentDidMount() {
        api.getSearchResults(this.props.location.state)
            .then(res => this.setState({ playerArray: res.players, teamArray: res.teams}))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <h3>Search Results for {this.props.location.state}</h3>
            </div>
        )
    }
}

export default Search;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchCriteria: this.props.location.state,
            playerArray: [],
            teamArray: [],
        };
    }

    static propTypes = {
        location: PropTypes.shape({
            state: PropTypes.array.isRequired,
        }),
    }

    componentDidMount() {
        api.getSearchResults(this.state.searchCriteria)
            .then(res => this.setState({ playerArray: res.players, teamArray: res.teams }))
            .catch(err => console.log(err));
    }

    componentDidUpdate() {
        if (this.props.location.state !== this.state.searchCriteria) {
            this.setState({ searchCriteria: this.props.location.state }, () => {
                api.getSearchResults(this.state.searchCriteria)
                    .then(res => this.setState({ playerArray: res.players, teamArray: res.teams }))
                    .catch(err => console.log(err));
            });
        }
    }

    render() {
        return (
            <div>
                <h2 className="text-center border-bottom pb-3">Search Results</h2>
                <p className="text-center"><b>Search Results for:</b> {this.props.location.state}</p>
                <div className="row">
                    <div className="col-6">
                        <p className="text-success"><b>Player Matches:</b> {this.state.playerArray.length}</p>
                        {this.state.playerArray.map(player => (
                            <p key={player.player_id}><a href={'player/' + player.player_id}>{player.full_name}</a></p>
                        ))}
                    </div>
                    <div className="col-6">
                        <p className="text-success"><b>Team Matches:</b> {this.state.teamArray.length}</p>
                        {this.state.teamArray.map(team => (
                            <p key={team.team_id}><a href={'/team/' + team.team_id}>{team.team_name}</a></p>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
import { Link } from 'react-router-dom';

class Standings extends Component {
    state = {
        standingsArray: [],
        currentSeason: 0,
        selectedSeason: 0,
    };

    static propTypes = {
        current_season: PropTypes.number.isRequired,
    }

    groupStandingsArray(standings) {
        const standingsArray = [];
        let curStoreDivision = 0;
        let index = -1;
        standings.forEach(standing => {
            if (index === -1 || curStoreDivision !== standing.store_division) {
                standingsArray.push([]);
                index++;
                curStoreDivision = standing.store_division;
                console.log('Index: ' + index + ', Store_Division: ' + curStoreDivision);
            }
            standingsArray[index].push(standing);
        });
        this.setState({ standingsArray: standingsArray })
    }

    getStandingsById = (id) => {
        api.getStandingsById(id)
            .then(res => this.groupStandingsArray(res))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.setState({ currentSeason: this.props.current_season }, () => {
            this.getStandingsById(this.state.currentSeason);
        })
    }

    render() {
        return (
            <div>
                {this.state.standingsArray.map((storeDiv, i) => (
                    <table key={i} className="table table-bordered mb-5 text-center">
                        <thead>
                            <tr className="bg-light">
                                <th className="text-left">TEAM</th>
                                <th>W</th>
                                <th>L</th>
                                <th>T</th>
                                <th>TOTAL POINTS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.standingsArray[i].map((standing) => (
                                <tr key={standing.standings_id}>
                                    <td className="text-left"><Link to={'./teams/' + standing.team_id}>{standing.team_name}</Link></td>
                                    <td>{standing.wins}</td>
                                    <td>{standing.losses}</td>
                                    <td>{standing.ties}</td>
                                    <td>{standing.total_points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ))}
            </div >
        );
    }
}

export default Standings;

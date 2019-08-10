import React, { Component } from "react";
import api from '../utils/api';
import { Link } from 'react-router-dom';

class Standings extends Component {
    state = {
        standingsArray: [],
        currentSeason: 0,
        selectedSeason: 0,
        uniqueSD: ["121", "123", "143", "164", "173", "112", "114"]
    };

    getStandingsById = (id) => {
        api.getStandingsById(id)
            .then(res => this.setState({ standingsArray: res }))
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
                <table className="table table-bordered mb-5 table1 text-center">
                    <thead>
                        <tr className="bg-table-header">
                            <th className="text-left">TEAM</th>
                            <th>W</th>
                            <th>L</th>
                            <th>T</th>
                            <th>TOTAL POINTS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.standingsArray.map((standing) => (
                            <tr key={standing.standings_id}>
                                <td className="text-left"><Link to={"./teams/" + standing.team_id}>{standing.team_name}</Link></td>
                                <td>{standing.wins}</td>
                                <td>{standing.losses}</td>
                                <td>{standing.ties}</td>
                                <td>{standing.total_points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        )
    }
}

export default Standings;
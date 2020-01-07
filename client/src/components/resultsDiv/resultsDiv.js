import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './css/resultsDiv.css';

Results.propTypes = {
    results: PropTypes.array,
};

export default function Results(props) {
    const gamesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <Fragment>
            {props.results.map((result) => (
                <Fragment key={result.id}>
                    <h6 className="text-success font-weight-bolder">Week {result.week_id} ({result.date})</h6>
                    <div className="p-1 mb-4 border border-secondary">
                        <table className="table table-hover mb-1">
                            <thead>
                                <tr className="bg-ltgray">
                                    <th><a href="/teams/{result.away_team.team_id}">{result.away_team.team_name}</a> (<span className={'text-' + (result.away_team.wins > result.away_team.losses ? 'success' : (result.away_team.wins < result.away_team.losses ? 'danger' : 'primary'))}>{result.away_team.wins}-{result.away_team.losses}-{result.away_team.ties}</span>)</th>
                                    {gamesArray.map((game, i) => (
                                        <th key={i} className="text-center">{game}</th>
                                    ))}
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.away_team.players.map((player) => (
                                    <tr key={player.player_id}>
                                        <td><a href="/players/{player.player_id}">{player.name}</a></td>
                                        {player.scores.map((score, i) => (
                                            <td key={i}>{score}</td>
                                        ))}
                                        <td>{player.total_points}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="font-weight-bolder">
                                <tr className="bg-ltgray">
                                    <td>Total</td>
                                    {result.away_team.game_totals.map((total, i) => (
                                        <td key={i}>{total}</td>
                                    ))}
                                    <td>{result.away_team.team_total}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </Fragment>
            ))}
        </Fragment>
    );
}

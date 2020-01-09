import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './css/resultsDiv.css';
import ResultsThead from '../resultsThead/resultsThead';
import ResultsTbody from '../resultsTbody/resultsTbody';
import ResultsTfoot from '../resultsTfoot/resultsTfoot';

Results.propTypes = {
    results: PropTypes.array,
};

function formatResults(results) {
    const resultsArray = results.map((result, index) => {
        const tempObj = {};
        tempObj.id = index;
        tempObj.week_id = result.week_id;
        tempObj.date = result.week_date1;
        tempObj.away_team = {
            team_id: result.away_team_id,
            team_name: result.at,
            game_totals: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            game_results: [],
            team_total: 0,
            players: [],
        };
        tempObj.home_team = {
            team_id: result.home_team_id,
            team_name: result.ht,
            game_totals: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            game_results: [],
            team_total: 0,
            players: [],
        };
        for (let p = 1; p <= 3; p++) {
            const awayPlayerObj = {
                player_id: result['ap' + p + 'id'],
                name: result['ap' + p],
                scores: [],
                total_points: 0,
            };
            const homePlayerObj = {
                player_id: result['hp' + p + 'id'],
                name: result['hp' + p],
                scores: [],
                total_points: 0,
            };
            for (let g = 1; g <= 10; g++) {
                tempObj.away_team.game_totals[g - 1] += Number(result['ap' + p + 'g' + g]);
                tempObj.away_team.team_total += Number(result['ap' + p + 'g' + g]);
                tempObj.home_team.game_totals[g - 1] += Number(result['hp' + p + 'g' + g]);
                tempObj.home_team.team_total += Number(result['hp' + p + 'g' + g]);
                awayPlayerObj.total_points += Number(result['ap' + p + 'g' + g]);
                awayPlayerObj.scores.push(Number(result['ap' + p + 'g' + g]));
                homePlayerObj.total_points += Number(result['hp' + p + 'g' + g]);
                homePlayerObj.scores.push(Number(result['hp' + p + 'g' + g]));
            }
            tempObj.away_team.players.push(awayPlayerObj);
            tempObj.home_team.players.push(homePlayerObj);
        }
        for (let t = 0; t <= 9; t++) {
            if (tempObj.away_team.game_totals[t] > tempObj.home_team.game_totals[t]) {
                tempObj.away_team.game_results.push('w');
                tempObj.home_team.game_results.push('l');
            } else if (tempObj.away_team.game_totals[t] < tempObj.home_team.game_totals[t]) {
                tempObj.away_team.game_results.push('l');
                tempObj.home_team.game_results.push('w');
            } else {
                tempObj.away_team.game_results.push('t');
                tempObj.home_team.game_results.push('t');
            }
        }
        return tempObj;
    });
    return resultsArray;
}

export default function Results(props) {
    const [formattedResults, setFormattedResults] = useState([]);

    useEffect(() => {
        setFormattedResults(formatResults(props.results));
    }, []);

    return (
        <Fragment>
            {formattedResults.map((result) => (
                <Fragment key={result.id}>
                    <h6 className="text-success font-weight-bolder">Week {result.week_id} ({result.date})</h6>
                    <div className="p-1 mb-4 border border-secondary">
                        <table className="table table-hover mb-0">
                            <ResultsThead teamId={result.away_team.team_id} teamName={result.away_team.team_name} wins={result.away_team.wins} losses={result.away_team.losses} ties={result.away_team.ties} />
                            <ResultsTbody players={result.away_team.players} />
                            <ResultsTfoot gameTotals={result.away_team.game_totals} gameResults={result.away_team.game_results} teamTotal={result.away_team.team_total} />
                            {/* </table>
                        <table className="table table-hover mb-0"> */}
                            <tr className="no-border"><td className="no-border"></td></tr>
                            <ResultsThead teamId={result.home_team.team_id} teamName={result.home_team.team_name} wins={result.home_team.wins} losses={result.home_team.losses} ties={result.home_team.ties} />
                            <ResultsTbody players={result.home_team.players} />
                            <ResultsTfoot gameTotals={result.home_team.game_totals} gameResults={result.home_team.game_results} teamTotal={result.home_team.team_total} />
                        </table>
                    </div>
                </Fragment>
            ))}
        </Fragment>
    );
}

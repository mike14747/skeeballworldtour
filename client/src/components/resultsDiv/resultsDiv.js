import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './css/resultsDiv.css';
import ResultsThead from '../resultsThead/resultsThead';
import ResultsTbody from '../resultsTbody/resultsTbody';
import ResultsTfoot from '../resultsTfoot/resultsTfoot';

Results.propTypes = {
    results: PropTypes.array,
};

export default function Results(props) {
    return (
        <Fragment>
            {props.results.map((result) => (
                <Fragment key={result.id}>
                    <h6 className="text-success font-weight-bolder">Week {result.week_id} ({result.date})</h6>
                    <div className="p-1 mb-4 border border-secondary">
                        <table className="table table-hover mb-3">
                            <ResultsThead teamId={result.away_team.team_id} teamName={result.away_team.team_name} wins={result.away_team.wins} losses={result.away_team.losses} ties={result.away_team.ties} />
                            <ResultsTbody players={result.away_team.players} />
                            <ResultsTfoot gameTotals={result.away_team.game_totals} teamTotal={result.away_team.team_total} />
                        </table>
                        <table className="table table-hover mb-0">
                            <ResultsThead teamId={result.away_team.team_id} teamName={result.away_team.team_name} wins={result.away_team.wins} losses={result.away_team.losses} ties={result.away_team.ties} />
                            <ResultsTbody players={result.away_team.players} />
                            <ResultsTfoot gameTotals={result.away_team.game_totals} teamTotal={result.away_team.team_total} />
                        </table>
                    </div>
                </Fragment>
            ))}
        </Fragment>
    );
}

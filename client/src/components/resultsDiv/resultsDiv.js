import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ResultsThead from './subcomponents/resultsThead/resultsThead';
import ResultsTbody from './subcomponents/resultsTbody/resultsTbody';
import ResultsTfoot from './subcomponents/resultsTfoot/resultsTfoot';

const ResultsDiv = ({ results }) => {
    return (
        <Fragment>
            {results.map((result) => (
                <Fragment key={result.id}>
                    <h5 className="text-center text-success">Week {result.week_id} ({result.date})</h5>
                    <div className="p-1 mb-4 border border-secondary table-wrapper">
                        <table className="table table-bordered table-hover mb-1">
                            <ResultsThead teamId={result.away_team.team_id} teamName={result.away_team.team_name} wins={result.away_team.wins} losses={result.away_team.losses} ties={result.away_team.ties} />
                            <ResultsTbody players={result.away_team.players} />
                            <ResultsTfoot gameTotals={result.away_team.game_totals} gameResults={result.away_team.game_results} teamTotal={result.away_team.team_total} />
                            <tbody><tr><td colSpan="12" className="border-0"></td></tr></tbody>
                            <ResultsThead teamId={result.home_team.team_id} teamName={result.home_team.team_name} wins={result.home_team.wins} losses={result.home_team.losses} ties={result.home_team.ties} />
                            <ResultsTbody players={result.home_team.players} />
                            <ResultsTfoot gameTotals={result.home_team.game_totals} gameResults={result.home_team.game_results} teamTotal={result.home_team.team_total} />
                        </table>
                    </div>
                </Fragment>
            ))}
        </Fragment>
    );
};

ResultsDiv.propTypes = {
    results: PropTypes.array,
};

export default ResultsDiv;

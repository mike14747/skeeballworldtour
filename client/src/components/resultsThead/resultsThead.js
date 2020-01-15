import React from 'react';
import PropTypes from 'prop-types';

const ResultsThead = ({ teamId, teamName, wins, losses, ties }) => {
    const gamesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <tbody>
            <tr className="bg-gray6 font-weight-bolder">
                <td><a href={'/teams/' + teamId}>{teamName}</a> (<span className={'text-' + (wins > losses ? 'success' : (wins < losses ? 'danger' : 'primary'))}>{wins}-{losses}-{ties}</span>)</td>
                {gamesArray.map((game, i) => (
                    <td key={i} className="text-center">{game}</td>
                ))}
                <td className="text-center">Total</td>
            </tr>
        </tbody>
    );
};

ResultsThead.propTypes = {
    teamId: PropTypes.number,
    teamName: PropTypes.string,
    wins: PropTypes.number,
    losses: PropTypes.number,
    ties: PropTypes.number,
};

export default ResultsThead;

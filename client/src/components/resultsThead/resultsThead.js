import React from 'react';
import PropTypes from 'prop-types';

ResultsThead.propTypes = {
    teamId: PropTypes.number,
    teamName: PropTypes.string,
    wins: PropTypes.number,
    losses: PropTypes.number,
    ties: PropTypes.number,
};

export default function ResultsThead(props) {
    const gamesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <tbody>
            <tr className="bg-gray6 font-weight-bolder">
                <th><a href={'/teams/' + props.teamId}>{props.teamName}</a> (<span className={'text-' + (props.wins > props.losses ? 'success' : (props.wins < props.losses ? 'danger' : 'primary'))}>{props.wins}-{props.losses}-{props.ties}</span>)</th>
                {gamesArray.map((game, i) => (
                    <th key={i} className="text-center">{game}</th>
                ))}
                <th className="text-center">Total</th>
            </tr>
        </tbody>
    );
}

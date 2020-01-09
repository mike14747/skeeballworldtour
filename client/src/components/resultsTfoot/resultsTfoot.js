import React from 'react';
import PropTypes from 'prop-types';

ResultsTfoot.propTypes = {
    gameTotals: PropTypes.array,
    gameResults: PropTypes.array,
    teamTotal: PropTypes.number,
};

export default function ResultsTfoot(props) {
    return (
        <tr className="bg-ltgray font-weight-bolder">
            <td>Total</td>
            {props.gameTotals.map((total, i) => (
                <td key={i} className="text-center"><span className={'text-' + (props.gameResults[i] === 'w' ? 'success' : (props.gameResults[i] === 'l' ? 'danger' : 'primary'))}>{total}</span></td>
            ))}
            <td className="text-center">{props.teamTotal}</td>
        </tr>
    );
}

import React from 'react';
import PropTypes from 'prop-types';

const ResultsTfoot = ({ gameTotals, gameResults, teamTotal }) => {
    return (
        <tbody>
            <tr className="bg-gray6 font-weight-bolder">
                <td>Total</td>
                {gameTotals.map((total, i) => (
                    <td key={i} className="text-center"><span className={'text-' + (gameResults[i] === 'w' ? 'success' : (gameResults[i] === 'l' ? 'danger' : 'primary'))}>{total}</span></td>
                ))}
                <td className="text-center">{teamTotal}</td>
            </tr>
        </tbody>
    );
};

ResultsTfoot.propTypes = {
    gameTotals: PropTypes.array,
    gameResults: PropTypes.array,
    teamTotal: PropTypes.number,
};

export default ResultsTfoot;

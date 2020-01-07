import React from 'react';
import PropTypes from 'prop-types';

ResultsTfoot.propTypes = {
    gameTotals: PropTypes.array,
    teamTotal: PropTypes.number,
};

export default function ResultsTfoot(props) {
    return (
        <tfoot className="font-weight-bolder">
            <tr className="bg-ltgray">
                <td>Total</td>
                {props.gameTotals.map((total, i) => (
                    <td key={i}>{total}</td>
                ))}
                <td>{props.teamTotal}</td>
            </tr>
        </tfoot>
    );
}

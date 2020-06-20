import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const StandingsRow = ({ standingsRowData }) => {
    return (
        <Fragment>
            {standingsRowData.map((standing) => (
                <tr key={standing.standingsId}>
                    <td className="text-left"><a href={'/teams/' + standing.teamId}>{standing.teamName}</a></td>
                    <td>{standing.wins}</td>
                    <td>{standing.losses}</td>
                    <td>{standing.ties}</td>
                    <td>{standing.totalPoints}</td>
                </tr>
            ))}
        </Fragment>
    );
};

StandingsRow.propTypes = {
    standingsRowData: PropTypes.array,
};

export default StandingsRow;

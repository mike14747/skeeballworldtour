import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const LeadersTable = ({ heading, columnName, format, href, leadersObj }) => {
    return (
        <Fragment>
            <h5 className="text-center text-success mb-4">{heading}</h5>
            <table className="table table-bordered table-hover mb-5">
                <thead>
                    <tr className="bg-gray6">
                        <th className="text-center">Rank</th>
                        <th>Player</th>
                        <th className="text-center">{columnName}</th>
                    </tr>
                </thead>
                <tbody>
                    {leadersObj.leaders.map((leader) => (
                        <tr key={leader.key}>
                            <td className="text-center">{leader.rank}</td>
                            <td><a href={`${href}${leader.field_id}`}>{leader.field_name}</a> ({leader.store_city})</td>
                            <td className="text-center">
                                {format === 'decimal'
                                    ? Number(leader.data).toFixed(1)
                                    : Number(leader.data)
                                }
                            </td>
                        </tr>
                    ))}
                    {leadersObj.numAtTieValue > 1 &&
                        <tr>
                            <td></td>
                            <td className="text-right text-success">{leadersObj.numAtTieValue} tied at:</td>
                            <td className="text-center">{leadersObj.tieValue}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </Fragment>
    );
};

LeadersTable.propTypes = {
    heading: PropTypes.string,
    columnName: PropTypes.string,
    format: PropTypes.string,
    href: PropTypes.string,
    leadersObj: PropTypes.object,
};

export default LeadersTable;

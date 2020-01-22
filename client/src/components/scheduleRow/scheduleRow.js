import React from 'react';
import PropTypes from 'prop-types';

const ScheduleRow = ({ weekId, matchup }) => {
    return (
        <tr key={`${weekId}${matchup.home_team_id}`} className="bg-white">
            <td><a href={'/teams/' + matchup.away_team_id}>{matchup.away_team}</a></td>
            <td><a href={'/teams/' + matchup.home_team_id}>{matchup.home_team}</a></td>
            <td className="text-center">{matchup.alley}</td>
            <td>{matchup.start_time}</td>
        </tr>
    );
};

ScheduleRow.propTypes = {
    weekId: PropTypes.number,
    matchup: PropTypes.object,
};

export default ScheduleRow;

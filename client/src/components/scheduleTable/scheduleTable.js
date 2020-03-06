import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ScheduleRow from '../../components/scheduleRow/scheduleRow';

const ScheduleTable = ({ schedules }) => {
    return (
        <Fragment>
            {schedules.map((week) => (
                <div key={week.week_id} className="mb-5">
                    <h5 className="text-center text-success mb-4">Week {week.week_id} ({week.week_date1})</h5>
                    <div className="mb-3 table-wrapper">
                        <table className="table table-bordered table-hover mb-2">
                            <thead>
                                <tr className="bg-gray6">
                                    <th>Away Team</th>
                                    <th>Home Team</th>
                                    <th className="text-center">Alley</th>
                                    <th>Start Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {week.matchups.map((matchup) => (
                                    <Fragment key={`${week.week_id}${matchup.home_team_id}`}>
                                        <ScheduleRow weekId={week.week_id} matchup={matchup} />
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </Fragment>
    );
};

ScheduleTable.propTypes = {
    schedules: PropTypes.array,
};

export default ScheduleTable;

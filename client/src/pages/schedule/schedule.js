import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CurrentSeasonContext from '../../components/currentSeasonContext';
import SeasonDropdown from '../../components/seasonDropdown/seasonDropdown';
import PageHeading from '../../components/pageHeading/pageHeading';

const Schedule = () => {
    const [seasonId, setSeasonId] = useState(null);
    const currentSeasonId = useContext(CurrentSeasonContext);
    const { storeid, divisionid } = useParams();
    const querySeasonId = seasonId || currentSeasonId;
    const [season, setSeason] = useState();
    const [scheduleArray, setScheduleArray] = useState([]);
    const [isScheduleLoaded, setIsScheduleLoaded] = useState(false);
    const [scheduleSeasons, setScheduleArraySeasons] = useState([]);
    const [store, setStore] = useState();

    const handleSeasonId = season => setSeasonId(season);

    useEffect(() => {
        axios.get('/api/schedules/store/' + storeid + '/division/' + divisionid + '/seasons-list')
            .then((response) => {
                const seasonArray = response.data.map((season) => {
                    return {
                        season_id: season.season_id,
                        text: season.season_name + ' - ' + season.year,
                    };
                });
                setScheduleArraySeasons(seasonArray);
            })
            .catch(err => console.log(err));
    }, [storeid, divisionid]);

    useEffect(() => {
        setIsScheduleLoaded(false);
        axios.all([
            axios.get('/api/seasons/' + querySeasonId),
            axios.get('/api/stores/' + storeid + '/divisions/' + divisionid),
        ])
            .then(axios.spread((season, store) => {
                setSeason(season.data[0]);
                setStore(store.data[0]);
            }))
            .catch(err => console.log(err));
        axios('/api/schedules/store/' + storeid + '/division/' + divisionid + '/season/' + querySeasonId)
            .then((response) => {
                console.log(response.data);
                setScheduleArray(response.data);
                setIsScheduleLoaded(true);
            })
            .catch(err => console.log(err));
    }, [storeid, divisionid, querySeasonId]);

    return (
        <Fragment>
            <PageHeading text="Schedule" />
            {(store && season) &&
                <div className="mb-4 bigger">
                    <Fragment>
                        <a href={'/stores/' + store.store_id + '/divisions/' + store.division_id}>{store.store_name} ({store.day_name})</a> <span className="mx-2">|</span> Season: {season.season_name}, {season.year}
                    </Fragment>
                    {scheduleSeasons.length > 0 &&
                        <Fragment>
                            <SeasonDropdown buttonText="View Results From:" listItems={scheduleSeasons} handleSeasonId={handleSeasonId} />
                        </Fragment>
                    }
                </div>
            }
            <div className="d-flex justify-content-center mb-4">
                <div className="min-w-50 mx-auto">
                    {!isScheduleLoaded
                        ? <img src={'/images/loading.gif'} alt={'Loading'} />
                        : scheduleArray.length > 0
                            ? <Fragment>
                                <h5 className="text-center">Week # and Date will go here.</h5>
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr className="bg-gray6">
                                            <th>Away Team</th>
                                            <th>Home Team</th>
                                            <th className="text-center">Alley</th>
                                            <th>Start Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {scheduleArray.map((schedule, index) => (
                                            <tr key={index} className="bg-white">
                                                <td><a href={'/teams/' + schedule.away_team_id}>{schedule.away_team}</a></td>
                                                <td><a href={'/teams/' + schedule.home_team_id}>{schedule.home_team}</a></td>
                                                <td className="text-center">{schedule.alley}</td>
                                                <td>{schedule.start_time}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Fragment>
                            : <span className="empty-result">There is no schedule available for this season!</span>
                    }
                </div>
            </div>
        </Fragment>
    );
};

export default Schedule;

import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CurrentSeasonContext from '../../components/currentSeasonContext';
import SeasonDropdown from '../../components/seasonDropdown/seasonDropdown';
import PageHeading from '../../components/pageHeading/pageHeading';
import ScheduleTable from '../../components/scheduleTable/scheduleTable';

const Schedule = () => {
    const [seasonId, setSeasonId] = useState(null);
    const currentSeasonId = useContext(CurrentSeasonContext);
    const querySeasonId = seasonId || currentSeasonId;

    const { storeid, divisionid } = useParams();

    const [seasonName, setSeasonName] = useState(null);

    const [scheduleArray, setScheduleArray] = useState(null);
    const [scheduleArrayStatus, setScheduleArrayStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [scheduleSeasons, setScheduleSeasons] = useState(null);
    const [scheduleSeasonsStatus, setScheduleSeasonsStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [store, setStore] = useState(null);
    const [storeStatus, setStoreStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const handleSeasonId = season => setSeasonId(season);

    function formatScheduleArray(schedules) {
        const formattedArray = [];
        let tempObj = {};
        let counter = 0;
        schedules.map((schedule) => {
            const { week_id: weekId, week_date1: weekDate, ...rest } = schedule;
            if (schedule.week_id !== counter) {
                tempObj = {
                    week_id: weekId,
                    week_date1: weekDate,
                    matchups: [],
                };
                formattedArray.push(tempObj);
                counter = schedule.week_id;
            }
            return formattedArray[counter - 1].matchups.push({ ...rest });
        });
        setScheduleArray(formattedArray);
        setScheduleArrayStatus({ errorMsg: undefined, isLoaded: true });
    }

    useEffect(() => {
        axios.get('/api/schedules/store/' + storeid + '/division/' + divisionid + '/seasons-list')
            .then((response) => {
                const seasonArray = response.data.map((season) => {
                    return {
                        season_id: season.season_id,
                        text: season.season_name + ' - ' + season.year,
                    };
                });
                setScheduleSeasons(seasonArray);
                setScheduleSeasonsStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setScheduleSeasons(null);
                setScheduleSeasonsStatus({ errorMsg: 'An error occurred fetching the schedule for this store!', isLoaded: true });
            });
    }, [storeid, divisionid]);

    useEffect(() => {
        axios.get('/api/seasons/' + querySeasonId + '/name')
            .then((response) => {
                response.data[0] ? setSeasonName({ season_id: querySeasonId, season_name: response.data[0].season_name, season_year: response.data[0].year }) : setSeasonName(null);
            })
            .catch((error) => {
                console.log(error);
                setSeasonName(null);
            });
        axios.get('/api/stores/' + storeid + '/divisions/' + divisionid)
            .then((response) => {
                response.data[0] ? setStore(response.data[0]) : setStore([]);
                setStoreStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setStore(null);
                setStoreStatus({ errorMsg: 'An error occurred fetching info for this store!', isLoaded: true });
            });

        axios('/api/schedules/store/' + storeid + '/division/' + divisionid + '/season/' + querySeasonId)
            .then(response => formatScheduleArray(response.data))
            .catch(err => console.log(err));
    }, [storeid, divisionid, querySeasonId]);

    return (
        <Fragment>
            <PageHeading text="Schedule" />
            <div className="d-flex justify-content-between">
                <div>
                    {storeStatus.isLoaded && store &&
                        <div className="mb-3 bigger">
                            <a href={'/stores/' + store.store_id + '/divisions/' + store.division_id}>{store.store_name} ({store.day_name})</a>
                        </div>
                    }
                </div>
                <div className="text-right">
                    {scheduleSeasonsStatus.isLoaded && scheduleSeasons && scheduleSeasons.length > 0 &&
                        <SeasonDropdown currentSeason={seasonName} buttonText="View Schedule From:" listItems={scheduleSeasons} handleSeasonId={handleSeasonId} />
                    }
                </div>
            </div>
            <div className="d-flex justify-content-center mb-4">
                <div className="min-w-50 mx-auto">
                    {!scheduleArrayStatus.isLoaded
                        ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                        : scheduleArray && scheduleArray.length > 0
                            ? <Fragment>
                                <ScheduleTable schedules={scheduleArray} />
                            </Fragment>
                            : scheduleArray
                                ? <span className="empty-result">There is no schedule available for this season!</span>
                                : <span className="empty-result">{scheduleArrayStatus.errorMsg}</span>
                    }
                </div>
            </div>
        </Fragment>
    );
};

export default Schedule;

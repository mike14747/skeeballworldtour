import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SettingsContext from '../../context/settingsContext';
import SeasonDropdown from '../../components/seasonDropdown/seasonDropdown';
import PageHeading from '../../components/pageHeading/pageHeading';
import ScheduleTable from '../../components/scheduleTable/scheduleTable';

const Schedule = () => {
    const [seasonId, setSeasonId] = useState(null);
    const settings = useContext(SettingsContext);
    const currentSeasonId = settings.current_season_id;
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
                setScheduleSeasonsStatus({ errorMsg: 'An error occurred fetching the season list for this store!', isLoaded: true });
            });
    }, [storeid, divisionid]);

    useEffect(() => {
        if (querySeasonId) {
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
                .then((response) => {
                    setScheduleArray(response.data);
                    setScheduleArrayStatus({ errorMsg: undefined, isLoaded: true });
                })
                .catch((error) => {
                    console.log(error);
                    setScheduleArray(null);
                    setScheduleArrayStatus({ errorMsg: 'An error occurred fetching the schedule for this store!', isLoaded: true });
                });
        }
    }, [storeid, divisionid, querySeasonId]);

    return (
        <Fragment>
            <PageHeading text="Schedule" />
            <div className="row mb-4">
                <div className="col-6 text-left p-2">
                    {storeStatus.isLoaded && store &&
                        <div className="mb-3 bigger">
                            <a href={'/stores/' + store.store_id + '/divisions/' + store.division_id}>{store.store_name} ({store.day_name})</a>
                        </div>
                    }
                </div>
                <div className="col-6 text-right p-2">
                    {scheduleSeasonsStatus.isLoaded && scheduleSeasons && scheduleSeasons.length > 0 &&
                        <SeasonDropdown currentSeason={seasonName} buttonText="View Schedule From" listItems={scheduleSeasons} handleSeasonId={handleSeasonId} />
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

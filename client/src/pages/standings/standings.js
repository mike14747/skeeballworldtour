import React, { useState, useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import SettingsContext from '../../context/settingsContext';
import PageHeading from '../../components/pageHeading/pageHeading';
import SeasonDropdown from '../../components/seasonDropdown/seasonDropdown';
import StandingsTables from '../../components/standingsTables/standingsTables';

export default function Standings() {
    const settings = useContext(SettingsContext);

    const [seasonId, setSeasonId] = useState(null);
    const currentSeasonId = settings.current_season_id;
    const querySeasonId = seasonId || currentSeasonId;

    const [seasonName, setSeasonName] = useState(null);

    const [standingsArr, setStandingsArr] = useState(null);
    const [standingsArrStatus, setStandingsArrStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [standingsSeasons, setStandingsSeasons] = useState(null);
    const [standingsSeasonsStatus, setStandingsSeasonsStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const handleSeasonId = season => setSeasonId(season);

    useEffect(() => {
        axios.get('/api/standings/seasons-list')
            .then((response) => {
                const seasonArray = response.data.map((season) => {
                    return {
                        season_id: season.season_id,
                        text: season.season_name + ' - ' + season.year,
                    };
                });
                setStandingsSeasons(seasonArray);
                setStandingsSeasonsStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setStandingsSeasons(null);
                setStandingsSeasonsStatus({ errorMsg: 'An error occurred fetching the standings!', isLoaded: true });
            });
    }, []);

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
            axios.get('/api/standings/seasons/' + querySeasonId)
                .then((response) => {
                    setStandingsArr(response.data);
                    setStandingsArrStatus({ errorMsg: undefined, isLoaded: true });
                })
                .catch((error) => {
                    console.log(error);
                    setStandingsArr(null);
                    setStandingsArrStatus({ errorMsg: 'An error occurred fetching the standings!', isLoaded: true });
                });
        } else {
            setStandingsArrStatus({ errorMsg: 'An error occurred fetching the standings!', isLoaded: true });
        }
    }, [querySeasonId]);

    return (
        <Fragment>
            <PageHeading text="Standings" />
            <div className="row mb-4">
                <div className="col-12 text-right p-2">
                    {standingsSeasonsStatus.isLoaded && standingsSeasons && standingsSeasons.length > 0 &&
                        <SeasonDropdown currentSeason={seasonName} buttonText="View Standings From" listItems={standingsSeasons} handleSeasonId={handleSeasonId} />
                    }
                </div>
            </div>
            {!standingsArrStatus.isLoaded
                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                : standingsArr && standingsArr.length > 0
                    ? <StandingsTables standingsArr={standingsArr} />
                    : standingsArr
                        ? <span className="empty-result">There are no standings for this season!</span>
                        : <span className="empty-result">{standingsArrStatus.errorMsg}</span>
            }
        </Fragment>
    );
}

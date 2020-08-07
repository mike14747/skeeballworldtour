import React, { useState, useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import SettingsContext from '../../context/settingsContext';
import PageHeading from '../../components/pageHeading/pageHeading';
import SeasonDropdown from '../../components/seasonDropdown/seasonDropdown';
import StandingsTables from '../../components/standingsTables/standingsTables';
import Loading from '../../components/loading/loading';

export default function Standings() {
    const { current_season_id: currentSeasonId } = useContext(SettingsContext);

    const [seasonId, setSeasonId] = useState(null);
    const querySeasonId = seasonId || currentSeasonId;

    const [seasonName, setSeasonName] = useState(null);

    const [standings, setStandings] = useState({
        data: null,
        status: {
            errorMsg: undefined,
            isLoaded: false,
        },
    });

    const [seasons, setSeasons] = useState({
        data: null,
        status: {
            errorMsg: undefined,
            isLoaded: false,
        },
    });

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
                setSeasons({
                    data: seasonArray,
                    status: {
                        errorMsg: undefined,
                        isLoaded: true,
                    },
                });
            })
            .catch((error) => {
                console.log(error);
                setSeasons({
                    data: null,
                    status: {
                        errorMsg: 'An error occurred fetching the standings season list!',
                        isLoaded: true,
                    },
                });
            });
    }, []);

    useEffect(() => {
        if (querySeasonId) {
            axios.get('/api/seasons/' + querySeasonId + '/name')
                .then((response) => {
                    if (response.data[0]) {
                        setSeasonName({
                            season_id: querySeasonId,
                            season_name: response.data[0].season_name,
                            season_year: response.data[0].year,
                        });
                    } else {
                        setSeasonName(null);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setSeasonName(null);
                });
            axios.get('/api/standings/seasons/' + querySeasonId)
                .then((response) => {
                    setStandings({
                        data: response.data,
                        status: {
                            errorMsg: undefined,
                            isLoaded: true,
                        },
                    });
                })
                .catch((error) => {
                    console.log(error);
                    setStandings({
                        data: null,
                        status: {
                            errorMsg: 'An error occurred fetching the standings!',
                            isLoaded: true,
                        },
                    });
                });
        }
    }, [querySeasonId]);

    return (
        <Fragment>
            <PageHeading text="Standings" />
            <div className="row mb-4">
                <div className="col-12 text-right p-2">
                    {seasons.status.isLoaded && seasons.data && seasons.data.length > 0 &&
                        <SeasonDropdown currentSeason={seasonName} buttonText="View Standings From" listItems={seasons.data} handleSeasonId={handleSeasonId} />
                    }
                </div>
            </div>
            {!standings.status.isLoaded
                ? <Loading />
                : standings.data && standings.data.length > 0
                    ? <StandingsTables standingsArr={standings.data} />
                    : standings.data
                        ? <span className="empty-result">There are no standings for this season!</span>
                        : <span className="empty-result">{standings.status.errorMsg}</span>
            }
        </Fragment>
    );
}

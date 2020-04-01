import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SettingsContext from '../../context/settingsContext';
import SeasonDropdown from '../../components/seasonDropdown/seasonDropdown';
import PageHeading from '../../components/pageHeading/pageHeading';
import StatsBlock from '../../components/statsBlock/statsBlock';

const Players = () => {
    const settings = useContext(SettingsContext);

    const [seasonId, setSeasonId] = useState(null);
    const currentSeasonId = settings.current_season_id;
    const querySeasonId = seasonId || currentSeasonId;

    const { playerid } = useParams();

    const [seasonName, setSeasonName] = useState(null);

    const [playerNameStores, setPlayerNameStores] = useState(null);
    const [playerNameStoresStatus, setPlayerNameStoresStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [currentViewStores, setCurrentViewStores] = useState(null);
    const [currentViewStoresStatus, setCurrentViewStoresStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [playerSeasons, setPlayerSeasons] = useState(null);
    const [playerSeasonsStatus, setPlayerSeasonsStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [playerStats, setPlayerStats] = useState(null);
    const [playerStatsStatus, setPlayerStatsStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [playerResults, setPlayerResults] = useState(null);
    const [playerResultsStatus, setPlayerResultsStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const gamesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const handleSeasonId = season => setSeasonId(season);

    useEffect(() => {
        axios.get('/api/players/' + playerid + '/name-store')
            .then((response) => {
                response.data[0] ? setPlayerNameStores(response.data[0]) : setPlayerNameStores([]);
                setPlayerNameStoresStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setPlayerNameStores(null);
                setPlayerNameStoresStatus({ errorMsg: 'An error occurred fetching info for this Player!', isLoaded: true });
            });
        axios.get('/api/players/' + playerid + '/seasons-list')
            .then((response) => {
                const seasonArray = response.data.map((season) => {
                    return {
                        season_id: season.season_id,
                        text: season.season_name + ' - ' + season.year,
                    };
                });
                setPlayerSeasons(seasonArray);
                setPlayerSeasonsStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setPlayerSeasons(null);
                setPlayerSeasonsStatus({ errorMsg: 'An error occurred fetching the season list for this player!', isLoaded: true });
            });
    }, [playerid]);

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
            axios.get('/api/players/' + playerid + '/current-stores/season/' + querySeasonId)
                .then((response) => {
                    response.data[0] ? setCurrentViewStores({ stores: response.data[0].stores }) : setCurrentViewStores(null);
                    setCurrentViewStoresStatus({ errorMsg: undefined, isLoaded: true });
                })
                .catch((error) => {
                    console.log(error);
                    setCurrentViewStores(null);
                    setCurrentViewStoresStatus({ errorMsg: undefined, isLoaded: true });
                });
            axios.get('/api/players/' + playerid + '/results/seasons/' + querySeasonId)
                .then((response) => {
                    if (response.data) {
                        setPlayerStats(response.data.formattedPlayerStats);
                        setPlayerResults(response.data.formattedPlayerResults);
                    } else {
                        setPlayerStats([]);
                        setPlayerResults([]);
                    }
                    setPlayerStatsStatus({ errorMsg: undefined, isLoaded: true });
                    setPlayerResultsStatus({ errorMsg: undefined, isLoaded: true });
                })
                .catch((error) => {
                    console.log(error);
                    setPlayerStats(null);
                    setPlayerResults(null);
                    setPlayerStatsStatus({ errorMsg: 'An error occurred fetching stats for this Player!', isLoaded: true });
                    setPlayerResultsStatus({ errorMsg: 'An error occurred fetching results for this Player!', isLoaded: true });
                });
        }
    }, [playerid, querySeasonId]);

    return (
        <Fragment>
            <PageHeading text="Player Stats" />
            <div className="row mb-4">
                <div className="col-6 text-left p-2">
                    {playerNameStoresStatus.isLoaded && playerNameStores &&
                        <div className="mb-3">
                            <div className="bigger font-weight-bolder"><span className="text-danger">Player: </span>{playerNameStores.full_name}</div>
                            <div><span className="small">Career Store(s):</span> {playerNameStores.cities}</div>
                            {currentViewStoresStatus.isLoaded && currentViewStores.stores &&
                                <div><span className="small">Current View:</span> <span className="font-weight-bolder">{currentViewStores.stores}</span></div>
                            }
                        </div>
                    }
                </div>
                <div className="col-6 text-right p-2">
                    {playerSeasonsStatus.isLoaded && playerSeasons && playerSeasons.length > 0 &&
                        <SeasonDropdown currentSeason={seasonName} buttonText="View Stats From" listItems={playerSeasons} handleSeasonId={handleSeasonId} />
                    }
                </div>
            </div>
            <div className="d-flex justify-content-center mb-4">
                <div className="mx-auto">
                    {!playerStatsStatus.isLoaded
                        ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                        : playerStats && playerStats.length > 0
                            ? <Fragment>
                                <h5 className="text-center">Detailed Breakdown</h5>
                                <StatsBlock stats={playerStats} />
                            </Fragment>
                            : playerStats
                                ? <span className="empty-result">There are no player stats for this season!</span>
                                : <span className="empty-result">{playerStatsStatus.errorMsg}</span>
                    }
                </div>
            </div>
            <div className="d-flex justify-content-center mb-4">
                <div className="mx-auto table-wrapper">
                    {!playerResultsStatus.isLoaded
                        ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                        : playerResults && playerResults.length > 0
                            ? <Fragment>
                                <h5 className="text-center">Week by Week Results</h5>
                                <table className="table table-bordered table-hover mb-0">
                                    <thead>
                                        <tr className="bg-gray6">
                                            <th>Week # - Team</th>
                                            {gamesArray.map((game, i) => (
                                                <th key={i} className="text-center">{game}</th>
                                            ))}
                                            <th className="text-center">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {playerResults.map((result) => (
                                            <tr key={result.id}>
                                                <td>{result.week_id} - <a href={'/teams/' + result.team_id}>{result.team_name}</a></td>
                                                {result.scores.map((score, index) => (
                                                    <td key={index} className="text-center">{score}</td>
                                                ))}
                                                <td className="text-center">{result.total}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Fragment>
                            : playerResults
                                ? <span className="empty-result">There are no player results for this season!</span>
                                : <span className="empty-result">{playerResultsStatus.errorMsg}</span>
                    }
                </div>
            </div>
        </Fragment >
    );
};

export default Players;

import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CurrentSeasonContext from '../../context/currentSeasonContext';
import SeasonDropdown from '../../components/seasonDropdown/seasonDropdown';
import PageHeading from '../../components/pageHeading/pageHeading';
import StatsBlock from '../../components/statsBlock/statsBlock';

const Players = () => {
    const [seasonId, setSeasonId] = useState(null);
    const currentSeasonId = useContext(CurrentSeasonContext);
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
                setPlayerSeasonsStatus({ errorMsg: 'An error occurred fetching stats for this player!', isLoaded: true });
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
                    if (response.data.length > 0) {
                        const allScores = [];
                        const formattedResults = response.data.map((result, index) => {
                            const tempObj = {
                                id: index,
                                team_id: result.team_id,
                                team_name: result.team_name,
                                week_id: result.week_id,
                                player_id: result.player_id,
                                scores: [result.g1, result.g2, result.g3, result.g4, result.g5, result.g6, result.g7, result.g8, result.g9, result.g10],
                            };
                            tempObj.scores.map(score => allScores.push(score));
                            tempObj.total = tempObj.scores.reduce((accumulator, currentValue) => accumulator + currentValue);
                            return tempObj;
                        });
                        const [totalGames, games800, games700, games600, games500, games400, games300, highGame, lowGame] = [
                            allScores.length,
                            allScores.filter(score => score >= 800).length,
                            allScores.filter(score => score >= 700).length,
                            allScores.filter(score => score >= 600).length,
                            allScores.filter(score => score >= 500).length,
                            allScores.filter(score => score >= 400).length,
                            allScores.filter(score => score >= 300).length,
                            Math.max(...allScores), Math.min(...allScores),
                        ];
                        const [averageScore, highGameCount, lowGameCount] = [allScores.reduce((accumulator, currentValue) => accumulator + currentValue) / totalGames, allScores.filter(score => score === highGame).length, allScores.filter(score => score === lowGame).length];
                        const matchesArray = formattedResults.map(match => match.scores.reduce((accumulator, currentValue) => accumulator + currentValue));
                        const bestTenGameSeries = Math.max(...matchesArray);
                        const tempPlayerStats = [];
                        tempPlayerStats.push({ text: 'Total Games Played:', data: totalGames });
                        games800 > 0 && tempPlayerStats.push({ text: '800+ Games:', data: games800 + ' (' + (100 * games800 / totalGames).toFixed(1) + '%)' });
                        games700 > 0 && tempPlayerStats.push({ text: '700+ Games:', data: games700 + ' (' + (100 * games700 / totalGames).toFixed(1) + '%)' });
                        games600 > 0 && tempPlayerStats.push({ text: '600+ Games:', data: games600 + ' (' + (100 * games600 / totalGames).toFixed(1) + '%)' });
                        games500 > 0 && tempPlayerStats.push({ text: '500+ Games:', data: games500 + ' (' + (100 * games500 / totalGames).toFixed(1) + '%)' });
                        games400 > 0 && tempPlayerStats.push({ text: '400+ Games:', data: games400 + ' (' + (100 * games400 / totalGames).toFixed(1) + '%)' });
                        games300 > 0 && tempPlayerStats.push({ text: '300+ Games:', data: games300 + ' (' + (100 * games300 / totalGames).toFixed(1) + '%)' });
                        tempPlayerStats.push({ text: 'Average Score per Game:', data: averageScore.toFixed(1) });
                        tempPlayerStats.push({ text: 'High Game:', data: highGame + ' (' + highGameCount + ')' });
                        tempPlayerStats.push({ text: 'Low Game:', data: lowGame + ' (' + lowGameCount + ')' });
                        tempPlayerStats.push({ text: 'Best 10-Game Series:', data: bestTenGameSeries });
                        setPlayerStats(tempPlayerStats);
                        setPlayerResults(formattedResults);
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
                <div className="mx-auto">
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

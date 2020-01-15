import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CurrentSeasonContext from '../../components/currentSeasonContext';
import Dropdown from '../../components/dropdown/dropdown';
import PageHeading from '../../components/pageHeading/pageHeading';
import StatsBlock from '../../components/statsBlock/statsBlock';

const Players = () => {
    const currentSeasonId = useContext(CurrentSeasonContext);
    const { seasonid } = useParams();
    const querySeasonId = seasonid || currentSeasonId;
    const { playerid } = useParams();
    const queryPlayerId = playerid || 0;
    const [playerNameStore, setPlayerNameStore] = useState();
    const [playerSeasons, setPlayerSeasons] = useState([]);
    const [playerStats, setPlayerStats] = useState();
    const [playerResults, setPlayerResults] = useState([]);
    const [arePlayerStatsLoaded, setArePlayerStatsLoaded] = useState(false);
    const [arePlayerResultsLoaded, setArePlayerResultsLoaded] = useState(false);
    const gamesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    useEffect(() => {
        axios.get('/api/players/' + queryPlayerId + '/name-store')
            .then(response => setPlayerNameStore(response.data[0]))
            .catch(err => console.log(err));
        axios.get('/api/players/' + queryPlayerId + '/seasons')
            .then((response) => {
                const seasonArray = response.data.map((season) => {
                    return {
                        id: season.season_id,
                        text: season.season_name + ' - ' + season.year,
                        href: '/players/' + queryPlayerId + '/' + season.season_id,
                    };
                });
                setPlayerSeasons(seasonArray);
            })
            .catch(err => console.log(err));
    }, [queryPlayerId]);

    useEffect(() => {
        axios.get('/api/players/' + queryPlayerId + '/results/seasons/' + querySeasonId)
            .then((response) => {
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
                const [totalGames, games800, games700, games600, games500, games400, games300, highGame, lowGame] = [allScores.length, allScores.filter(score => score >= 800).length, allScores.filter(score => score >= 700).length, allScores.filter(score => score >= 600).length, allScores.filter(score => score >= 500).length, allScores.filter(score => score >= 400).length, allScores.filter(score => score >= 300).length, Math.max(...allScores), Math.min(...allScores)];
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
                setArePlayerStatsLoaded(true);
                setPlayerResults(formattedResults);
                setArePlayerResultsLoaded(true);
            })
            .catch(err => console.log(err));
    }, [queryPlayerId, querySeasonId]);

    return (
        <Fragment>
            <PageHeading text="Player Stats" />
            {playerNameStore &&
                <div className="mb-4 bigger">
                    {playerNameStore &&
                        <Fragment>
                            <b>{playerNameStore.store_name}</b> <span className="mx-2">|</span> <b><span className="text-danger">Player: </span>{playerNameStore.full_name}</b>
                        </Fragment>
                    }
                    {playerSeasons.length > 0 &&
                        <Fragment>
                            <Dropdown buttonText="View Stats From:" listItems={playerSeasons} />
                        </Fragment>
                    }
                </div>
            }
            <div className="d-flex justify-content-center mb-4">
                <div className="mx-auto">
                    {!arePlayerStatsLoaded
                        ? <img src={'/images/loading.gif'} alt={'Loading'} />
                        : playerStats.length > 0
                            ? <StatsBlock stats={playerStats} />
                            : <span className="bigger text-danger">There are no player stats for this season!</span>
                    }
                </div>
            </div>
            <div className="d-flex justify-content-center mb-4">
                <div className="mx-auto">
                    {!arePlayerResultsLoaded
                        ? <img src={'/images/loading.gif'} alt={'Loading'} />
                        : playerResults.length > 0
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
                            : <span className="bigger text-danger">There are no player results for this season!</span>
                    }
                </div>
            </div>
        </Fragment >
    );
};

export default Players;

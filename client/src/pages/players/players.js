import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CurrentSeasonContext from '../../components/currentSeasonContext';
import Dropdown from '../../components/dropdown/dropdown';
import PageHeading from '../../components/pageHeading/pageHeading';

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
        // get the players stats for the selected or currect season
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
                setPlayerStats({
                    totalGames: totalGames,
                    games800: games800,
                    games700: games700,
                    games600: games600,
                    games500: games500,
                    games400: games400,
                    games300: games300,
                    averageScore: averageScore,
                    highGame: highGame,
                    highGameCount: highGameCount,
                    lowGame: lowGame,
                    lowGameCount: lowGameCount,
                    bestTenGameSeries: bestTenGameSeries,
                });
                setPlayerResults(formattedResults);
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
            {playerStats &&
                <div className="d-flex justify-content-center mb-4">
                    <div className="mx-auto">
                        <table className="table table-bordered table-hover">
                            <tbody>
                                <tr>
                                    <td className="bg-gray6 font-weight-bolder text-right">Total games played:</td>
                                    <td className="text-center px-4">{playerStats.totalGames}</td>
                                </tr>
                                {playerStats.games800 > 0 &&
                                    <tr>
                                        <td className="bg-gray6 font-weight-bolder text-right">800+ games:</td>
                                        <td className="text-center px-4">{playerStats.games800} ({(100 * playerStats.games800 / playerStats.totalGames).toFixed(1)}%)</td>
                                    </tr>
                                }
                                {playerStats.games700 > 0 &&
                                    <tr>
                                        <td className="bg-gray6 font-weight-bolder text-right">700+ games:</td>
                                        <td className="text-center px-4">{playerStats.games700} ({(100 * playerStats.games700 / playerStats.totalGames).toFixed(1)}%)</td>
                                    </tr>
                                }
                                {playerStats.games600 > 0 &&
                                    <tr>
                                        <td className="bg-gray6 font-weight-bolder text-right">600+ games:</td>
                                        <td className="text-center px-4">{playerStats.games600} ({(100 * playerStats.games600 / playerStats.totalGames).toFixed(1)}%)</td>
                                    </tr>
                                }
                                {playerStats.games500 > 0 &&
                                    <tr>
                                        <td className="bg-gray6 font-weight-bolder text-right">500+ games:</td>
                                        <td className="text-center px-4">{playerStats.games500} ({(100 * playerStats.games500 / playerStats.totalGames).toFixed(1)}%)</td>
                                    </tr>
                                }
                                {playerStats.games400 > 0 &&
                                    <tr>
                                        <td className="bg-gray6 font-weight-bolder text-right">400+ games:</td>
                                        <td className="text-center px-4">{playerStats.games400} ({(100 * playerStats.games400 / playerStats.totalGames).toFixed(1)}%)</td>
                                    </tr>
                                }
                                {playerStats.games300 > 0 &&
                                    <tr>
                                        <td className="bg-gray6 font-weight-bolder text-right">300+ games:</td>
                                        <td className="text-center px-4">{playerStats.games300} ({(100 * playerStats.games300 / playerStats.totalGames).toFixed(1)}%)</td>
                                    </tr>
                                }
                                <tr>
                                    <td className="bg-gray6 font-weight-bolder text-right">Average score per game:</td>
                                    <td className="text-center px-4">{playerStats.averageScore.toFixed(1)}</td>
                                </tr>
                                <tr>
                                    <td className="bg-gray6 font-weight-bolder text-right">High game:</td>
                                    <td className="text-center px-4">{playerStats.highGame} ({playerStats.highGameCount})</td>
                                </tr>
                                <tr>
                                    <td className="bg-gray6 font-weight-bolder text-right">Low game:</td>
                                    <td className="text-center px-4">{playerStats.lowGame} ({playerStats.highGameCount})</td>
                                </tr>
                                <tr>
                                    <td className="bg-gray6 font-weight-bolder text-right">Best 10-game series:</td>
                                    <td className="text-center px-4">{playerStats.bestTenGameSeries}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            }
            {
                playerResults &&
                <div className="d-flex justify-content-center">
                    <div className="min-w-50 mx-auto">
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
                    </div>
                </div>
            }
        </Fragment >
    );
};

export default Players;

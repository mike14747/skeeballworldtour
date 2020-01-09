import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/teams.css';
import CurrentSeasonContext from '../../components/currentSeasonContext';
import Dropdown from '../../components/dropdown/dropdown';
import ResultsDiv from '../../components/resultsDiv/resultsDiv';

export default function Teams() {
    const currentSeasonId = useContext(CurrentSeasonContext);
    const { seasonid } = useParams();
    const querySeasonId = seasonid || currentSeasonId;
    const { teamid } = useParams();
    const queryTeamId = teamid || 0;
    const [teamStoreNames, setTeamStoreNames] = useState({});
    const [teamSeasons, setTeamSeasons] = useState([]);
    const [teamStats, setTeamStats] = useState({});
    const [teamSchedule, setTeamSchedule] = useState([]);
    const [playersTeam, setPlayersTeam] = useState([]);
    const [teamResults, setTeamResults] = useState([]);

    useEffect(() => {
        axios.get('/api/teams/' + queryTeamId + '/store-name')
            .then((response) => {
                setTeamStoreNames(response.data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
        axios.get('/api/teams/' + queryTeamId + '/seasons')
            .then((response) => {
                const seasonArray = response.data.map((season) => {
                    return {
                        id: season.season_id,
                        text: season.season_name + ' - ' + season.year,
                        href: '/teams/' + queryTeamId + '/' + season.season_id,
                    };
                });
                setTeamSeasons(seasonArray);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [queryTeamId]);

    useEffect(() => {
        axios.get('/api/teams/' + queryTeamId + '/seasons/' + querySeasonId)
            .then((response) => {
                setTeamStats(response.data[2][0]);
            })
            .catch((err) => {
                console.log(err);
            });
        axios.get('/api/teams/' + queryTeamId + '/current-schedule/seasons/' + querySeasonId)
            .then((response) => {
                setTeamSchedule(response.data[2]);
            })
            .catch((err) => {
                console.log(err);
            });
        axios.get('/api/teams/' + queryTeamId + '/players/seasons/' + querySeasonId)
            .then((response) => {
                setPlayersTeam(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios.get('/api/teams/' + queryTeamId + '/results/seasons/' + querySeasonId)
            .then((response) => {
                setTeamResults(response.data[2]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [queryTeamId, querySeasonId]);

    return (
        <div>
            <h2 className="text-center">Team Stats</h2>
            <hr />
            {teamStoreNames &&
                <div>
                    {teamStoreNames.store_name} | <b><span className="text-danger">Team: </span>{teamStoreNames.team_name}</b>
                </div>
            }
            {teamSeasons.length > 0 &&
                <div>
                    <Dropdown buttonText="View Stats From:" listItems={teamSeasons} />
                </div>
            }
            Season ID: {currentSeasonId} | Team ID: {teamid}<br />
            <div className="row mb-4">
                <div className="col-sm-6">
                    {playersTeam.length > 0 &&
                        <div className="d-flex justify-content-center">
                            <div className="min-w-50 mx-auto">
                                <h5 className="text-center">Players</h5>
                                <table className="table table-hover">
                                    <thead>
                                        <tr className="bg-ltgray">
                                            <th>Player</th>
                                            <th className="text-center">Games</th>
                                            <th className="text-center">Average</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {playersTeam.map((player) => (
                                            <tr key={player.player_id}>
                                                <td><a href={'/players/' + player.player_id}>{player.full_name}</a></td>
                                                <td className="text-center">{player.games_played}</td>
                                                <td className="text-center">{Number(player.avg_score).toFixed(1)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                </div>
                <div className="col-sm-6">
                    {teamStats &&
                        <div className="d-flex justify-content-center">
                            <div className="min-w-50 mx-auto">
                                <h5 className="text-center">Team Stats</h5>
                                <table className="table table-hover">
                                    <tbody>
                                        <tr>
                                            <td className="bg-ltgray font-weight-bolder">Record</td>
                                            <td className="text-center px-4">{teamStats.wins}-{teamStats.losses}-{teamStats.ties}</td>
                                        </tr>
                                        <tr>
                                            <td className="bg-ltgray font-weight-bolder">Total Points</td>
                                            <td className="text-center px-4">{teamStats.total_points}</td>
                                        </tr>
                                        <tr>
                                            <td className="bg-ltgray font-weight-bolder">1-Game Low</td>
                                            <td className="text-center px-4">{teamStats.one_game_low}</td>
                                        </tr>
                                        <tr>
                                            <td className="bg-ltgray font-weight-bolder">1-Game Avg</td>
                                            <td className="text-center px-4">{Number(teamStats.one_game_avg).toFixed(1)}</td>
                                        </tr>
                                        <tr>
                                            <td className="bg-ltgray font-weight-bolder">1-Game High</td>
                                            <td className="text-center px-4">{teamStats.one_game_high}</td>
                                        </tr>
                                        <tr>
                                            <td className="bg-ltgray font-weight-bolder">10-Game Low</td>
                                            <td className="text-center px-4">{teamStats.ten_game_low}</td>
                                        </tr>
                                        <tr>
                                            <td className="bg-ltgray font-weight-bolder">10-Game Avg</td>
                                            <td className="text-center px-4">{Number(teamStats.ten_game_avg).toFixed(1)}</td>
                                        </tr>
                                        <tr>
                                            <td className="bg-ltgray font-weight-bolder">10-Game High</td>
                                            <td className="text-center px-4">{teamStats.ten_game_high}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                </div>
            </div>
            {teamSchedule.length > 0 &&
                <div className="d-flex justify-content-center mb-4">
                    <div className="min-w-50 mx-auto">
                        <h5 className="text-center">Schedule</h5>
                        <table className="table table-hover">
                            <thead>
                                <tr className="bg-ltgray">
                                    <th className="text-center">WEEK #</th>
                                    <th>Away Team</th>
                                    <th>Home Team</th>
                                    <th className="text-center">Alley</th>
                                    <th>Start Time</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teamSchedule.map((schedule) => (
                                    <tr key={schedule.week_id}>
                                        <td className="text-center">{schedule.week_id}</td>
                                        <td><a href={'/teams/' + schedule.away_team_id}>{schedule.away_team_name}</a></td>
                                        <td><a href={'/teams/' + schedule.home_team_id}>{schedule.home_team_name}</a></td>
                                        <td className="text-center">{schedule.alley}</td>
                                        <td>{schedule.start_time}</td>
                                        <td>{schedule.week_date1}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
            {teamResults.length > 0 &&
                <div className="d-flex justify-content-center">
                    <div className="min-w-50 mx-auto">
                        <h5 className="text-center">Weekly Results</h5>
                        <ResultsDiv results={teamResults} />
                    </div>
                </div>
            }
        </div>
    );
}

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

    const temp1 = [
        {
            id: 1,
            week_id: 9,
            date: 'Mar-11, 2019',
            away_team: {
                wins: 1,
                losses: 9,
                ties: 0,
                team_id: 152,
                team_name: 'Brewskees',
                game_totals: [1220, 700, 790, 860, 810, 870, 800, 1120, 880, 830],
                team_total: 8880,
                players: [
                    {
                        player_id: 311,
                        name: 'Michaiah Rundell',
                        scores: [370, 180, 180, 130, 180, 200, 190, 190, 270, 530],
                        total_points: 2420,
                    },
                    {
                        player_id: 289,
                        name: 'Gun Chao',
                        scores: [310, 100, 160, 280, 190, 220, 360, 300, 150, 170],
                        total_points: 2240,
                    },
                    {
                        player_id: 337,
                        name: 'Tiffany Ruic',
                        scores: [540, 420, 450, 450, 440, 450, 250, 630, 460, 130],
                        total_points: 4220,
                    },
                ],
            },
        },
    ];

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
            {/* <div className="d-flex justify-content-center">
                <div className="min-w-50 mx-auto">
                    <h5 className="text-center">Weekly Results</h5>
                    <ResultsDiv results={temp1} />
                </div>
            </div> */}
        </div>
    );
}

const teamResults = [
    {
        week_id: 9,
        week_date1: 'Mar-11, 2019',
        away_team_id: 152,
        home_team_id: 853,
        alley: 1,
        start_time: '6:30 PM',
        at: 'Brewskees',
        ap1id: 311,
        ap1: 'Michaiah Rundell',
        ap1g1: 370,
        ap1g2: 180,
        ap1g3: 180,
        ap1g4: 130,
        ap1g5: 180,
        ap1g6: 200,
        ap1g7: 190,
        ap1g8: 190,
        ap1g9: 270,
        ap1g10: 530,
        ap2id: 289,
        ap2: 'Gun Chao',
        ap2g1: 310,
        ap2g2: 100,
        ap2g3: 160,
        ap2g4: 280,
        ap2g5: 190,
        ap2g6: 220,
        ap2g7: 360,
        ap2g8: 300,
        ap2g9: 150,
        ap2g10: 170,
        ap3id: 337,
        ap3: 'Tiffany Ruic',
        ap3g1: 540,
        ap3g2: 420,
        ap3g3: 450,
        ap3g4: 450,
        ap3g5: 440,
        ap3g6: 450,
        ap3g7: 250,
        ap3g8: 630,
        ap3g9: 460,
        ap3g10: 130,
        ht: 'Milk Duds',
        hp1id: 3428,
        hp1: 'Antonio Bassiotta',
        hp1g1: 540,
        hp1g2: 360,
        hp1g3: 450,
        hp1g4: 560,
        hp1g5: 540,
        hp1g6: 620,
        hp1g7: 360,
        hp1g8: 360,
        hp1g9: 320,
        hp1g10: 460,
        hp2id: 3427,
        hp2: 'Rob Quinn',
        hp2g1: 270,
        hp2g2: 220,
        hp2g3: 630,
        hp2g4: 450,
        hp2g5: 270,
        hp2g6: 390,
        hp2g7: 200,
        hp2g8: 350,
        hp2g9: 290,
        hp2g10: 390,
        hp3id: 3463,
        hp3: 'Max Schindler',
        hp3g1: 190,
        hp3g2: 320,
        hp3g3: 220,
        hp3g4: 190,
        hp3g5: 260,
        hp3g6: 270,
        hp3g7: 540,
        hp3g8: 530,
        hp3g9: 540,
        hp3g10: 280,
    },
];

function formatResults(results) {
    const resultsArray = results.map((result, index) => {
        let tempObj = {};
        tempObj.id = index;
        tempObj.week_id = result.week_id;
        tempObj.date = result.week_date1;
        tempObj.away_team = {
            team_id: result.away_team_id,
            team_name: result.away_team_name,
            player: [],
        };
        tempObj.home_team = {
            team_id: result.home,
            team_name: result.home_team_name,
            player: [],
        };
        for (let a = 1; a <= 3; a++) {
            let player = {};
        }
        return tempObj;
    });
    return resultsArray;
}

const temp2 = [
    {
        id: 1,
        week_id: 9,
        date: 'Mar-11, 2019',
        away_team: {
            wins: 1,
            losses: 9,
            ties: 0,
            team_id: 152,
            team_name: 'Brewskees',
            game_totals: [1220, 700, 790, 860, 810, 870, 800, 1120, 880, 830],
            game_results: ['w', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l'],
            team_total: 8880,
            players: [
                {
                    player_id: 311,
                    name: 'Michaiah Rundell',
                    scores: [370, 180, 180, 130, 180, 200, 190, 190, 270, 530],
                    total_points: 2420,
                },
                {
                    player_id: 289,
                    name: 'Gun Chao',
                    scores: [310, 100, 160, 280, 190, 220, 360, 300, 150, 170],
                    total_points: 2240,
                },
                {
                    player_id: 337,
                    name: 'Tiffany Ruic',
                    scores: [540, 420, 450, 450, 440, 450, 250, 630, 460, 130],
                    total_points: 4220,
                },
            ],
        },
    },
];

import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CurrentSeasonContext from '../../components/currentSeasonContext';
import Dropdown from '../../components/dropdown/dropdown';
import ResultsDiv from '../../components/resultsDiv/resultsDiv';
import PageHeading from '../../components/pageHeading/pageHeading';
import StatsBlock from '../../components/statsBlock/statsBlock';

export default function Teams() {
    const currentSeasonId = useContext(CurrentSeasonContext);
    const { seasonid } = useParams();
    const querySeasonId = seasonid || currentSeasonId;
    const { teamid } = useParams();
    const queryTeamId = teamid || 0;
    const [teamNameStore, setTeamNameStore] = useState();
    const [teamSeasons, setTeamSeasons] = useState([]);
    const [teamStats, setTeamStats] = useState([]);
    const [teamSchedule, setTeamSchedule] = useState([]);
    const [playersTeam, setPlayersTeam] = useState([]);
    const [teamResults, setTeamResults] = useState([]);

    useEffect(() => {
        axios.get('/api/teams/' + queryTeamId + '/store-name')
            .then(response => setTeamNameStore(response.data[0]))
            .catch(err => console.log(err));
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
            .catch(err => console.log(err));
    }, [queryTeamId]);

    useEffect(() => {
        axios.get('/api/teams/' + queryTeamId + '/seasons/' + querySeasonId)
            .then((response) => {
                const tempTeamStats = [];
                tempTeamStats.push({ text: 'Record:', data: response.data[2][0].wins + '-' + response.data[2][0].losses + '-' + response.data[2][0].ties });
                tempTeamStats.push({ text: 'Total Points:', data: response.data[2][0].total_points });
                tempTeamStats.push({ text: '1-Game Low:', data: response.data[2][0].one_game_low });
                tempTeamStats.push({ text: '1-Game Avg:', data: Number(response.data[2][0].one_game_avg).toFixed(1) });
                tempTeamStats.push({ text: '1-Game High:', data: response.data[2][0].one_game_high });
                tempTeamStats.push({ text: '10-Game Low:', data: response.data[2][0].ten_game_low });
                tempTeamStats.push({ text: '10-Game Avg:', data: Number(response.data[2][0].ten_game_avg).toFixed(1) });
                tempTeamStats.push({ text: '10-Game High:', data: response.data[2][0].ten_game_high });
                // response.data[2][0]
                setTeamStats(tempTeamStats);
            })
            .catch(err => console.log(err));
        axios.get('/api/teams/' + queryTeamId + '/current-schedule/seasons/' + querySeasonId)
            .then(response => setTeamSchedule(response.data[2]))
            .catch(err => console.log(err));
        axios.get('/api/teams/' + queryTeamId + '/players/seasons/' + querySeasonId)
            .then(response => setPlayersTeam(response.data))
            .catch(err => console.log(err));
        axios.get('/api/teams/' + queryTeamId + '/results/seasons/' + querySeasonId)
            .then(response => setTeamResults(response.data[2]))
            .catch(err => console.log(err));
    }, [queryTeamId, querySeasonId]);

    return (
        <Fragment>
            <PageHeading text="Team Stats" />
            {teamNameStore &&
                <div className="mb-4 bigger">
                    <b>{teamNameStore.store_name}</b> <span className="mx-2">|</span> <b><span className="text-danger">Team: </span>{teamNameStore.team_name}</b>
                    {teamSeasons.length > 0 &&
                        <Fragment>
                            <Dropdown buttonText="View Stats From:" listItems={teamSeasons} />
                        </Fragment>
                    }
                </div>
            }
            <div className="row mb-4">
                <div className="col-sm-6">
                    {playersTeam.length > 0 &&
                        <div className="d-flex justify-content-center">
                            <div className="min-w-50 mx-auto">
                                <h5 className="text-center">Players</h5>
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr className="bg-gray6">
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
                    {teamStats.length > 0 &&
                        <div className="d-flex justify-content-center">
                            <div className="min-w-50 mx-auto">
                                <h5 className="text-center">Team Stats</h5>
                                <StatsBlock stats={teamStats} />
                            </div>
                        </div>
                    }
                </div>
            </div>
            {teamSchedule.length > 0 &&
                <div className="d-flex justify-content-center mb-4">
                    <div className="min-w-50 mx-auto">
                        <h5 className="text-center">Schedule</h5>
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr className="bg-gray6">
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
                                    <tr key={schedule.week_id} className="bg-white">
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
        </Fragment>
    );
}

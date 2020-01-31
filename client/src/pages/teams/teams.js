import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CurrentSeasonContext from '../../components/currentSeasonContext';
import SeasonDropdown from '../../components/seasonDropdown/seasonDropdown';
import ResultsDiv from '../../components/resultsDiv/resultsDiv';
import PageHeading from '../../components/pageHeading/pageHeading';
import StatsBlock from '../../components/statsBlock/statsBlock';

export default function Teams() {
    const [seasonId, setSeasonId] = useState(null);
    const currentSeasonId = useContext(CurrentSeasonContext);
    const querySeasonId = seasonId || currentSeasonId;

    const { teamid } = useParams();

    const [seasonName, setSeasonName] = useState(null);

    const [teamNameStore, setTeamNameStore] = useState(null);
    const [teamNameStoreStatus, setTeamNameStoreStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [teamSeasons, setTeamSeasons] = useState(null);
    const [teamSeasonsStatus, setTeamSeasonsStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [teamStats, setTeamStats] = useState(null);
    const [teamStatsStatus, setTeamStatsStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [teamSchedule, setTeamSchedule] = useState(null);
    const [teamScheduleStatus, setTeamScheduleStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [teamPlayers, setTeamPlayers] = useState(null);
    const [teamPlayersStatus, setTeamPlayersStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [teamResults, setTeamResults] = useState(null);
    const [teamResultsStatus, setTeamResultsStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const handleSeasonId = season => setSeasonId(season);

    useEffect(() => {
        axios.get('/api/teams/' + teamid + '/store-name')
            .then((response) => {
                response.data[0] ? setTeamNameStore(response.data[0]) : setTeamNameStore([]);
                setTeamNameStoreStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setTeamNameStore(null);
                setTeamNameStoreStatus({ errorMsg: 'An error occurred fetching info for this team!', isLoaded: true });
            });
        axios.get('/api/teams/' + teamid + '/seasons-list')
            .then((response) => {
                const seasonArray = response.data.map((season) => {
                    return {
                        season_id: season.season_id,
                        text: season.season_name + ' - ' + season.year,
                    };
                });
                setTeamSeasons(seasonArray);
                setTeamSeasonsStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setTeamSeasons(null);
                setTeamSeasonsStatus({ errorMsg: 'An error occurred fetching stats for this team!', isLoaded: true });
            });
    }, [teamid]);

    useEffect(() => {
        axios.get('/api/seasons/' + querySeasonId + '/name')
            .then((response) => {
                response.data[0] ? setSeasonName({ season_id: querySeasonId, season_name: response.data[0].season_name, season_year: response.data[0].year }) : setSeasonName(null);
            })
            .catch((error) => {
                console.log(error);
                setSeasonName(null);
            });
        axios.get('/api/teams/' + teamid + '/seasons/' + querySeasonId)
            .then((response) => {
                if (response.data[2][0]) {
                    setTeamStats([
                        { text: 'Record:', data: response.data[2][0].wins + '-' + response.data[2][0].losses + '-' + response.data[2][0].ties },
                        { text: 'Total Points:', data: response.data[2][0].total_points },
                        { text: '1-Game Low:', data: response.data[2][0].one_game_low },
                        { text: '1-Game Avg:', data: Number(response.data[2][0].one_game_avg).toFixed(1) },
                        { text: '1-Game High:', data: response.data[2][0].one_game_high },
                        { text: '10-Game Low:', data: response.data[2][0].ten_game_low },
                        { text: '10-Game Avg:', data: Number(response.data[2][0].ten_game_avg).toFixed(1) },
                        { text: '10-Game High:', data: response.data[2][0].ten_game_high },
                    ]);
                } else {
                    setTeamStats([]);
                }
                setTeamStatsStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setTeamStats(null);
                setTeamStatsStatus({ errorMsg: 'An error occurred fetching stats for this team!', isLoaded: true });
            });
        axios.get('/api/teams/' + teamid + '/current-schedule/seasons/' + querySeasonId)
            .then((response) => {
                response.data[2] ? setTeamSchedule(response.data[2]) : setTeamSchedule([]);
                setTeamScheduleStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setTeamSchedule(null);
                setTeamScheduleStatus({ errorMsg: 'An error occurred fetching the schedule for this team!', isLoaded: true });
            });
        axios.get('/api/teams/' + teamid + '/players/seasons/' + querySeasonId)
            .then((response) => {
                setTeamPlayers(response.data);
                setTeamPlayersStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setTeamPlayers(null);
                setTeamPlayersStatus({ errorMsg: 'An error occurred fetching players for this team!', isLoaded: true });
            });
        axios.get('/api/teams/' + teamid + '/results/seasons/' + querySeasonId)
            .then((response) => {
                response.data[2] ? setTeamResults(response.data[2]) : setTeamResults([]);
                setTeamResultsStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setTeamResults(null);
                setTeamResultsStatus({ errorMsg: 'An error occurred fetching the schedule for this team!', isLoaded: true });
            });
    }, [teamid, querySeasonId]);

    return (
        <Fragment>
            <PageHeading text="Team Stats" />
            {teamNameStoreStatus.isLoaded && teamNameStore &&
                <div className="mb-3 bigger">
                    {teamNameStore.store_name} <span className="mx-2">|</span> <span className="text-danger">Team: </span>{teamNameStore.team_name}
                </div>
            }
            {teamSeasonsStatus.isLoaded && teamSeasons && teamSeasons.length > 0 &&
                <SeasonDropdown currentSeason={seasonName} buttonText="View Stats From:" listItems={teamSeasons} handleSeasonId={handleSeasonId} />
            }
            <div className="row mb-4">
                <div className="col-sm-6">
                    <div className="d-flex justify-content-center">
                        <div className="min-w-50 mx-auto">
                            {!teamPlayersStatus.isLoaded
                                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                                : teamPlayers && teamPlayers.length > 0
                                    ? <Fragment>
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
                                                {teamPlayers.map((player) => (
                                                    <tr key={player.player_id}>
                                                        <td><a href={'/players/' + player.player_id}>{player.full_name}</a></td>
                                                        <td className="text-center">{player.games_played}</td>
                                                        <td className="text-center">{Number(player.avg_score).toFixed(1)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </Fragment>
                                    : teamPlayers
                                        ? <span className="empty-result">There are no players on this team in the selected season!</span>
                                        : <span className="empty-result">{teamPlayersStatus.errorMsg}</span>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="d-flex justify-content-center">
                        <div className="min-w-50 mx-auto">
                            {!teamStatsStatus.isLoaded
                                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                                : teamStats && teamStats.length > 0
                                    ? <Fragment>
                                        <h5 className="text-center">Detailed Breakdown</h5>
                                        <StatsBlock stats={teamStats} />
                                    </Fragment>
                                    : teamStats
                                        ? <span className="empty-result">There are no team stats for the selected season!</span>
                                        : <span className="empty-result">{teamStatsStatus.errorMsg}</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mb-4">
                <div className="min-w-50 mx-auto">
                    {!teamScheduleStatus.isLoaded
                        ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                        : teamSchedule && teamSchedule.length > 0
                            ? <Fragment>
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
                            </Fragment>
                            : teamSchedule
                                ? <span className="empty-result">There is no schedule for this team in the selected season!</span>
                                : <span className="empty-result">{teamScheduleStatus.errorMsg}</span>
                    }
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="min-w-50 mx-auto">
                    {!teamResultsStatus.isLoaded
                        ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                        : teamResults && teamResults.length > 0
                            ? <Fragment>
                                <h5 className="text-center">Weekly Results</h5>
                                <ResultsDiv results={teamResults} />
                            </Fragment>
                            : teamResults
                                ? <span className="empty-result">There are no results for this team in the selected season!</span>
                                : <span className="empty-result">{teamResultsStatus.errorMsg}</span>
                    }
                </div>
            </div>
        </Fragment >
    );
}

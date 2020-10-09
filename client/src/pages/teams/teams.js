import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SettingsContext from '../../context/settingsContext';
import SeasonDropdown from '../../components/seasonDropdown/seasonDropdown';
import ResultsDiv from '../../components/resultsDiv/resultsDiv';
import PageHeading from '../../components/pageHeading/pageHeading';
import StatsBlock from '../../components/statsBlock/statsBlock';
import Loading from '../../components/loading/loading';

export default function Teams() {
    const { current_season_id: currentSeasonId } = useContext(SettingsContext);

    const [seasonId, setSeasonId] = useState(null);
    const querySeasonId = seasonId || currentSeasonId;

    const { teamid } = useParams();

    const [seasonName, setSeasonName] = useState(null);

    const [teamNameStores, setTeamNameStores] = useState({
        data: null,
        status: {
            errorMsg: undefined,
            isLoaded: false,
        },
    });

    const [currentViewStores, setCurrentViewStores] = useState({
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

    const [teamStats, setTeamStats] = useState({
        data: null,
        status: {
            errorMsg: undefined,
            isLoaded: false,
        },
    });

    const [teamSchedule, setTeamSchedule] = useState({
        data: null,
        status: {
            errorMsg: undefined,
            isLoaded: false,
        },
    });

    const [teamPlayers, setTeamPlayers] = useState({
        data: null,
        status: {
            errorMsg: undefined,
            isLoaded: false,
        },
    });

    const [teamResults, setTeamResults] = useState({
        data: null,
        status: {
            errorMsg: undefined,
            isLoaded: false,
        },
    });

    const handleSeasonId = season => setSeasonId(season);

    useEffect(() => {
        axios.get('/api/teams/' + teamid + '/store-name')
            .then((response) => {
                const data = response.data[0] || [];
                setTeamNameStores({
                    data: data,
                    status: {
                        errorMsg: undefined,
                        isLoaded: true,
                    },
                });
            })
            .catch((error) => {
                console.log(error);
                setTeamNameStores({
                    data: null,
                    status: {
                        errorMsg: 'An error occurred fetching info for this team!',
                        isLoaded: true,
                    },
                });
            });
        axios.get('/api/teams/' + teamid + '/seasons-list')
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
                        errorMsg: 'An error occurred fetching the season list for this team!',
                        isLoaded: true,
                    },
                });
            });
    }, [teamid]);

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
            axios.get('/api/teams/' + teamid + '/current-stores/season/' + querySeasonId)
                .then((response) => {
                    const data = response.data[0] ? { stores: response.data[0].stores } : null;
                    setCurrentViewStores({
                        data: data,
                        status: {
                            errorMsg: undefined,
                            isLoaded: true,
                        },
                    });
                })
                .catch((error) => {
                    console.log(error);
                    setCurrentViewStores({
                        data: null,
                        status: {
                            errorMsg: 'An error occurred fetching the current view store info!',
                            isLoaded: true,
                        },
                    });
                });
            axios.get('/api/teams/' + teamid + '/seasons/' + querySeasonId)
                .then((response) => {
                    let data = [];
                    if (response.data[2][0]) {
                        data = [
                            { text: 'Record:', data: response.data[2][0].wins + '-' + response.data[2][0].losses + '-' + response.data[2][0].ties },
                            { text: 'Total Points:', data: response.data[2][0].total_points },
                            { text: '1-Game Low:', data: response.data[2][0].one_game_low },
                            { text: '1-Game Avg:', data: Number(response.data[2][0].one_game_avg).toFixed(1) },
                            { text: '1-Game High:', data: response.data[2][0].one_game_high },
                            { text: '10-Game Low:', data: response.data[2][0].ten_game_low },
                            { text: '10-Game Avg:', data: Number(response.data[2][0].ten_game_avg).toFixed(1) },
                            { text: '10-Game High:', data: response.data[2][0].ten_game_high },
                        ];
                    }
                    setTeamStats({
                        data: data,
                        status: {
                            errorMsg: undefined,
                            isLoaded: true,
                        },
                    });
                })
                .catch((error) => {
                    console.log(error);
                    setTeamStats({
                        data: null,
                        status: {
                            errorMsg: 'An error occurred fetching stats for this team!',
                            isLoaded: true,
                        },
                    });
                });
            axios.get('/api/teams/' + teamid + '/current-schedule/seasons/' + querySeasonId)
                .then((response) => {
                    const data = response.data[2] || [];
                    setTeamSchedule({
                        data: data,
                        status: {
                            errorMsg: undefined,
                            isLoaded: true,
                        },
                    });
                })
                .catch((error) => {
                    console.log(error);
                    setTeamSchedule({
                        data: null,
                        status: {
                            errorMsg: 'An error occurred fetching the schedule for this team!',
                            isLoaded: true,
                        },
                    });
                });
            axios.get('/api/teams/' + teamid + '/players/seasons/' + querySeasonId)
                .then((response) => {
                    setTeamPlayers({
                        data: response.data,
                        status: {
                            errorMsg: undefined,
                            isLoaded: true,
                        },
                    });
                })
                .catch((error) => {
                    console.log(error);
                    setTeamPlayers({
                        data: null,
                        status: {
                            errorMsg: 'An error occurred fetching players for this team!',
                            isLoaded: true,
                        },
                    });
                });
            axios.get('/api/teams/' + teamid + '/results/seasons/' + querySeasonId)
                .then((response) => {
                    setTeamResults({
                        data: response.data,
                        status: {
                            errorMsg: undefined,
                            isLoaded: true,
                        },
                    });
                })
                .catch((error) => {
                    console.log(error);
                    setTeamResults({
                        data: null,
                        status: {
                            errorMsg: 'An error occurred fetching results for this team!',
                            isLoaded: true,
                        },
                    });
                });
        }
    }, [teamid, querySeasonId]);

    return (
        <Fragment>
            <PageHeading text="Team Stats" />
            <div className="row mb-4">
                <div className="col-6 text-left p-2">
                    {teamNameStores.status.isLoaded && teamNameStores.data &&
                        <div className="mb-3 ">
                            <div className="bigger font-weight-bolder"><span className="text-danger">Team: </span>{teamNameStores.data.team_name}</div>
                            <div><span className="small">Career Store(s):</span> {teamNameStores.data.cities}</div>
                            {currentViewStores.status.isLoaded && currentViewStores.data.stores &&
                                <div><span className="small">Current View:</span> <span className="font-weight-bolder">{currentViewStores.data.stores}</span></div>
                            }
                        </div>
                    }
                </div>
                <div className="col-6 text-right p-2">
                    {seasons.status.isLoaded && seasons.data && seasons.data.length > 0 &&
                        <SeasonDropdown currentSeason={seasonName} buttonText="View Stats From" listItems={seasons.data} handleSeasonId={handleSeasonId} />
                    }
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-sm-6">
                    <div className="d-flex justify-content-center">
                        <div className="min-w-50 mx-auto">
                            {!teamPlayers.status.isLoaded
                                ? <loading />
                                : teamPlayers.data && teamPlayers.data.length > 0
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
                                                {teamPlayers.data.map((player) => (
                                                    <tr key={player.player_id}>
                                                        <td><a href={'/players/' + player.player_id}>{player.full_name}</a></td>
                                                        <td className="text-center">{player.games_played}</td>
                                                        <td className="text-center">{Number(player.avg_score).toFixed(1)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </Fragment>
                                    : teamPlayers.data
                                        ? <span className="empty-result">There are no players on this team in the selected season!</span>
                                        : <span className="empty-result">{teamPlayers.status.errorMsg}</span>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="d-flex justify-content-center">
                        <div className="min-w-50 mx-auto">
                            {!teamStats.status.isLoaded
                                ? <loading />
                                : teamStats.data && teamStats.data.length > 0
                                    ? <Fragment>
                                        <h5 className="text-center">Detailed Breakdown</h5>
                                        <StatsBlock stats={teamStats.data} />
                                    </Fragment>
                                    : teamStats.data
                                        ? <span className="empty-result">There are no team stats for the selected season!</span>
                                        : <span className="empty-result">{teamStats.status.errorMsg}</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mb-4">
                <div className="min-w-50 mx-auto">
                    {!teamSchedule.status.isLoaded
                        ? <Loading />
                        : teamSchedule.data && teamSchedule.data.length > 0
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
                                        {teamSchedule.data.map((schedule) => (
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
                            : teamSchedule.data
                                ? <span className="empty-result">There is no schedule for this team in the selected season!</span>
                                : <span className="empty-result">{teamSchedule.status.errorMsg}</span>
                    }
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="min-w-50 mx-auto">
                    {!teamResults.status.isLoaded
                        ? <loading />
                        : teamResults.data && teamResults.data.length > 0
                            ? <Fragment>
                                <h5 className="text-center">Weekly Results</h5>
                                <ResultsDiv results={teamResults.data} />
                            </Fragment>
                            : teamResults.data
                                ? <span className="empty-result">There are no results for this team in the selected season!</span>
                                : <span className="empty-result">{teamResults.status.errorMsg}</span>
                    }
                </div>
            </div>
        </Fragment >
    );
}

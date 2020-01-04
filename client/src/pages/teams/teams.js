import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CurrentSeasonContext from '../../components/currentSeasonContext';
import Dropdown from '../../components/dropdown/dropdown';

export default function Teams() {
    const currentSeasonId = useContext(CurrentSeasonContext);
    const { seasonid } = useParams();
    const querySeasonId = seasonid || currentSeasonId;

    const { teamid } = useParams();
    const queryTeamId = teamid || 0;

    const [teamStoreNames, setTeamStoreNames] = useState({});
    const [teamSeasons, setTeamSeasons] = useState({});
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

    const [teamStats, setTeamStats] = useState({});
    const [teamSchedule, setTeamSchedule] = useState({});
    const [playersTeam, setPlayersTeam] = useState({});
    useEffect(() => {
        axios.get('/api/teams/' + queryTeamId + '/seasons/' + querySeasonId)
            .then((response) => {
                setTeamStats(response.data[2][0]);
            })
            .catch((err) => {
                console.log(err);
            });
        axios.get('/api/teams/' + queryTeamId + '/schedules/seasons/' + querySeasonId)
            .then((response) => {
                setTeamSchedule(response.data[2][0]);
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
            {teamStats &&
                <div>
                    Wins: {teamStats.wins}<br />
                    Losses: {teamStats.losses}<br />
                    Ties: {teamStats.ties}<br />
                </div>
            }
        </div>
    );
}

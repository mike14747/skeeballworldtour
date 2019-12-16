import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CurrentSeasonContext from '../components/currentSeasonContext';

export default function Team() {
    const currentSeasonId = useContext(CurrentSeasonContext);
    const { seasonid } = useParams();
    const querySeasonId = seasonid || currentSeasonId;

    const { teamid } = useParams();
    const queryTeamId = teamid || 0;

    const [teamStats, setTeamStats] = useState({});
    useEffect(() => {
        axios.get('/api/teams/' + queryTeamId + '/seasons/' + querySeasonId)
            .then((response) => {
                setTeamStats(response.data[2][0]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [querySeasonId]);

    return (
        <div>
            Season ID: {currentSeasonId}<br />
            Team ID: {teamid}<br />
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

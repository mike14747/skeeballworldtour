import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

export default function Team() {
    const [currentSeasonId, setCurrentSeasonId] = useState(0);
    useEffect(() => {
        axios.get('/api/settings/current-season')
            .then((response) => {
                setCurrentSeasonId(response.data[0].current_season_id);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const { seasonid } = useParams();
    const querySeasonId = seasonid || currentSeasonId;

    const { teamid } = useParams();
    const queryTeamId = teamid || 0;
    useEffect(() => {
        axios.get('/api/teams/' + queryTeamId + 'seasons/' + querySeasonId)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [queryTeamId, querySeasonId]);
    return (
        <div>
            Season ID: {currentSeasonId}<br />
            Team ID: {teamid}
        </div>
    );
}

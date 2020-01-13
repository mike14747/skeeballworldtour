import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import PageHeading from '../../components/pageHeading/pageHeading';

export default function Search() {
    const { searchstring } = useParams();
    const [playerArray, setPlayerArray] = useState([]);
    const [teamArray, setTeamArray] = useState([]);
    useEffect(() => {
        axios.get('/api/searches/players/' + searchstring)
            .then((response) => {
                setPlayerArray(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios.get('/api/searches/teams/' + searchstring)
            .then((response) => {
                setTeamArray(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [searchstring]);

    return (
        <Fragment>
            <PageHeading text="Search Results" />
            <p className="text-center"><b>Search Results for:</b> {searchstring}</p>
            <div className="row">
                <div className="col-6">
                    <p className="text-success"><b>Player Matches:</b> {playerArray.length}</p>
                    {playerArray.map(player => (
                        <p key={player.player_id}><a href={'/players/' + player.player_id}>{player.full_name}</a></p>
                    ))}
                </div>
                <div className="col-6">
                    <p className="text-success"><b>Team Matches:</b> {teamArray.length}</p>
                    {teamArray.map(team => (
                        <p key={team.team_id}><a href={'/teams/' + team.team_id}>{team.team_name}</a></p>
                    ))}
                </div>
            </div>
        </Fragment>
    );
}

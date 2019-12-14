import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router';
import SettingsContext from '../components/settingsContext';

export default function Team() {
    const curSeasonId = useContext(SettingsContext);
    // useEffect(() => {
    //     setSeasonId(curSeasonId);
    // }, [curSeasonId]);

    // const [seasonId, setSeasonId] = useState(curSeasonId);

    const { id } = useParams();
    console.log(useParams());
    return (
        <div>
            Season ID: {curSeasonId}<br />
            Team ID: {id}
        </div >
    );
}

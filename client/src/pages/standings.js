import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SettingsContext from '../components/settingsContext';

export default function Standings() {
    const curSeasonId = useContext(SettingsContext);
    useEffect(() => {
        setSeasonId(curSeasonId);
    }, [curSeasonId]);

    const [seasonId, setSeasonId] = useState(curSeasonId);
    const [standingsArr, setStandingsArr] = useState([]);

    function groupStandings(standings) {
        const standingsArray = [];
        let curStoreDivision = 0;
        let index = -1;
        standings.forEach(standing => {
            if (index === -1 || curStoreDivision !== standing.store_division) {
                standingsArray.push([]);
                index++;
                curStoreDivision = standing.store_division;
            }
            standingsArray[index].push(standing);
        });
        setStandingsArr(standingsArray);
    }

    useEffect(() => {
        axios.get('/api/standings/' + seasonId)
            .then((response) => {
                groupStandings(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [seasonId]);

    return (
        <div>
            {standingsArr.map((storeDiv, i) => (
                <div key={i}>
                    <h5>{storeDiv[0].store_city} - {storeDiv[0].day_name}</h5>
                    <table className="table table-bordered mb-5 text-center">
                        <thead>
                            <tr className="bg-light">
                                <th className="text-left">TEAM</th>
                                <th>W</th>
                                <th>L</th>
                                <th>T</th>
                                <th>TOTAL POINTS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {standingsArr[i].map((standing) => (
                                <tr key={standing.standings_id}>
                                    <td className="text-left"><Link to={'./team/' + standing.team_id}>{standing.team_name}</Link></td>
                                    <td>{standing.wins}</td>
                                    <td>{standing.losses}</td>
                                    <td>{standing.ties}</td>
                                    <td>{standing.total_points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div >
    );
}

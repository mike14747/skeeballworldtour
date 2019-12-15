import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

export default function Standings() {
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

    const [standingsArr, setStandingsArr] = useState([]);
    useEffect(() => {
        axios.get('/api/standings/' + querySeasonId)
            .then((response) => {
                groupStandings(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [querySeasonId]);

    return (
        <div>
            <h2 className="text-center">Standings</h2>
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
                                    <td className="text-left"><a href={'teams/' + standing.team_id}>{standing.team_name}</a></td>
                                    {/* <td className="text-left"><Link to={'/teams/' + standing.team_id}>{standing.team_name}</Link></td> */}
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
        </div>
    );
}

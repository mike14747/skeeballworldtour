import React, { useState, useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import CurrentSeasonContext from '../../components/currentSeasonContext';
import PageHeading from '../../components/pageHeading/pageHeading';
import SeasonDropdown from '../../components/seasonDropdown/seasonDropdown';

export default function Standings() {
    const [seasonId, setSeasonId] = useState(null);
    const currentSeasonId = useContext(CurrentSeasonContext);
    const querySeasonId = seasonId || currentSeasonId;
    const [standingsArr, setStandingsArr] = useState([]);

    const handleSeasonId = season => {
        setSeasonId(season);
    };

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

    // add a useEffect to get all seasons that have results

    useEffect(() => {
        axios.get('/api/standings/' + querySeasonId)
            .then((response) => groupStandings(response.data))
            .catch((err) => console.log(err));
    }, [querySeasonId]);

    return (
        <Fragment>
            <PageHeading text="Standings" />
            {/* add a seasonsDropdown component here once the api call is finished */}
            {/* <SeasonDropdown buttonText="View Standings From:" listItems={standingsSeasons} handleSeasonId={handleSeasonId} /> */}
            {standingsArr.map((storeDiv, i) => (
                <div key={i}>
                    <h5 className="text-center">{storeDiv[0].store_city} - {storeDiv[0].day_name}</h5>
                    <div className="d-flex justify-content-center mb-4">
                        <div className="min-w-50 mx-auto">
                            <table className="table table-bordered mb-4 text-center">
                                <thead>
                                    <tr className="bg-gray6">
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
                                            <td className="text-left"><a href={'/teams/' + standing.team_id}>{standing.team_name}</a></td>
                                            <td>{standing.wins}</td>
                                            <td>{standing.losses}</td>
                                            <td>{standing.ties}</td>
                                            <td>{standing.total_points}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ))}
        </Fragment>
    );
}

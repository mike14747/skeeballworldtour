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
    const [areStandingsLoaded, setAreStandingsLoaded] = useState(false);
    const [standingSeasons, setStandingSeasons] = useState([]);

    const handleSeasonId = season => setSeasonId(season);

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
        setAreStandingsLoaded(true);
    }

    useEffect(() => {
        axios.get('/api/standings/seasons-list')
            .then((response) => {
                const seasonArray = response.data.map((season) => {
                    return {
                        season_id: season.season_id,
                        text: season.season_name + ' - ' + season.year,
                    };
                });
                setStandingSeasons(seasonArray);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        setAreStandingsLoaded(false);
        axios.get('/api/standings/season/' + querySeasonId)
            .then(response => groupStandings(response.data))
            .catch(err => console.log(err));
    }, [querySeasonId]);

    return (
        <Fragment>
            <PageHeading text="Standings" />
            {!areStandingsLoaded
                ? <img src={'/images/loading.gif'} alt={'Loading'} />
                : standingsArr.length > 0
                    ? <Fragment>
                        <SeasonDropdown buttonText="View Standings From:" listItems={standingSeasons} handleSeasonId={handleSeasonId} />
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
                    : <span className="empty-result">There are no standings for this season!</span>
            }
        </Fragment>
    );
}

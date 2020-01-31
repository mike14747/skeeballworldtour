import React, { useState, useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import CurrentSeasonContext from '../../components/currentSeasonContext';
import PageHeading from '../../components/pageHeading/pageHeading';
import SeasonDropdown from '../../components/seasonDropdown/seasonDropdown';

export default function Standings() {
    const [seasonId, setSeasonId] = useState(null);
    const currentSeasonId = useContext(CurrentSeasonContext);
    const querySeasonId = seasonId || currentSeasonId;

    const [seasonName, setSeasonName] = useState(null);

    const [standingsArr, setStandingsArr] = useState();
    const [standingsArrStatus, setStandingsArrStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [standingsSeasons, setStandingsSeasons] = useState(null);
    const [standingsSeasonsStatus, setStandingsSeasonsStatus] = useState({ errorMsg: undefined, isLoaded: false });

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
        setStandingsArrStatus({ errorMsg: undefined, isLoaded: true });
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
                setStandingsSeasons(seasonArray);
                setStandingsSeasonsStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setStandingsSeasons(null);
                setStandingsSeasonsStatus({ errorMsg: 'An error occurred fetching the standings!', isLoaded: true });
            });
    }, []);

    useEffect(() => {
        axios.get('/api/seasons/' + querySeasonId + '/name')
            .then((response) => {
                response.data[0] ? setSeasonName({ season_id: querySeasonId, season_name: response.data[0].season_name, season_year: response.data[0].year }) : setSeasonName(null);
            })
            .catch((error) => {
                console.log(error);
                setSeasonName(null);
            });
        axios.get('/api/standings/season/' + querySeasonId)
            .then(response => groupStandings(response.data))
            .catch((error) => {
                console.log(error);
                setStandingsArr(null);
                setStandingsArrStatus({ errorMsg: 'An error occurred fetching the standings!', isLoaded: true });
            });
    }, [querySeasonId]);

    return (
        <Fragment>
            <PageHeading text="Standings" />
            {standingsSeasonsStatus.isLoaded && standingsSeasons && standingsSeasons.length > 0 &&
                <SeasonDropdown currentSeason={seasonName} buttonText="View Standings From:" listItems={standingsSeasons} handleSeasonId={handleSeasonId} />
            }
            {!standingsArrStatus.isLoaded
                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                : standingsArr && standingsArr.length > 0
                    ? <Fragment>
                        {standingsArr.map((storeDiv, index) => (
                            <div key={index}>
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
                                                {standingsArr[index].map((standing) => (
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
                    : standingsArr
                        ? <span className="empty-result">There are no standings for this season!</span>
                        : <span className="empty-result">{standingsArrStatus.errorMsg}</span>
            }
        </Fragment>
    );
}

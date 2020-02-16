import React, { useState, useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import CurrentSeasonContext from '../../components/currentSeasonContext';
import PageHeading from '../../components/pageHeading/pageHeading';
import SeasonDropdown from '../../components/seasonDropdown/seasonDropdown';
import LeadersTable from '../../components/leadersTable/leadersTable';

const Leaders = () => {
    const [seasonId, setSeasonId] = useState(null);
    const currentSeasonId = useContext(CurrentSeasonContext);
    const querySeasonId = seasonId || currentSeasonId;

    const [seasonName, setSeasonName] = useState(null);

    const [indAvgLeaders, setIndAvgLeaders] = useState(null);
    const [indAvgLeadersStatus, setIndAvgLeadersStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [indOneGameLeaders, setIndOneGameLeaders] = useState(null);
    const [indOneGameLeadersStatus, setIndOneGameLeadersStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [indTenGameLeaders, setIndTenGameLeaders] = useState(null);
    const [indTenGameLeadersStatus, setIndTenGameLeadersStatus] = useState({ errorMsg: undefined, isLoaded: false });

    // const [teamAvgLeaders, setTeamAvgLeaders] = useState(null);
    // const [teamAvgLeadersStatus, setTeamAvgLeadersStatus] = useState({ errorMsg: undefined, isLoaded: false });

    // const [teamOneGameLeaders, setTeamOneGameLeaders] = useState(null);
    // const [teamOneGameLeadersStatus, setTeamOneGameLeadersStatus] = useState({ errorMsg: undefined, isLoaded: false });

    // const [teamTenGameLeaders, setTeamTenGameLeaders] = useState(null);
    // const [teamTenGameLeadersStatus, setTeamTenGameLeadersStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [leadersSeasons, setLeadersSeasons] = useState(null);
    const [leadersSeasonsStatus, setLeadersSeasonsStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const handleSeasonId = season => setSeasonId(season);

    function rankLeaders(leaders) {
        let rank = 0;
        let lastData = 0;
        const newLeaders = leaders.map((leader, index) => {
            (leader.data !== lastData) && (rank = index + 1);
            leader.key = `${leader.player_id}${index}`;
            leader.rank = rank;
            lastData = leader.data;
            return leader;
        });
        return newLeaders;
    }

    useEffect(() => {
        axios.get('/api/leaders/seasons-list')
            .then((response) => {
                const seasonArray = response.data.map((season) => {
                    return {
                        season_id: season.season_id,
                        text: season.season_name + ' - ' + season.year,
                    };
                });
                setLeadersSeasons(seasonArray);
                setLeadersSeasonsStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setLeadersSeasons(null);
                setLeadersSeasonsStatus({ errorMsg: 'An error occurred fetching leaders seasons!', isLoaded: true });
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
        // axios.get('api/leaders/individual/average/' + querySeasonId + '/' + 20)
        //     .then((response) => {
        //         setIndAvgLeaders({
        //             numAtTieValue: response.data[0][0].num_at_tie_value,
        //             tieValue: response.data[0][0].tie_value,
        //             leaders: rankLeaders(response.data[1]),
        //         });
        //         setIndAvgLeadersStatus({ errorMsg: undefined, isLoaded: true });
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         setIndAvgLeaders(null);
        //         setIndAvgLeadersStatus({ errorMsg: 'An error occurred fetching individual best average leaders!', isLoaded: true });
        //     });
        axios.get('api/leaders/individual/one-game/' + querySeasonId + '/' + 20)
            .then((response) => {
                setIndOneGameLeaders({
                    numAtTieValue: response.data[0][0].num_at_tie_value,
                    tieValue: response.data[0][0].tie_value,
                    leaders: rankLeaders(response.data[1]),
                });
                setIndOneGameLeadersStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setIndOneGameLeaders(null);
                setIndOneGameLeadersStatus({ errorMsg: 'An error occurred fetching individual one-game leaders!', isLoaded: true });
            });
        axios.get('api/leaders/individual/ten-game/' + querySeasonId + '/' + 20)
            .then((response) => {
                setIndTenGameLeaders({
                    numAtTieValue: response.data[0][0].num_at_tie_value,
                    tieValue: response.data[0][0].tie_value,
                    leaders: rankLeaders(response.data[1]),
                });
                setIndTenGameLeadersStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setIndTenGameLeaders(null);
                setIndTenGameLeadersStatus({ errorMsg: 'An error occurred fetching individual ten-game leaders!', isLoaded: true });
            });
    }, [querySeasonId]);

    return (
        <Fragment>
            <PageHeading text="League Leaders" />
            {leadersSeasonsStatus.isLoaded && leadersSeasons && leadersSeasons.length > 0 &&
                <SeasonDropdown currentSeason={seasonName} buttonText="View Leaders From:" listItems={leadersSeasons} handleSeasonId={handleSeasonId} />
            }
            <div className="row mb-4">
                <div className="col-sm-6">
                    <div className="d-flex justify-content-center">
                        <div className="min-w-50 mx-auto">
                            <h3 className="text-center mb-4">Individual Leaders</h3>
                            {/* {!indAvgLeadersStatus.isLoaded
                                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                                : indAvgLeaders && indAvgLeaders.length > 0
                                    ? <LeadersTable heading="Best Average/Game" columnName="Average" format="decimal" href="/players/" leaders={indAvgLeaders} />
                                    : indAvgLeaders
                                        ? <span className="empty-result">There are no player results for this season!</span>
                                        : <span className="empty-result">{indAvgLeadersStatus.errorMsg}</span>
                            } */}
                            {!indOneGameLeadersStatus.isLoaded
                                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                                : indOneGameLeaders.leaders && indOneGameLeaders.leaders.length > 0
                                    ? <LeadersTable heading="Best One-Game" columnName="Score" format="integer" href="/players/" leadersObj={indOneGameLeaders} />
                                    : indOneGameLeaders.leaders
                                        ? <span className="empty-result">There are no individual one-game leaders for this season!</span>
                                        : <span className="empty-result">{indOneGameLeadersStatus.errorMsg}</span>
                            }
                            {!indTenGameLeadersStatus.isLoaded
                                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                                : indTenGameLeaders.leaders && indTenGameLeaders.leaders.length > 0
                                    ? <LeadersTable heading="Best Ten-Game Series" columnName="Points" format="integer" href="/players/" leadersObj={indTenGameLeaders} />
                                    : indTenGameLeaders.leaders
                                        ? <span className="empty-result">There are no individual ten-game leaders for this season!</span>
                                        : <span className="empty-result">{indTenGameLeadersStatus.errorMsg}</span>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="d-flex justify-content-center">
                        <div className="min-w-50 mx-auto">
                            <h3 className="text-center mb-4">Team Leaders</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Leaders;

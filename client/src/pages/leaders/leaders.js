import React, { useState, useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import SettingsContext from '../../context/settingsContext';
import PageHeading from '../../components/pageHeading/pageHeading';
import SeasonDropdown from '../../components/seasonDropdown/seasonDropdown';
import LeadersTable from '../../components/leadersTable/leadersTable';
import NumLeadersDropdown from '../../components/numLeadersDropdown/numLeadersDropdown';
import Loading from '../../components/loading/loading';

const Leaders = () => {
    const { current_season_id: currentSeasonId, num_leaders: defaultNumLeaders } = useContext(SettingsContext);

    const [seasonId, setSeasonId] = useState(null);
    const querySeasonId = seasonId || currentSeasonId;

    const [seasonName, setSeasonName] = useState(null);

    const [numLeaders, setNumLeaders] = useState(null);
    const queryNumLeaders = numLeaders || defaultNumLeaders;
    const numLeadersArray = [10, 20, 50, 100];

    const [indAvgLeaders, setIndAvgLeaders] = useState({
        data: null,
        status: {
            errorMsg: undefined,
            isLoaded: false,
        },
    });

    const [indOneGameLeaders, setIndOneGameLeaders] = useState({
        data: null,
        status: {
            errorMsg: undefined,
            isLoaded: false,
        },
    });

    const [indTenGameLeaders, setIndTenGameLeaders] = useState({
        data: null,
        status: {
            errorMsg: undefined,
            isLoaded: false,
        },
    });

    const [teamAvgLeaders, setTeamAvgLeaders] = useState({
        data: null,
        status: {
            errorMsg: undefined,
            isLoaded: false,
        },
    });

    const [teamOneGameLeaders, setTeamOneGameLeaders] = useState({
        data: null,
        status: {
            errorMsg: undefined,
            isLoaded: false,
        },
    });

    const [teamTenGameLeaders, setTeamTenGameLeaders] = useState({
        data: null,
        status: {
            errorMsg: undefined,
            isLoaded: false,
        },
    });

    const [seasons, setSeasons] = useState({
        data: null,
        status: {
            errorMsg: undefined,
            isLoaded: false,
        },
    });

    const handleSeasonId = season => setSeasonId(season);

    useEffect(() => {
        axios.get('/api/leaders/seasons-list')
            .then((response) => {
                const seasonArray = response.data.map((season) => {
                    return {
                        season_id: season.season_id,
                        text: season.season_name + ' - ' + season.year,
                    };
                });
                setSeasons({
                    data: seasonArray,
                    status: {
                        errorMsg: undefined,
                        isLoaded: true,
                    },
                });
            })
            .catch((error) => {
                console.log(error);
                setSeasons({
                    data: null,
                    status: {
                        errorMsg: 'An error occurred fetching the leaders season list!',
                        isLoaded: true,
                    },
                });
            });
    }, []);

    useEffect(() => {
        if (querySeasonId) {
            axios.get('/api/seasons/' + querySeasonId + '/name')
                .then((response) => {
                    response.data[0] ? setSeasonName({ season_id: querySeasonId, season_name: response.data[0].season_name, season_year: response.data[0].year }) : setSeasonName(null);
                })
                .catch((error) => {
                    console.log(error);
                    setSeasonName(null);
                });
            axios.get('/api/leaders/individual/average/num-leaders/' + queryNumLeaders + '/season/' + querySeasonId)
                .then((response) => {
                    setIndAvgLeaders({
                        data: response.data,
                        status: {
                            errorMsg: undefined,
                            isLoaded: true,
                        },
                    });
                })
                .catch((error) => {
                    console.log(error);
                    setIndAvgLeaders({
                        data: null,
                        status: {
                            errorMsg: 'An error occurred fetching player best average leaders!',
                            isLoaded: true,
                        },
                    });
                });
            axios.get('/api/leaders/individual/one-game/num-leaders/' + queryNumLeaders + '/season/' + querySeasonId)
                .then((response) => {
                    setIndOneGameLeaders({
                        data: response.data,
                        status: {
                            errorMsg: undefined,
                            isLoaded: true,
                        },
                    });
                })
                .catch((error) => {
                    console.log(error);
                    setIndOneGameLeaders({
                        data: null,
                        status: {
                            errorMsg: 'An error occurred fetching player 1-game leaders!',
                            isLoaded: true,
                        },
                    });
                });
            axios.get('/api/leaders/individual/ten-game/num-leaders/' + queryNumLeaders + '/season/' + querySeasonId)
                .then((response) => {
                    setIndTenGameLeaders({
                        data: response.data,
                        status: {
                            errorMsg: undefined,
                            isLoaded: true,
                        },
                    });
                })
                .catch((error) => {
                    console.log(error);
                    setIndTenGameLeaders({
                        data: null,
                        status: {
                            errorMsg: 'An error occurred fetching player 10-game leaders!',
                            isLoaded: true,
                        },
                    });
                });
            axios.get('/api/leaders/team/average/num-leaders/' + queryNumLeaders + '/season/' + querySeasonId)
                .then((response) => {
                    setTeamAvgLeaders({
                        data: response.data,
                        status: {
                            errorMsg: undefined,
                            isLoaded: true,
                        },
                    });
                })
                .catch((error) => {
                    console.log(error);
                    setTeamAvgLeaders({
                        data: null,
                        status: {
                            errorMsg: 'An error occurred fetching team best average leaders!',
                            isLoaded: true,
                        },
                    });
                });
            axios.get('/api/leaders/team/one-game/num-leaders/' + queryNumLeaders + '/season/' + querySeasonId)
                .then((response) => {
                    setTeamOneGameLeaders({
                        data: response.data,
                        status: {
                            errorMsg: undefined,
                            isLoaded: true,
                        },
                    });
                })
                .catch((error) => {
                    console.log(error);
                    setTeamOneGameLeaders({
                        data: null,
                        status: {
                            errorMsg: 'An error occurred fetching team 1-game leaders!',
                            isLoaded: true,
                        },
                    });
                });
            axios.get('/api/leaders/team/ten-game/num-leaders/' + queryNumLeaders + '/season/' + querySeasonId)
                .then((response) => {
                    setTeamTenGameLeaders({
                        data: response.data,
                        status: {
                            errorMsg: undefined,
                            isLoaded: true,
                        },
                    });
                })
                .catch((error) => {
                    console.log(error);
                    setTeamTenGameLeaders({
                        data: null,
                        status: {
                            errorMsg: 'An error occurred fetching team 10-game leaders!',
                            isLoaded: true,
                        },
                    });
                });
        }
    }, [querySeasonId, queryNumLeaders]);

    return (
        <Fragment>
            <PageHeading text="League Leaders" />
            <div className="row mb-4">
                <div className="col-4 text-left p-2">
                    Filter by: (Store / Division)
                </div>
                <div className="col-4 text-center p-2">
                    {queryNumLeaders &&
                        <NumLeadersDropdown numLeaders={queryNumLeaders} numLeadersArray={numLeadersArray} setNumLeaders={setNumLeaders} />
                    }
                </div>
                <div className="col-4 text-right p-2">
                    {seasons.status.isLoaded && seasons.data && seasons.data.length > 0 &&
                        <SeasonDropdown currentSeason={seasonName} buttonText="View Leaders From" listItems={seasons.data} handleSeasonId={handleSeasonId} />
                    }
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="d-flex justify-content-center">
                        <div className="min-w-50 mx-auto">
                            <h3 className="text-center mb-4">Individual Leaders</h3>
                            {!indAvgLeaders.status.isLoaded
                                ? <Loading />
                                : indAvgLeaders.data.leaders && indAvgLeaders.data.numAtTieValue && (indAvgLeaders.data.leaders.length > 0 || indAvgLeaders.data.numAtTieValue > 1)
                                    ? <LeadersTable heading="Player, high season average / game" subHeading="(must play in a minimum of 50% of your team's games to qualify)" columnName="Player" columnData="Average" format="decimal" href="/players/" leadersObj={indAvgLeaders.data} />
                                    : indAvgLeaders.data.leaders
                                        ? <div className="empty-result">There are no player average leaders for this season!</div>
                                        : <div className="empty-result">{indAvgLeaders.status.errorMsg}</div>
                            }
                            {!indOneGameLeaders.status.isLoaded
                                ? <Loading />
                                : indOneGameLeaders.data.leaders && indOneGameLeaders.data.numAtTieValue && (indOneGameLeaders.data.leaders.length > 0 || indOneGameLeaders.data.numAtTieValue > 1)
                                    ? <LeadersTable heading="Player, 1-game high" columnName="Player" columnData="Score" format="integer" href="/players/" leadersObj={indOneGameLeaders.data} />
                                    : indOneGameLeaders.data.leaders
                                        ? <div className="empty-result">There are no player 1-game leaders for this season!</div>
                                        : <div className="empty-result">{indOneGameLeaders.status.errorMsg}</div>
                            }
                            {!indTenGameLeaders.status.isLoaded
                                ? <Loading />
                                : indTenGameLeaders.data.leaders && indTenGameLeaders.data.numAtTieValue && (indTenGameLeaders.data.leaders.length > 0 || indTenGameLeaders.data.numAtTieValue > 1)
                                    ? <LeadersTable heading="Player, 10-game high" columnName="Player" columnData="Score" format="integer" href="/players/" leadersObj={indTenGameLeaders.data} />
                                    : indTenGameLeaders.data.leaders
                                        ? <div className="empty-result">There are no player 10-game leaders for this season!</div>
                                        : <div className="empty-result">{indTenGameLeaders.status.errorMsg}</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="d-flex justify-content-center">
                        <div className="min-w-50 mx-auto">
                            <h3 className="text-center mb-4">Team Leaders</h3>
                            {!teamAvgLeaders.status.isLoaded
                                ? <Loading />
                                : teamAvgLeaders.data.leaders && teamAvgLeaders.data.numAtTieValue && (teamAvgLeaders.data.leaders.length > 0 || teamAvgLeaders.data.numAtTieValue > 1)
                                    ? <LeadersTable heading="Team, 10-game high average" columnName="Team" columnData="Average" format="decimal" href="/teams/" leadersObj={teamAvgLeaders.data} />
                                    : teamAvgLeaders.data.leaders
                                        ? <div className="empty-result">There are no team average leaders for this season!</div>
                                        : <div className="empty-result">{teamAvgLeaders.status.errorMsg}</div>
                            }
                            {!teamOneGameLeaders.status.isLoaded
                                ? <Loading />
                                : teamOneGameLeaders.data.leaders && teamOneGameLeaders.data.numAtTieValue && (teamOneGameLeaders.data.leaders.length > 0 || teamOneGameLeaders.data.numAtTieValue > 1)
                                    ? <LeadersTable heading="Team, 1-game high" columnName="Team" columnData="Score" format="integer" href="/teams/" leadersObj={teamOneGameLeaders.data} />
                                    : teamOneGameLeaders.data.leaders
                                        ? <div className="empty-result">There are no team 1-game leaders for this season!</div>
                                        : <div className="empty-result">{teamOneGameLeaders.status.errorMsg}</div>
                            }
                            {!teamTenGameLeaders.status.isLoaded
                                ? <Loading />
                                : teamTenGameLeaders.data.leaders && teamTenGameLeaders.data.numAtTieValue && (teamTenGameLeaders.data.leaders.length > 0 || teamTenGameLeaders.data.numAtTieValue > 1)
                                    ? <LeadersTable heading="Team, 10-game high" columnName="Team" columnData="Score" format="integer" href="/teams/" leadersObj={teamTenGameLeaders.data} />
                                    : teamTenGameLeaders.data.leaders
                                        ? <div className="empty-result">There are no team 10-game leaders for this season!</div>
                                        : <div className="empty-result">{teamTenGameLeaders.status.errorMsg}</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Leaders;

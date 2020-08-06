import React, { useState, useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import SettingsContext from '../../context/settingsContext';
import PageHeading from '../../components/pageHeading/pageHeading';
import SeasonDropdown from '../../components/seasonDropdown/seasonDropdown';
import LeadersTable from '../../components/leadersTable/leadersTable';
import NumLeadersDropdown from '../../components/numLeadersDropdown/numLeadersDropdown';

const Leaders = () => {
    const settings = useContext(SettingsContext);

    const [seasonId, setSeasonId] = useState(null);
    const currentSeasonId = settings.current_season_id;
    const querySeasonId = seasonId || currentSeasonId;

    const [seasonName, setSeasonName] = useState(null);

    const [numLeaders, setNumLeaders] = useState(null);
    const defaultNumLeaders = settings.num_leaders;
    const queryNumLeaders = numLeaders || defaultNumLeaders;
    const numLeadersArray = [10, 20, 50, 100];

    const [indAvgLeaders, setIndAvgLeaders] = useState(null);
    const [indAvgLeadersStatus, setIndAvgLeadersStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [indOneGameLeaders, setIndOneGameLeaders] = useState(null);
    const [indOneGameLeadersStatus, setIndOneGameLeadersStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [indTenGameLeaders, setIndTenGameLeaders] = useState(null);
    const [indTenGameLeadersStatus, setIndTenGameLeadersStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [teamAvgLeaders, setTeamAvgLeaders] = useState(null);
    const [teamAvgLeadersStatus, setTeamAvgLeadersStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [teamOneGameLeaders, setTeamOneGameLeaders] = useState(null);
    const [teamOneGameLeadersStatus, setTeamOneGameLeadersStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [teamTenGameLeaders, setTeamTenGameLeaders] = useState(null);
    const [teamTenGameLeadersStatus, setTeamTenGameLeadersStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [leadersSeasons, setLeadersSeasons] = useState(null);
    const [leadersSeasonsStatus, setLeadersSeasonsStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const handleSeasonId = season => setSeasonId(season);

    useEffect(() => {
        axios.get('//api/leaders/seasons-list')
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
                    setIndAvgLeaders(response.data);
                    setIndAvgLeadersStatus({ errorMsg: undefined, isLoaded: true });
                })
                .catch((error) => {
                    console.log(error);
                    setIndAvgLeaders(null);
                    setIndAvgLeadersStatus({ errorMsg: 'An error occurred fetching player best average leaders!', isLoaded: true });
                });
            axios.get('/api/leaders/individual/one-game/num-leaders/' + queryNumLeaders + '/season/' + querySeasonId)
                .then((response) => {
                    setIndOneGameLeaders(response.data);
                    setIndOneGameLeadersStatus({ errorMsg: undefined, isLoaded: true });
                })
                .catch((error) => {
                    console.log(error);
                    setIndOneGameLeaders(null);
                    setIndOneGameLeadersStatus({ errorMsg: 'An error occurred fetching player 1-game leaders!', isLoaded: true });
                });
            axios.get('/api/leaders/individual/ten-game/num-leaders/' + queryNumLeaders + '/season/' + querySeasonId)
                .then((response) => {
                    setIndTenGameLeaders(response.data);
                    setIndTenGameLeadersStatus({ errorMsg: undefined, isLoaded: true });
                })
                .catch((error) => {
                    console.log(error);
                    setIndTenGameLeaders(null);
                    setIndTenGameLeadersStatus({ errorMsg: 'An error occurred fetching player 10-game leaders!', isLoaded: true });
                });
            axios.get('/api/leaders/team/average/num-leaders/' + queryNumLeaders + '/season/' + querySeasonId)
                .then((response) => {
                    setTeamAvgLeaders(response.data);
                    setTeamAvgLeadersStatus({ errorMsg: undefined, isLoaded: true });
                })
                .catch((error) => {
                    console.log(error);
                    setTeamAvgLeaders(null);
                    setTeamAvgLeadersStatus({ errorMsg: 'An error occurred fetching team best average leaders!', isLoaded: true });
                });
            axios.get('/api/leaders/team/one-game/num-leaders/' + queryNumLeaders + '/season/' + querySeasonId)
                .then((response) => {
                    setTeamOneGameLeaders(response.data);
                    setTeamOneGameLeadersStatus({ errorMsg: undefined, isLoaded: true });
                })
                .catch((error) => {
                    console.log(error);
                    setTeamOneGameLeaders(null);
                    setTeamOneGameLeadersStatus({ errorMsg: 'An error occurred fetching team 1-game leaders!', isLoaded: true });
                });
            axios.get('/api/leaders/team/ten-game/num-leaders/' + queryNumLeaders + '/season/' + querySeasonId)
                .then((response) => {
                    setTeamTenGameLeaders(response.data);
                    setTeamTenGameLeadersStatus({ errorMsg: undefined, isLoaded: true });
                })
                .catch((error) => {
                    console.log(error);
                    setTeamTenGameLeaders(null);
                    setTeamTenGameLeadersStatus({ errorMsg: 'An error occurred fetching team 10-game leaders!', isLoaded: true });
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
                    {leadersSeasonsStatus.isLoaded && leadersSeasons && leadersSeasons.length > 0 &&
                        <SeasonDropdown currentSeason={seasonName} buttonText="View Leaders From" listItems={leadersSeasons} handleSeasonId={handleSeasonId} />
                    }
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="d-flex justify-content-center">
                        <div className="min-w-50 mx-auto">
                            <h3 className="text-center mb-4">Individual Leaders</h3>
                            {!indAvgLeadersStatus.isLoaded
                                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                                : indAvgLeaders.leaders && indAvgLeaders.numAtTieValue && (indAvgLeaders.leaders.length > 0 || indAvgLeaders.numAtTieValue > 1)
                                    ? <LeadersTable heading="Player, high season average / game" subHeading="(must play in a minimum of 50% of your team's games to qualify)" columnName="Player" columnData="Average" format="decimal" href="/players/" leadersObj={indAvgLeaders} />
                                    : indAvgLeaders.leaders
                                        ? <div className="empty-result">There are no player average leaders for this season!</div>
                                        : <div className="empty-result">{indAvgLeadersStatus.errorMsg}</div>
                            }
                            {!indOneGameLeadersStatus.isLoaded
                                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                                : indOneGameLeaders.leaders && indOneGameLeaders.numAtTieValue && (indOneGameLeaders.leaders.length > 0 || indOneGameLeaders.numAtTieValue > 1)
                                    ? <LeadersTable heading="Player, 1-game high" columnName="Player" columnData="Score" format="integer" href="/players/" leadersObj={indOneGameLeaders} />
                                    : indOneGameLeaders.leaders
                                        ? <div className="empty-result">There are no player 1-game leaders for this season!</div>
                                        : <div className="empty-result">{indOneGameLeadersStatus.errorMsg}</div>
                            }
                            {!indTenGameLeadersStatus.isLoaded
                                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                                : indTenGameLeaders.leaders && indTenGameLeaders.numAtTieValue && (indTenGameLeaders.leaders.length > 0 || indTenGameLeaders.numAtTieValue > 1)
                                    ? <LeadersTable heading="Player, 10-game high" columnName="Player" columnData="Score" format="integer" href="/players/" leadersObj={indTenGameLeaders} />
                                    : indTenGameLeaders.leaders
                                        ? <div className="empty-result">There are no player 10-game leaders for this season!</div>
                                        : <div className="empty-result">{indTenGameLeadersStatus.errorMsg}</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="d-flex justify-content-center">
                        <div className="min-w-50 mx-auto">
                            <h3 className="text-center mb-4">Team Leaders</h3>
                            {!teamAvgLeadersStatus.isLoaded
                                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                                : teamAvgLeaders.leaders && teamAvgLeaders.numAtTieValue && (teamAvgLeaders.leaders.length > 0 || teamAvgLeaders.numAtTieValue > 1)
                                    ? <LeadersTable heading="Team, 10-game high average" columnName="Team" columnData="Average" format="decimal" href="/teams/" leadersObj={teamAvgLeaders} />
                                    : teamAvgLeaders.leaders
                                        ? <div className="empty-result">There are no team average leaders for this season!</div>
                                        : <div className="empty-result">{teamAvgLeadersStatus.errorMsg}</div>
                            }
                            {!teamOneGameLeadersStatus.isLoaded
                                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                                : teamOneGameLeaders.leaders && teamOneGameLeaders.numAtTieValue && (teamOneGameLeaders.leaders.length > 0 || teamOneGameLeaders.numAtTieValue > 1)
                                    ? <LeadersTable heading="Team, 1-game high" columnName="Team" columnData="Score" format="integer" href="/teams/" leadersObj={teamOneGameLeaders} />
                                    : teamOneGameLeaders.leaders
                                        ? <div className="empty-result">There are no team 1-game leaders for this season!</div>
                                        : <div className="empty-result">{teamOneGameLeadersStatus.errorMsg}</div>
                            }
                            {!teamTenGameLeadersStatus.isLoaded
                                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                                : teamTenGameLeaders.leaders && teamTenGameLeaders.numAtTieValue && (teamTenGameLeaders.leaders.length > 0 || teamTenGameLeaders.numAtTieValue > 1)
                                    ? <LeadersTable heading="Team, 10-game high" columnName="Team" columnData="Score" format="integer" href="/teams/" leadersObj={teamTenGameLeaders} />
                                    : teamTenGameLeaders.leaders
                                        ? <div className="empty-result">There are no team 10-game leaders for this season!</div>
                                        : <div className="empty-result">{teamTenGameLeadersStatus.errorMsg}</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Leaders;

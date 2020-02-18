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

    const [numLeaders, setNumLeaders] = useState(20);

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
        axios.get('api/leaders/individual/average/' + querySeasonId + '/' + numLeaders)
            .then((response) => {
                setIndAvgLeaders({
                    numAtTieValue: response.data[0][0].num_at_tie_value,
                    tieValue: response.data[0][0].tie_value,
                    leaders: rankLeaders(response.data[1]),
                });
                setIndAvgLeadersStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setIndAvgLeaders(null);
                setIndAvgLeadersStatus({ errorMsg: 'An error occurred fetching player best average leaders!', isLoaded: true });
            });
        axios.get('api/leaders/individual/one-game/' + querySeasonId + '/' + numLeaders)
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
                setIndOneGameLeadersStatus({ errorMsg: 'An error occurred fetching player 1-game leaders!', isLoaded: true });
            });
        axios.get('api/leaders/individual/ten-game/' + querySeasonId + '/' + numLeaders)
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
                setIndTenGameLeadersStatus({ errorMsg: 'An error occurred fetching player 10-game leaders!', isLoaded: true });
            });
        axios.get('api/leaders/team/average/' + querySeasonId + '/' + numLeaders)
            .then((response) => {
                setTeamAvgLeaders({
                    numAtTieValue: response.data[0][0].num_at_tie_value,
                    tieValue: response.data[0][0].tie_value,
                    leaders: rankLeaders(response.data[1]),
                });
                setTeamAvgLeadersStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setTeamAvgLeaders(null);
                setTeamAvgLeadersStatus({ errorMsg: 'An error occurred fetching team best average leaders!', isLoaded: true });
            });
        axios.get('api/leaders/team/one-game/' + querySeasonId + '/' + numLeaders)
            .then((response) => {
                setTeamOneGameLeaders({
                    numAtTieValue: response.data[0][0].num_at_tie_value,
                    tieValue: response.data[0][0].tie_value,
                    leaders: rankLeaders(response.data[1]),
                });
                setTeamOneGameLeadersStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setTeamOneGameLeaders(null);
                setTeamOneGameLeadersStatus({ errorMsg: 'An error occurred fetching team 1-game leaders!', isLoaded: true });
            });
        axios.get('api/leaders/team/ten-game/' + querySeasonId + '/' + numLeaders)
            .then((response) => {
                setTeamTenGameLeaders({
                    numAtTieValue: response.data[0][0].num_at_tie_value,
                    tieValue: response.data[0][0].tie_value,
                    leaders: rankLeaders(response.data[1]),
                });
                setTeamTenGameLeadersStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setTeamTenGameLeaders(null);
                setTeamTenGameLeadersStatus({ errorMsg: 'An error occurred fetching team 10-game leaders!', isLoaded: true });
            });
    }, [querySeasonId, numLeaders]);

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
                            {!indAvgLeadersStatus.isLoaded
                                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                                : indAvgLeaders.leaders && indAvgLeaders.leaders.length > 0
                                    ? <LeadersTable heading="Player, high season average / game" subHeading="(must play in a minimum of 50% of your team's games to qualify)" format="decimal" href="/players/" leadersObj={indAvgLeaders} />
                                    : indAvgLeaders.leaders
                                        ? <span className="empty-result">There are no player average leaders for this season!</span>
                                        : <span className="empty-result">{indAvgLeadersStatus.errorMsg}</span>
                            }
                            {!indOneGameLeadersStatus.isLoaded
                                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                                : indOneGameLeaders.leaders && indOneGameLeaders.leaders.length > 0
                                    ? <LeadersTable heading="Player, 1-game high" columnName="Score" format="integer" href="/players/" leadersObj={indOneGameLeaders} />
                                    : indOneGameLeaders.leaders
                                        ? <span className="empty-result">There are no player 1-game leaders for this season!</span>
                                        : <span className="empty-result">{indOneGameLeadersStatus.errorMsg}</span>
                            }
                            {!indTenGameLeadersStatus.isLoaded
                                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                                : indTenGameLeaders.leaders && indTenGameLeaders.leaders.length > 0
                                    ? <LeadersTable heading="Player, 10-game high" columnName="Points" format="integer" href="/players/" leadersObj={indTenGameLeaders} />
                                    : indTenGameLeaders.leaders
                                        ? <span className="empty-result">There are no player 10-game leaders for this season!</span>
                                        : <span className="empty-result">{indTenGameLeadersStatus.errorMsg}</span>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="d-flex justify-content-center">
                        <div className="min-w-50 mx-auto">
                            <h3 className="text-center mb-4">Team Leaders</h3>
                            {!teamAvgLeadersStatus.isLoaded
                                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                                : teamAvgLeaders.leaders && teamAvgLeaders.leaders.length > 0
                                    ? <LeadersTable heading="Team, 10-game high average" columnName="Score" format="decimal" href="/teams/" leadersObj={teamAvgLeaders} />
                                    : teamAvgLeaders.leaders
                                        ? <span className="empty-result">There are no team average leaders for this season!</span>
                                        : <span className="empty-result">{teamAvgLeadersStatus.errorMsg}</span>
                            }
                            {!teamOneGameLeadersStatus.isLoaded
                                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                                : teamOneGameLeaders.leaders && teamOneGameLeaders.leaders.length > 0
                                    ? <LeadersTable heading="Team, 1-game high" columnName="Score" format="integer" href="/teams/" leadersObj={teamOneGameLeaders} />
                                    : teamOneGameLeaders.leaders
                                        ? <span className="empty-result">There are no team 1-game leaders for this season!</span>
                                        : <span className="empty-result">{teamOneGameLeadersStatus.errorMsg}</span>
                            }
                            {!teamTenGameLeadersStatus.isLoaded
                                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                                : teamTenGameLeaders.leaders && teamTenGameLeaders.leaders.length > 0
                                    ? <LeadersTable heading="Team, 10-game high" columnName="Score" format="integer" href="/teams/" leadersObj={teamTenGameLeaders} />
                                    : teamTenGameLeaders.leaders
                                        ? <span className="empty-result">There are no team 10-game leaders for this season!</span>
                                        : <span className="empty-result">{teamTenGameLeadersStatus.errorMsg}</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Leaders;

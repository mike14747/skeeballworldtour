import React, { useState, useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import CurrentSeasonContext from '../../components/currentSeasonContext';
import PageHeading from '../../components/pageHeading/pageHeading';
import SeasonDropdown from '../../components/seasonDropdown/seasonDropdown';

const Leaders = () => {
    const [seasonId, setSeasonId] = useState(null);
    const currentSeasonId = useContext(CurrentSeasonContext);
    const querySeasonId = seasonId || currentSeasonId;
    const [indAvgLeaders, setIndAvgLeaders] = useState();
    const [areIndAvgLeadersLoaded, setAreIndAvgLeadersLoaded] = useState(false);
    const [indOneGameLeaders, setIndOneGameLeaders] = useState();
    const [areIndTenGameLeadersLoaded, setAreIndTenGameLeadersLoaded] = useState(false);
    const [indTenGameLeaders, setIndTenGameLeaders] = useState();
    const [areIndOneGameLeadersLoaded, setAreIndOneGameLeadersLoaded] = useState(false);
    const [teamAvgLeaders, setTeamAvgLeaders] = useState();
    const [areTeamAvgLeadersLoaded, setAreTeamAvgLeadersLoaded] = useState(false);
    const [teamOneGameLeaders, setTeamOneGameLeaders] = useState();
    const [areTeamTenGameLeadersLoaded, setAreTeamTenGameLeadersLoaded] = useState(false);
    const [teamTenGameLeaders, setTeamTenGameLeaders] = useState();
    const [areTeamOneGameLeadersLoaded, setAreTeamOneGameLeadersLoaded] = useState(false);
    const [leadersSeasons, setLeadersSeasons] = useState([]);

    const handleSeasonId = season => setSeasonId(season);

    useEffect(() => {
        axios()
            .then(response => setLeadersSeasons(response.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        setAreIndAvgLeadersLoaded(false);
        setAreIndTenGameLeadersLoaded(false);
        setAreIndOneGameLeadersLoaded(false);
        setAreTeamAvgLeadersLoaded(false);
        setAreTeamTenGameLeadersLoaded(false);
        setAreTeamOneGameLeadersLoaded(false);

    }, [querySeasonId]);

    return (
        <Fragment>
            <PageHeading text="League Leaders" />
        </Fragment>
    );
};

export default Leaders;

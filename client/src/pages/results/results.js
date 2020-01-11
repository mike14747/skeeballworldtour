import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CurrentSeasonContext from '../../components/currentSeasonContext';
import PageHeading from '../../components/pageHeading/pageHeading';

const Results = () => {
    const currentSeasonId = useContext(CurrentSeasonContext);
    const { storeid, divisionid, seasonid } = useParams();
    const querySeasonId = seasonid || currentSeasonId;
    const [resultsArray, setResultsArray] = useState([]);

    useEffect(() => {
        console.log('Inside useEffect!');
        console.log(storeid + ' - ' + divisionid + ' (' + currentSeasonId + ')');
    }, [querySeasonId]);

    return (
        <Fragment>
            <PageHeading text="Results" />
        </Fragment>
    );
};

export default Results;

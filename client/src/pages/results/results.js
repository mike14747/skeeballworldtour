import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CurrentSeasonContext from '../../components/currentSeasonContext';
// import Dropdown from '../../components/dropdown/dropdown';
import ResultsDiv from '../../components/resultsDiv/resultsDiv';
import PageHeading from '../../components/pageHeading/pageHeading';

const Results = () => {
    const currentSeasonId = useContext(CurrentSeasonContext);
    const { storeid, divisionid, seasonid } = useParams();
    const querySeasonId = seasonid || currentSeasonId;
    const [results, setResults] = useState([]);

    useEffect(() => {
        axios.get('/api/results/store/' + storeid + '/division/' + divisionid + '/season/' + querySeasonId)
            .then((response) => setResults(response.data[3]))
            .catch((err) => console.log(err));
    }, [storeid, divisionid, querySeasonId]);

    return (
        <Fragment>
            <PageHeading text="Results" />
            {results.length > 0 &&
                <div className="d-flex justify-content-center">
                    <div className="min-w-50 mx-auto">
                        <ResultsDiv results={results} />
                    </div>
                </div>
            }
        </Fragment>
    );
};

export default Results;

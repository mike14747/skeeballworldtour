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
    const [season, setSeason] = useState();
    const [store, setStore] = useState();
    const [areResultsLoaded, setAreResultsLoaded] = useState(false);

    useEffect(() => {
        setAreResultsLoaded(false);
        axios.all([
            axios.get('/api/seasons/' + querySeasonId),
            axios.get('/api/stores/' + storeid + '/divisions/' + divisionid),
        ])
            .then(axios.spread((season, store) => {
                setSeason(season.data[0]);
                setStore(store.data[0]);
            }))
            .catch(err => console.log(err));
        axios.get('/api/results/store/' + storeid + '/division/' + divisionid + '/season/' + querySeasonId)
            .then((response) => {
                if (response.data[3]) {
                    setResults(response.data[3]);
                }
                setAreResultsLoaded(true);
            })
            .catch(err => console.log(err));
    }, [storeid, divisionid, querySeasonId]);

    return (
        <Fragment>
            <PageHeading text="Results" />
            {(store && season) &&
                <div className="mb-4 bigger font-weight-bolder"><a href={'/stores/' + store.store_id + '/divisions/' + store.division_id}>{store.store_name} ({store.day_name})</a> <span className="mx-2">|</span> Season: {season.season_name}, {season.year}</div>
            }
            <div className="d-flex justify-content-center">
                <div className="min-w-50 mx-auto">
                    {!areResultsLoaded
                        ? <img src={'/images/loading.gif'} alt={'Loading'} />
                        : results.length > 0
                            ? <ResultsDiv results={results} />
                            : <span className="empty-result">There are no results for this season!</span>
                    }
                </div>
            </div>
        </Fragment>
    );
};

export default Results;

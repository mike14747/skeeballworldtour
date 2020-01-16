import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CurrentSeasonContext from '../../components/currentSeasonContext';
import SeasonDropdown from '../../components/seasonDropdown/seasonDropdown';
import ResultsDiv from '../../components/resultsDiv/resultsDiv';
import PageHeading from '../../components/pageHeading/pageHeading';

const Results = () => {
    const [seasonId, setSeasonId] = useState(null);
    const currentSeasonId = useContext(CurrentSeasonContext);
    const { storeid, divisionid } = useParams();
    const querySeasonId = seasonId || currentSeasonId;
    const [results, setResults] = useState([]);
    const [season, setSeason] = useState();
    const [store, setStore] = useState();
    const [areResultsLoaded, setAreResultsLoaded] = useState(false);

    const handleSeasonId = season => {
        setSeasonId(season);
    };

    // add a useEffect to get all seasons that have results

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
            {/* add a seasonsDropdown component here once the api call is finished */}
            {/* <SeasonDropdown buttonText="View Results From:" listItems={resultsSeasons} handleSeasonId={handleSeasonId} /> */}
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

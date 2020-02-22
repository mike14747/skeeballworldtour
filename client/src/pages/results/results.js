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
    const querySeasonId = seasonId || currentSeasonId;

    const { storeid, divisionid } = useParams();

    const [seasonName, setSeasonName] = useState(null);

    const [results, setResults] = useState(null);
    const [resultsStatus, setResultsStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [store, setStore] = useState(null);
    const [storeStatus, setStoreStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [resultSeasons, setResultSeasons] = useState(null);
    const [resultSeasonsStatus, setResultSeasonsStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const handleSeasonId = season => setSeasonId(season);

    useEffect(() => {
        axios.get('/api/results/store/' + storeid + '/division/' + divisionid + '/seasons-list')
            .then((response) => {
                const seasonArray = response.data.map((season) => {
                    return {
                        season_id: season.season_id,
                        text: season.season_name + ' - ' + season.year,
                    };
                });
                setResultSeasons(seasonArray);
                setResultSeasonsStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setResultSeasons(null);
                setResultSeasonsStatus({ errorMsg: 'An error occurred fetching results!', isLoaded: true });
            });
    }, [storeid, divisionid]);

    useEffect(() => {
        axios.get('/api/seasons/' + querySeasonId + '/name')
            .then((response) => {
                response.data[0] ? setSeasonName({ season_id: querySeasonId, season_name: response.data[0].season_name, season_year: response.data[0].year }) : setSeasonName(null);
            })
            .catch((error) => {
                console.log(error);
                setSeasonName(null);
            });
        axios.get('/api/stores/' + storeid + '/divisions/' + divisionid)
            .then((response) => {
                response.data[0] ? setStore(response.data[0]) : setStore(null);
                setStoreStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setStore(null);
                setStoreStatus({ errorMsg: 'An error occurred fetching the store name!', isLoaded: true });
            });
        axios.get('/api/results/store/' + storeid + '/division/' + divisionid + '/season/' + querySeasonId)
            .then((response) => {
                if (response.data[3]) {
                    setResults(response.data[3]);
                }
                setResultsStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setResults(null);
                setResultsStatus({ errorMsg: 'An error occurred fetching results!', isLoaded: true });
            });
    }, [storeid, divisionid, querySeasonId]);

    return (
        <Fragment>
            <PageHeading text="Results" />
            <div className="row mb-4">
                <div className="col-6 text-left p-2">
                    {storeStatus.isLoaded && store &&
                        <div className="mb-3 bigger">
                            <a href={'/stores/' + store.store_id + '/divisions/' + store.division_id}>{store.store_name} ({store.day_name})</a>
                        </div>
                    }
                </div>
                <div className="col-6 text-right p-2">
                    {resultSeasonsStatus.isLoaded && resultSeasons && resultSeasons.length > 0 &&
                        <SeasonDropdown currentSeason={seasonName} buttonText="View Stats From" listItems={resultSeasons} handleSeasonId={handleSeasonId} />
                    }
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="min-w-50 mx-auto">
                    {!resultsStatus.isLoaded
                        ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                        : results && results.length > 0
                            ? <ResultsDiv results={results} />
                            : results
                                ? <span className="empty-result">There are no results for this season!</span>
                                : <span className="empty-result">{resultsStatus.errorMsg}</span>
                    }
                </div>
            </div>
        </Fragment>
    );
};

export default Results;

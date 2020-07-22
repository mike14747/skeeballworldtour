import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import PageHeading from '../../components/pageHeading/pageHeading';
import Loading from '../../components/loading/loading';

const Champions = () => {
    const [champions, setChampions] = useState({
        data: null,
        status: {
            errorMsg: undefined,
            isLoaded: false,
        },
    });

    useEffect(() => {
        axios.get('/api/seasons/champions')
            .then((response) => {
                setChampions({
                    data: response.data,
                    status: {
                        errorMsg: undefined,
                        isLoaded: true,
                    },
                });
            })
            .catch((error) => {
                console.log(error);
                setChampions({
                    data: null,
                    status: {
                        errorMsg: 'An error occurred fetching champions!',
                        isLoaded: true,
                    },
                });
            });
    }, []);

    return (
        <Fragment>
            <PageHeading text="Champions" />
            {!champions.status.isLoaded
                ? <Loading />
                : champions.data && champions.data.length > 0
                    ? <div className="d-flex justify-content-center">
                        <div className="min-w-50 mx-auto">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr className="bg-gray6">
                                        <th>Season</th>
                                        <th>Champion</th>
                                        <th>Store</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {champions.data.map((champion) => (
                                        <tr key={champion.season_id}>
                                            <td>{champion.season_name}-{champion.year}</td>
                                            <td><a href={'/teams/' + champion.tourny_team_id}>{champion.team_name}</a>{champion.comments.length > 0 && <span className="small ml-2">*({champion.comments})</span>}</td>
                                            <td>{champion.store_city}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : champions.data
                        ? <span className="empty-result">There are no champions to display!</span>
                        : <span className="empty-result">{champions.status.errorMsg}</span>
            }
        </Fragment>
    );
};

export default Champions;

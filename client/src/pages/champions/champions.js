import React, { useState, useEffect, Fragment } from 'react';
import PageHeading from '../../components/pageHeading/pageHeading';
import axios from 'axios';

const Champions = () => {
    const [champions, setChampions] = useState(null);
    const [championsStatus, setChampionsStatus] = useState({ errorMsg: undefined, isLoaded: false });

    useEffect(() => {
        axios.get('/api/seasons/champions')
            .then((response) => {
                setChampions(response.data);
                setChampionsStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setChampions(null);
                setChampionsStatus({ errorMsg: 'An error occurred fetching champions!', isLoaded: true });
            });
    }, []);

    return (
        <Fragment>
            <PageHeading text="Champions" />
            {!championsStatus.isLoaded
                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                : champions && champions.length > 0
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
                                    {champions.map((champion) => (
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
                    : champions
                        ? <span className="empty-result">There are no champions to display!</span>
                        : <span className="empty-result">{championsStatus.errorMsg}</span>
            }
        </Fragment>
    );
};

export default Champions;

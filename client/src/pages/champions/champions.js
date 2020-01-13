import React, { useState, useEffect, Fragment } from 'react';
import PageHeading from '../../components/pageHeading/pageHeading';
import axios from 'axios';

const Champions = () => {
    const [champions, setChampions] = useState([]);

    useEffect(() => {
        axios.get('/api/seasons/champions')
            .then(result => setChampions(result.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <Fragment>
            <PageHeading text="Champions" />
            {champions.length > 0 &&
                <div className="d-flex justify-content-center">
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
            }
        </Fragment>
    );
};

export default Champions;

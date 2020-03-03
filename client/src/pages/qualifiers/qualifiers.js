import React, { useState, useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import CurrentSeasonContext from '../../components/currentSeasonContext';
import PageHeading from '../../components/pageHeading/pageHeading';

const Qualifers = () => {
    const currentSeasonId = useContext(CurrentSeasonContext);
    const querySeasonId = currentSeasonId;

    const [seasonName, setSeasonName] = useState(null);

    useEffect(() => {
        if (querySeasonId) {
            axios.get('/api/seasons/' + querySeasonId + '/name')
                .then((response) => {
                    response.data[0] ? setSeasonName({ season_id: querySeasonId, season_name: response.data[0].season_name, season_year: response.data[0].year }) : setSeasonName(null);
                })
                .catch((error) => {
                    console.log(error);
                    setSeasonName(null);
                });
        }
    }, [querySeasonId]);

    return (
        <Fragment>
            <PageHeading text="Tournament Qualifiers" />
            {seasonName &&
                <div>
                    {seasonName.season_name}-{seasonName.season_year}
                </div>
            }
        </Fragment>
    );
};

export default Qualifers;

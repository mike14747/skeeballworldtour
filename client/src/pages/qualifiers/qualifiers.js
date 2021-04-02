import React, { useState, useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import SettingsContext from '../../context/settingsContext';
import PageHeading from '../../components/pageHeading/pageHeading';

const Qualifers = () => {
    const settings = useContext(SettingsContext);

    // eslint-disable-next-line
    const [seasonId, setSeasonId] = useState(null);
    const currentSeasonId = settings.current_season_id;
    const querySeasonId = seasonId || currentSeasonId;

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

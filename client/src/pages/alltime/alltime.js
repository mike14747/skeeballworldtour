import React, { useState, useEffect, Fragment } from 'react';
import PageHeading from '../../components/pageHeading/pageHeading';
import NumLeadersDropdown from '../../components/numLeadersDropdown/numLeadersDropdown';

const AllTime = () => {
    const [numLeaders, setNumLeaders] = useState(20);
    const numLeadersArray = [10, 20, 50, 100];

    useEffect(() => {

    }, [numLeaders]);

    return (
        <Fragment>
            <PageHeading text="League Leaders" />
            <div className="row mb-4">
                <div className="col-4 text-left p-2">

                </div>
                <div className="col-4 text-center p-2">
                    <NumLeadersDropdown numLeaders={numLeaders} numLeadersArray={numLeadersArray} setNumLeaders={setNumLeaders} />
                </div>
                <div className="col-4 text-right p-2">

                </div>
            </div>
        </Fragment>
    );
};

export default AllTime;

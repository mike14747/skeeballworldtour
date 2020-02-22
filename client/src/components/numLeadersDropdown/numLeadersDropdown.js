import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function NumLeadersDropdown({ numLeaders, numLeadersArray, setNumLeaders }) {
    return (
        <Fragment>
            {numLeadersArray && numLeadersArray.length > 0 &&
                <span className="small">Currently showing top:</span>
            }
            <select className="ml-2">
                {numLeadersArray.map(leaders => (
                    <Fragment key={leaders}>
                        {numLeaders === leaders
                            ? <option selected="selected">{leaders}</option>
                            : <option value={leaders} onClick={() => setNumLeaders(leaders)}>{leaders}</option>
                        }
                    </Fragment>
                ))}
            </select>
        </Fragment>
    );
}

NumLeadersDropdown.propTypes = {
    numLeaders: PropTypes.number,
    numLeadersArray: PropTypes.array,
    setNumLeaders: PropTypes.func,
};

export default NumLeadersDropdown;

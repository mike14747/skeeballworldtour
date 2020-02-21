import React, { Fragment } from 'react';
import './css/numLeadersDropdown.css';
import PropTypes from 'prop-types';

function NumLeadersDropdown({ numLeaders, numLeadersArray, setNumLeaders }) {
    return (
        <div className="d-flex justify-content-end">
            {numLeadersArray && numLeadersArray.length > 0 &&
                <span className="py-1 px-2"><span className="small">Currently showing top: </span></span>
            }
            <select>
                {numLeadersArray.map(leaders => (
                    <Fragment key={leaders}>
                        {numLeaders === leaders
                            ? <option selected="selected">{leaders}</option>
                            : <option value={leaders} onClick={() => setNumLeaders(leaders)}>{leaders}</option>
                        }
                    </Fragment>
                ))}
            </select>
        </div>
    );
}

NumLeadersDropdown.propTypes = {
    numLeaders: PropTypes.number,
    numLeadersArray: PropTypes.array,
    setNumLeaders: PropTypes.func,
};

export default NumLeadersDropdown;

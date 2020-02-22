import React, { Fragment } from 'react';
import './css/seasonDropdown.css';
import PropTypes from 'prop-types';

function Dropdown({ currentSeason, buttonText, listItems, handleSeasonId }) {
    return (
        <Fragment>
            {currentSeason &&
                <Fragment>
                    <span className="small">Current View:</span> {currentSeason.season_name}, {currentSeason.season_year}
                </Fragment>
            }
            <div className="dropdown ml-2">
                <button className="dropbtn">{buttonText}<i className="down"></i></button>
                <ul className="dropdown-content">
                    {listItems.map(item => (
                        <Fragment key={item.season_id}>
                            {currentSeason && (item.season_id === currentSeason.season_id)
                                ? <li className="viewing">{item.text}</li>
                                : <li onClick={() => handleSeasonId(item.season_id)}>{item.text}</li>
                            }
                        </Fragment>
                    ))}
                </ul>
            </div>
        </Fragment>
    );
}

Dropdown.propTypes = {
    currentSeason: PropTypes.object,
    buttonText: PropTypes.string,
    listItems: PropTypes.array,
    handleSeasonId: PropTypes.func,
};

export default Dropdown;

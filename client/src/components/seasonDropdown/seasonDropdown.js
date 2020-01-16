import React from 'react';
import './css/seasonDropdown.css';
import PropTypes from 'prop-types';

function Dropdown({ buttonText, listItems, handleSeasonId }) {
    return (
        <div className="dropdown ml-4">
            <button className="dropbtn">{buttonText}</button>
            <ul className="dropdown-content">
                {listItems.map(item => (
                    <li key={item.season_id} onClick={() => handleSeasonId(item.season_id)}>{item.text}</li>
                ))}
            </ul>
        </div>
    );
}

Dropdown.propTypes = {
    buttonText: PropTypes.string,
    listItems: PropTypes.array,
    handleSeasonId: PropTypes.func,
};

export default Dropdown;

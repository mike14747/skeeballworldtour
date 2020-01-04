import React from 'react';
import './css/dropdown.css';
import PropTypes from 'prop-types';

function Dropdown(props) {
    return (
        <div className="dropdown">
            <button className="dropbtn">{props.buttonText}</button>
            <div className="dropdown-content">
                {props.listItems.map(item => (
                    <div key={item.id}>
                        <a href={item.href}>{item.text}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

Dropdown.propTypes = {
    buttonText: PropTypes.string,
    listItems: PropTypes.array,
};

export default Dropdown;

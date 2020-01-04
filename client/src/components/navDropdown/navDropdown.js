import React from 'react';
import './css/navDropdown.css';
import PropTypes from 'prop-types';

export default function NavDropdown(props) {
    return (
        <div className="navdropdown" data-toggle="dropdown">
            <div className="navdropbtn">{props.buttonText}</div>
            <div className="navdropdown-content">
                {props.listItems.map(item => (
                    <div key={item.id}>
                        <a href={props.urlPrefix + item.href}>{item.text}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

NavDropdown.propTypes = {
    buttonText: PropTypes.string,
    urlPrefix: PropTypes.string,
    listItems: PropTypes.array,
};

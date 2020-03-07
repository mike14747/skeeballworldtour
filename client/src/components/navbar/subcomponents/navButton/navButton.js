import React from 'react';
import './css/navButton.css';
import PropTypes from 'prop-types';

export default function NavButton(props) {
    return (
        <div className="navbutton">
            <a href={props.url}><div className="navbtn">{props.buttonText}</div></a>
        </div>
    );
}

NavButton.propTypes = {
    buttonText: PropTypes.string,
    url: PropTypes.string,
};

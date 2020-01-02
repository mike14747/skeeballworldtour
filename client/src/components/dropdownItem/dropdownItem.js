import React from 'react';
import PropTypes from 'prop-types';

function DropdownItem(props) {
    return (
        <a href={props.href}>{props.text}</a>
    );
}

DropdownItem.propTypes = {
    href: PropTypes.string,
    text: PropTypes.string,
};

export default DropdownItem;

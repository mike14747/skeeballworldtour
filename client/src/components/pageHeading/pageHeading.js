import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const PageHeading = (props) => {
    return (
        <Fragment>
            <h2 className="text-center">{props.text}</h2>
            <hr />
        </Fragment>
    );
};

PageHeading.propTypes = {
    text: PropTypes.string,
};

export default PageHeading;

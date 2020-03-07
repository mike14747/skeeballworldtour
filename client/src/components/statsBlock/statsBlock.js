import React from 'react';
import PropTypes from 'prop-types';
import StatsBlockItem from './subcomponents/statsBlockItem/statsBlockItem';

const StatsBlock = (props) => {
    return (
        <table className="table table-bordered table-hover">
            <tbody>
                <StatsBlockItem stats={props.stats} />
            </tbody>
        </table>
    );
};

StatsBlock.propTypes = {
    stats: PropTypes.array,
};

export default StatsBlock;

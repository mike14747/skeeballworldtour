import React from 'react';
import PropTypes from 'prop-types';
import './css/statsBlockItem.css';

const StatsBlockItem = (props) => {
    return (
        props.stats.map((stat, index) => (
            <tr key={index}>
                <td className="bg-stat-heading font-weight-bolder text-right">{stat.text}</td>
                <td className="text-center px-4">{stat.data}</td>
            </tr>
        ))
    );
};

StatsBlockItem.propTypes = {
    stats: PropTypes.array,
};

export default StatsBlockItem;

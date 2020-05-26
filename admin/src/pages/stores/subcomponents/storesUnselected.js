import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const StoresUnselected = ({ store, setSelectedStore }) => {
    return (
        <Fragment>
            <td><button onClick={() => setSelectedStore(store)}>Select</button></td>
            <td>{store.store_id}</td>
            <td>{store.store_name}</td>
            <td>{store.store_address}</td>
            <td>{store.store_city}</td>
            <td>{store.store_state}</td>
            <td>{store.store_zip}</td>
            <td>{store.store_phone}</td>
            <td>{store.map_url}</td>
            <td>{store.active}</td>
        </Fragment>
    );
};

StoresUnselected.propTypes = {
    store: PropTypes.object,
    setSelectedStore: PropTypes.func,
};

export default StoresUnselected;

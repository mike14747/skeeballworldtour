import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const StoresSelected = ({ selectedStore, handleChange }) => {
    return (
        <Fragment>
            <td>{selectedStore.store_id}</td>
            <td><input type="text" name="store_name" value={selectedStore.store_name} onChange={handleChange} /></td>
            <td><input type="text" name="store_address" value={selectedStore.store_address} onChange={handleChange} /></td>
            <td><input type="text" name="store_city" value={selectedStore.store_city} onChange={handleChange} /></td>
            <td><input type="text" name="store_state" value={selectedStore.store_state} onChange={handleChange} /></td>
            <td><input type="text" name="store_zip" value={selectedStore.store_zip} onChange={handleChange} /></td>
            <td><input type="text" name="store_phone" value={selectedStore.store_phone} onChange={handleChange} /></td>
            <td><input type="text" name="map_url" value={selectedStore.map_url} onChange={handleChange} /></td>
            <td>{selectedStore.active}</td>
        </Fragment>
    );
};

StoresSelected.propTypes = {
    selectedStore: PropTypes.object,
    handleChange: PropTypes.func,
};

export default StoresSelected;

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const StoresSelected = ({ selectedStore, handleChange, setSelectedStore }) => {
    return (
        <Fragment>
            <td><button onClick={() => setSelectedStore(null)}>Cancel</button></td>
            <td>{selectedStore.store_id}</td>
            <td><input type="text" name="store_name" value={selectedStore.store_name} onChange={handleChange} /></td>
            <td><input type="text" name="store_address" value={selectedStore.store_address} onChange={handleChange} /></td>
            <td><input type="text" name="store_city" value={selectedStore.store_city} onChange={handleChange} /></td>
            <td><input type="text" name="store_state" value={selectedStore.store_state} onChange={handleChange} /></td>
            <td><input type="text" name="store_zip" value={selectedStore.store_zip} onChange={handleChange} /></td>
            <td><input type="text" name="store_phone" value={selectedStore.store_phone} onChange={handleChange} /></td>
            <td><input type="text" name="map_url" value={selectedStore.map_url} onChange={handleChange} /></td>
            <td>
                <select>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
            </td>
            {/* {selectedStore.active} */}
        </Fragment>
    );
};

StoresSelected.propTypes = {
    selectedStore: PropTypes.object,
    handleChange: PropTypes.func,
    setSelectedStore: PropTypes.func,
};

export default StoresSelected;

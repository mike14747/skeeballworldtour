import React, { useState, useEffect, Fragment } from 'react';
import PageHeading from '../../components/pageHeading/pageHeading';
const axios = require('axios');

const EditStore = () => {
    const [stores, setStores] = useState(null);
    const [storesStatus, setStoresStatus] = useState({ errorMsg: undefined, isLoaded: false });

    useEffect(() => {
        axios.get('/api/admin/stores')
            .then(response => {
                setStores(response.data);
                setStoresStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setStores(null);
                setStoresStatus({ errorMsg: 'An error occurred fetching stores!', isLoaded: true });
            });
    }, []);

    function updateStore() {

    }

    function deleteStore() {

    }

    const handleChange = (event) => {
        // console.log(event.target.name, event.target.value, event.target.id);
        const { name, value } = event.target;
        console.group(name, value);
        // const newStores = stores.map(store => store.store_id === parseInt(event.target.id) ? { ...store, name } : { store });
        // const newStores = stores.map(store => console.log('test', store.store_id, parseInt(event.target.id), 3));
        // console.log(newStores);
        // setStores(newStores);
    };

    return (
        <Fragment>
            <PageHeading text="Edit / Delete a Store" />
            {!storesStatus.isLoaded
                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                : stores && stores.length > 0
                    ? <div className="d-flex justify-content-center">
                        <div className="min-w-50 mx-auto">
                            <div className="mb-3 table-wrapper">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr className="bg-gray6">
                                            <th></th>
                                            <th></th>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Address</th>
                                            <th>City</th>
                                            <th>State</th>
                                            <th>Zip</th>
                                            <th>Phone</th>
                                            <th>Map URL</th>
                                            <th>Active</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stores.map((store) => (
                                            <tr key={store.store_id}>
                                                <td><button onClick={() => updateStore}>Update</button></td>
                                                <td><button onClick={() => deleteStore}>Delete</button></td>
                                                <td>{store.store_id}</td>
                                                <td><input onChange={handleChange} id={store.store_id} name="store_name" value={store.store_name} /></td>
                                                <td>{store.store_address}</td>
                                                <td>{store.store_city}</td>
                                                <td>{store.store_state}</td>
                                                <td>{store.store_zip}</td>
                                                <td>{store.store_phone}</td>
                                                <td>{store.map_url}</td>
                                                <td>{store.active}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    : stores
                        ? <span className="empty-result">There are no stores to display!</span>
                        : <span className="empty-result">{storesStatus.errorMsg}</span>
            }
        </Fragment>
    );
};

export default EditStore;

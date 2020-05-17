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
                                                <td>{store.store_id}</td>
                                                <td>{store.store_name}</td>
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

import React, { useState, useEffect, Fragment } from 'react';
import PageHeading from '../../../components/pageHeading/pageHeading';
import axios from 'axios';
import StoreSelected from '../subcomponents/storesSelected';
import StoreUnselected from '../subcomponents/storesUnselected';

const EditStore = () => {
    const [stores, setStores] = useState(null);
    const [storesStatus, setStoresStatus] = useState({ errorMsg: undefined, isLoaded: false });

    const [selectedStore, setSelectedStore] = useState(null);

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

    function deleteStore() {

    }

    const handleChange = e => {
        const { name, value } = e.target;
        setSelectedStore(prevState => ({
            ...prevState,
            [name]: value,
        }));
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
                                                <td><button onClick={() => setSelectedStore(store)}>Update</button><button onClick={() => deleteStore}>Delete</button></td>
                                                {(selectedStore && selectedStore.store_id === store.store_id) ? <StoreSelected selectedStore={selectedStore} handleChange={handleChange} /> : <StoreUnselected store={store} />}
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

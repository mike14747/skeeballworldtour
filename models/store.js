const connection = require('../config/connection.js');

const Store = {
    // find all stores that are active
    selectAllActive: (cb) => {
        const queryString = 'SELECT store_id, store_name, store_address, store_city, store_state, store_zip, store_phone, map_url FROM stores WHERE active=1 ORDER BY store_name ASC;';
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    // find a specific store based on store_id
    selectOneActive: (id, cb) => {
        const queryString = 'SELECT store_id, store_name, store_address, store_city, store_state, store_zip, store_phone, map_url FROM stores WHERE active=1 && store_id=? LIMIT 1;';
        connection.execute(queryString, [id], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
};

module.exports = Store;

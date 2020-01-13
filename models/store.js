const pool = require('../config/pool.js');

const Store = {
    // find all stores that are active
    getAllActive: async () => {
        const queryString = 'SELECT store_id, store_name, store_address, store_city, store_state, store_zip, store_phone, map_url FROM stores WHERE active=1 ORDER BY store_name ASC;';
        const [result] = await pool.query(queryString);
        return result;
    },
    // find a specific store based on store_id
    getOneActive: async (id, cb) => {
        const queryString = 'SELECT store_id, store_name, store_address, store_city, store_state, store_zip, store_phone, map_url FROM stores WHERE active=1 && store_id=? LIMIT 1;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    getOneStoreDivision: async (paramsObj) => {
        console.log(paramsObj);
        const queryString = 'SELECT s.store_id, s.store_name, d.division_id, d.day_name FROM (SELECT store_id, store_name FROM stores WHERE store_id=? LIMIT 1) AS s, (SELECT division_id, day_name FROM divisions WHERE division_id=? LIMIT 1) AS d';
        const queryParams = [paramsObj.store_id, paramsObj.division_id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
};

module.exports = Store;

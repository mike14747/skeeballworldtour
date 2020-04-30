const pool = require('../config/connectionPool.js').getDb();

const Store = {
    getAllActive: async () => {
        try {
            const queryString = 'SELECT store_id, store_name, store_address, store_city, store_state, store_zip, store_phone, map_url FROM stores WHERE active=1 ORDER BY store_name ASC;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getOneActive: async (paramsObj) => {
        try {
            const queryString = 'SELECT store_id, store_name, store_address, store_city, store_state, store_zip, store_phone, map_url FROM stores WHERE active=1 && store_id=? LIMIT 1;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getOneStoreDivision: async (paramsObj) => {
        try {
            const queryString = 'SELECT s.store_id, s.store_name, d.division_id, d.day_name FROM (SELECT store_id, store_name FROM stores WHERE store_id=? LIMIT 1) AS s, (SELECT division_id, day_name FROM divisions WHERE division_id=? LIMIT 1) AS d';
            const queryParams = [
                paramsObj.store_id,
                paramsObj.division_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
};

module.exports = Store;

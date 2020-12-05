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
            const queryString = 'SELECT s.store_id, s.store_name, d.division_id, d.day_name FROM (SELECT store_id, store_name FROM stores WHERE store_id=? LIMIT 1) AS s, (SELECT division_id, day_name FROM divisions WHERE division_id=? LIMIT 1) AS d;';
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
    getAllStores: async (paramsObj) => {
        try {
            const queryString = 'SELECT store_id, store_name, store_address, store_city, store_state, store_zip, store_phone, map_url, active FROM stores ORDER BY store_name ASC;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getStoreById: async (paramsObj) => {
        try {
            const queryString = 'SELECT store_id, store_name, store_address, store_city, store_state, store_zip, store_phone, map_url, active FROM stores WHERE store_id=? ORDER BY store_name ASC;';
            const queryParams = [
                paramsObj.store_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    updateStore: async (paramsObj) => {
        try {
            const queryString = 'UPDATE stores SET store_name=?, store_address=?, store_city=?, store_zip=?, store_phone=?, map_url=?, active=? WHERE store_id=?;';
            const queryParams = [
                paramsObj.store_name,
                paramsObj.store_address,
                paramsObj.store_city,
                paramsObj.store_state,
                paramsObj.store_zip,
                paramsObj.store_phone,
                paramsObj.map_url,
                paramsObj.active,
                paramsObj.store_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    deleteStore: async (paramsObj) => {
        try {
            const queryString = 'DELETE FROM stores WHERE store_id=?;';
            const queryParams = [
                paramsObj.store_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
};

module.exports = Store;

const pool = require('../config/connectionPool.js').getDb();

const User = {
    getUserById: async (paramsObj) => {
        try {
            const queryString = 'SELECT user_id, username FROM users WHERE user_id=? LIMIT 1;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getUserByUsername: async (paramsObj) => {
        try {
            const queryString = 'SELECT user_id, username, hashed_password FROM users WHERE username=? LIMIT 1;';
            const queryParams = [
                paramsObj.username,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
};

module.exports = User;

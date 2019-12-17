const pool = require('../config/pool.js');

const Champion = {
    getAllChampions: async () => {
        const queryString = '';
        const [result] = await pool.query(queryString);
        return result;
    },
};

module.exports = Champion;

const pool = require('../config/pool.js');

const Player = {
    searchPlayers: async (criteria) => {
        const formattedCriteria = '%' + criteria + '%';
        const queryString = 'SELECT p.player_id, p.full_name, s.store_id, s.store_city FROM players AS p JOIN stores AS s ON (p.store_id=s.store_id) WHERE p.full_name LIKE ? ORDER BY p.full_name ASC;';
        const queryParams = [formattedCriteria];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
};

module.exports = Player;

const pool = require('../config/pool.js');

const Player = {
    searchPlayers: async (criteria) => {
        const formattedCriteria = '%' + criteria + '%';
        const queryString = 'SELECT p.player_id, p.full_name, s.store_id, s.store_city FROM players AS p JOIN stores AS s ON (p.store_id=s.store_id) WHERE p.full_name LIKE ? ORDER BY p.full_name ASC;';
        const queryParams = [formattedCriteria];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    getPlayersOnTeamInSeason: async (paramsObj) => {
        const queryString = 'SELECT p.full_name, r.player_id, COUNT(*)*10 AS games_played, AVG(r.g1+r.g2+r.g3+r.g4+r.g5+r.g6+r.g7+r.g8+r.g9+r.g10)/10 AS avg_score FROM players AS p JOIN results AS r ON (p.player_id=r.player_id) WHERE r.season_id=? && team_id=? && r.player_id!=100 GROUP BY r.player_id ORDER BY avg_score DESC;';
        const queryParams = [paramsObj.season_id, paramsObj.team_id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
};

module.exports = Player;

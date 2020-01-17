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
    getPlayerNameAndStore: async (id) => {
        const queryString = 'SELECT s.store_name, p.full_name FROM players AS p JOIN stores AS s ON (p.store_id=s.store_id) WHERE p.player_id=? LIMIT 1;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    getPlayerResultsByPlayerSeasonId: async (paramsObj) => {
        const queryString = 'SELECT t.team_id, t.team_name, r.week_id, r.player_id, r.g1, r.g2, r.g3, r.g4, r.g5, r.g6, r.g7, r.g8, r.g9, r.g10 FROM results AS r JOIN teams AS t ON (r.team_id=t.team_id) WHERE season_id=? && player_id=? ORDER BY week_id ASC, team_id ASC, player_num ASC;';
        const queryParams = [paramsObj.season_id, paramsObj.player_id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    getSeasonsListByPlayerId: async (id) => {
        const queryString = 'SELECT DISTINCT(r.season_id), se.season_id, se.season_name, se.year FROM results AS r JOIN seasons AS se ON (r.season_id=se.season_id) WHERE r.player_id=? ORDER BY se.season_id DESC;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
};

module.exports = Player;

const pool = require('../config/connectionPool.js').getDb();

const Player = {
    searchPlayers: async (paramsObj) => {
        try {
            const queryString = 'SELECT pl.player_id, pl.full_name, GROUP_CONCAT(s.store_city ORDER BY s.store_city SEPARATOR", ") AS cities FROM (SELECT DISTINCT r.store_id, p.player_id, p.full_name FROM (SELECT player_id, full_name FROM players WHERE full_name LIKE ?) AS p INNER JOIN results AS r ON (p.player_id=r.player_id)) AS pl INNER JOIN stores AS s ON (s.store_id=pl.store_id) GROUP BY pl.player_id ORDER BY pl.full_name;';
            const queryParams = [
                '%' + paramsObj.criteria + '%',
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getPlayersOnTeamInSeason: async (paramsObj) => {
        try {
            const queryString = 'SELECT p.full_name, r.player_id, COUNT(*)*10 AS games_played, AVG(r.g1+r.g2+r.g3+r.g4+r.g5+r.g6+r.g7+r.g8+r.g9+r.g10)/10 AS avg_score FROM players AS p INNER JOIN results AS r ON (p.player_id=r.player_id) WHERE r.season_id=? && team_id=? && r.player_id!=100 GROUP BY r.player_id ORDER BY avg_score DESC;';
            const queryParams = [
                paramsObj.season_id,
                paramsObj.team_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getPlayerNameAndStore: async (paramsObj) => {
        try {
            const queryString = 'SELECT pl.full_name, pl.store_id, GROUP_CONCAT(pl.store_city ORDER BY pl.store_city SEPARATOR", ") AS cities FROM (SELECT r.store_id, s.store_city, p.full_name FROM players AS p INNER JOIN results AS r ON (p.player_id=r.player_id) INNER JOIN stores AS s ON (r.store_id=s.store_id) WHERE p.player_id=? GROUP BY r.store_id) AS pl;';
            const queryParams = [
                paramsObj.player_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getCurrentStores: async (paramsObj) => {
        try {
            const queryString = 'SELECT GROUP_CONCAT(pl.store_division ORDER BY pl.store_division SEPARATOR", ") AS stores FROM (SELECT CONCAT(s.store_city, " (", d.day_name, ")") AS store_division FROM results AS r INNER JOIN stores AS s ON (r.store_id=s.store_id) INNER JOIN divisions AS d ON (r.division_id=d.division_id) WHERE r.player_id=? && r.season_id=? GROUP BY r.store_id, r.division_id) AS pl;';
            const queryParams = [
                paramsObj.player_id,
                paramsObj.season_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getPlayerResultsByPlayerSeasonId: async (paramsObj) => {
        try {
            const queryString = 'SELECT t.team_id, t.team_name, r.week_id, r.player_id, r.g1, r.g2, r.g3, r.g4, r.g5, r.g6, r.g7, r.g8, r.g9, r.g10 FROM results AS r INNER JOIN teams AS t ON (r.team_id=t.team_id) WHERE season_id=? && player_id=? ORDER BY week_id ASC, team_id ASC, player_num ASC;';
            const queryParams = [
                paramsObj.season_id,
                paramsObj.player_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getSeasonsListByPlayerId: async (paramsObj) => {
        try {
            const queryString = 'SELECT DISTINCT(r.season_id), se.season_name, se.year FROM results AS r INNER JOIN seasons AS se ON (r.season_id=se.season_id) WHERE r.player_id=? ORDER BY se.season_id DESC;';
            const queryParams = [
                paramsObj.player_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
};

module.exports = Player;

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
    getAllPlayersForMongo: async () => {
        try {
            const queryString = 'SELECT p.player_id, p.full_name, st.store_id, st.store_city FROM players AS p LEFT JOIN stores AS st ON p.store_id=st.store_id ORDER BY p.player_id ASC;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getPlayersCareerStatsForMongo: async (paramsObj) => {
        try {
            const queryString = 'SET @player_id=?;SELECT r.player_id, AVG(r.score) AS avg_score, COUNT(*) AS games_played, COUNT(CASE WHEN r.score>=300 THEN 1 ELSE null END) AS games300, COUNT(CASE WHEN r.score>=400 THEN 1 ELSE null END) AS games400, COUNT(CASE WHEN r.score>=500 THEN 1 ELSE null END) AS games500, COUNT(CASE WHEN r.score>=600 THEN 1 ELSE null END) AS games600 , COUNT(CASE WHEN r.score>=700 THEN 1 ELSE null END) AS games700, COUNT(CASE WHEN r.score>=800 THEN 1 ELSE null END) AS games800, SUM(r.score) AS total_points, hlg.high_game, COUNT(CASE WHEN r.score=hlg.high_game THEN 1 ELSE null END) AS num_high_games, hlg.low_game, COUNT(CASE WHEN r.score=hlg.low_game THEN 1 ELSE null END) AS num_low_games, tg.ten_game FROM results_new AS r, (SELECT MAX(rn.score) AS high_game, MIN(score) as low_game FROM results_new AS rn WHERE player_id=@player_id) AS hlg, (SELECT SUM(score) AS ten_game FROM results_new WHERE player_id=@player_id GROUP BY season_id, week_id, team_id, player_num ORDER BY ten_game DESC LIMIT 1) AS tg WHERE r.player_id=@player_id GROUP BY r.player_id;';
            const queryParams = [
                paramsObj.player_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getPlayersSeasonalStatsForMongo: async (paramsObj) => {
        try {
            const queryString = 'SET @player_id=?;SELECT r.season_id, se.season_name, se.year, se.season_games, r.player_id, AVG(r.score) AS avg_score, COUNT(*) AS games_played, COUNT(CASE WHEN r.score>=300 THEN 1 ELSE null END) AS games300, COUNT(CASE WHEN r.score>=400 THEN 1 ELSE null END) AS games400, COUNT(CASE WHEN r.score>=500 THEN 1 ELSE null END) AS games500, COUNT(CASE WHEN r.score>=600 THEN 1 ELSE null END) AS games600 , COUNT(CASE WHEN r.score>=700 THEN 1 ELSE null END) AS games700, COUNT(CASE WHEN r.score>=800 THEN 1 ELSE null END) AS games800, SUM(r.score) AS total_points, hlg.high_game, COUNT(CASE WHEN r.score=hlg.high_game THEN 1 ELSE null END) AS num_high_games, hlg.low_game, COUNT(CASE WHEN r.score=hlg.low_game THEN 1 ELSE null END) AS num_low_games, tg.ten_game FROM results_new AS r INNER JOIN seasons AS se ON r.season_id=se.season_id INNER JOIN (SELECT tgs.season_id, MAX(tgs.ten_game) AS ten_game FROM (SELECT season_id, SUM(score) AS ten_game FROM results_new WHERE player_id=@player_id GROUP BY season_id, week_id, team_id, player_num ORDER BY season_id ASC) AS tgs GROUP BY tgs.season_id) AS tg ON r.season_id=tg.season_id INNER JOIN (SELECT rn.season_id, MAX(rn.score) AS high_game, MIN(rn.score) as low_game FROM results_new AS rn WHERE rn.player_id=@player_id GROUP BY rn.season_id) AS hlg ON r.season_id=hlg.season_id WHERE r.player_id=@player_id GROUP BY r.player_id, r.season_id;';
            const queryParams = [
                paramsObj.player_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
};

module.exports = Player;

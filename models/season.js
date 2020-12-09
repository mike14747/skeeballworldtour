const pool = require('../config/connectionPool.js').getDb();

const Season = {
    getAllSeasons: async () => {
        try {
            const queryString = 'SELECT se.season_id, se.season_num, se.season_name, se.year, se.season_games, se.tourny_team_id, se.comments, se.reg_ends, se.start_date, se.end_date, se.tourny_date FROM seasons AS se;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getSeasonById: async (paramsObj) => {
        try {
            const queryString = 'SELECT se.season_id, se.season_num, se.season_name, se.year, se.season_games, se.tourny_team_id, se.comments, se.reg_ends, se.start_date, se.end_date, se.tourny_date FROM seasons AS se WHERE se.season_id=? LIMIT 1;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getSeasonNameYearById: async (paramsObj) => {
        try {
            const queryString = 'SELECT se.season_name, se.year FROM seasons AS se WHERE se.season_id=? LIMIT 1;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getAllChampions: async () => {
        try {
            const queryString = 'SELECT s.season_id, s.season_name, s.year, s.tourny_team_id, t.team_name, st.store_city, s.comments FROM seasons AS s JOIN teams AS t ON t.team_id=s.tourny_team_id JOIN stores AS st ON st.store_id=t.store_id WHERE s.tourny_team_id>0 ORDER by s.season_id ASC;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getAllSeasonsForMongo: async () => {
        try {
            const queryString = 'SELECT se.season_id, se.season_num, se.season_name, se.year, se.season_games, IF(se.tourny_team_id > 0, se.tourny_team_id, null) AS tourny_team_id, t.team_name, IF(se.tourny_team_id > 0, st.store_city, null) AS store_city, se.comments, DATE_FORMAT(se.reg_ends, "%Y-%m-%d") AS reg_ends, DATE_FORMAT(se.start_date, "%Y-%m-%d") AS start_date, DATE_FORMAT(se.end_date, "%Y-%m-%d") AS end_date, DATE_FORMAT(se.tourny_date, "%Y-%m-%d") AS tourny_date FROM seasons AS se LEFT JOIN teams AS t on se.tourny_team_id=t.team_id LEFT JOIN stores AS st ON t.store_id=st.store_id;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
};

module.exports = Season;

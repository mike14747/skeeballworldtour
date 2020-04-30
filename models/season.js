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
};

module.exports = Season;

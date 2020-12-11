const pool = require('../config/connectionPool.js').getDb();

const Standings = {
    getStandingsBySeasonId: async (paramsObj) => {
        try {
            const queryString = 'SELECT st.standings_id, CONCAT(st.store_id,st.division_id) AS store_division, s.store_id, s.store_city, t.team_id, t.team_name, st.wins, st.losses, st.ties, st.total_points, d.division_id, d.day_name FROM standings AS st JOIN stores AS s ON (st.store_id=s.store_id) JOIN teams AS t ON (st.team_id=t.team_id) JOIN divisions AS d ON (st.division_id=d.division_id) WHERE st.season_id=? ORDER BY s.store_city ASC, d.division_id ASC, st.standings_order ASC;';
            const queryParams = [
                paramsObj.seasonId,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getSeasonsList: async () => {
        try {
            const queryString = 'SELECT DISTINCT(st.season_id), se.season_id, se.season_name, se.year FROM standings AS st JOIN seasons AS se ON (st.season_id=se.season_id) ORDER BY se.season_id DESC;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getStandingsByStoreDivisionSeasonIds: async (paramsObj) => {
        try {
            const queryString = 'SELECT st.standings_id, CONCAT(st.store_id,st.division_id) AS store_division, s.store_id, s.store_city, t.team_id, t.team_name, st.wins, st.losses, st.ties, st.total_points, d.division_id, d.day_name FROM standings AS st JOIN stores AS s ON (st.store_id=s.store_id) JOIN teams AS t ON (st.team_id=t.team_id) JOIN divisions AS d ON (st.division_id=d.division_id) WHERE st.store_id=? && st.division_id=? && st.season_id=? ORDER BY st.standings_order ASC;';
            const queryParams = [
                paramsObj.storeId,
                paramsObj.divisionId,
                paramsObj.seasonId,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getAllStandingsForMongo: async () => {
        const queryString = 'SELECT st.season_id, se.season_num, se.season_name, se.year, se.season_games, st.store_id, sto.store_city, st.division_id, d.day_name, st.team_id, t.team_name, st.wins, st.losses, st.ties, st.total_points, st.standings_order FROM standings AS st INNER JOIN seasons AS se ON st.season_id=se.season_id INNER JOIN stores AS sto ON st.store_id=sto.store_id INNER JOIN divisions AS d ON st.division_id=d.division_id INNER JOIN teams AS t ON st.team_id=t.team_id ORDER BY st.season_id ASC, st.store_id ASC, st.division_id ASC, st.standings_order ASC;';
        const queryParams = [];
        return await pool.query(queryString, queryParams)
            .then(([rows]) => [rows, null])
            .catch(error => [null, error]);
    },
};

module.exports = Standings;

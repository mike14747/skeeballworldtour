const pool = require('../config/connectionPool.js').getDb();

const Schedule = {
    getCurrentStoresDivisions: async (paramsObj) => {
        try {
            const queryString = 'SELECT DISTINCT sc.division_id, d.day_name, s.store_id, s.store_city, CONCAT(s.store_id,sc.division_id) AS store_division FROM schedule AS sc JOIN divisions AS d ON (sc.division_id=d.division_id) JOIN stores AS s ON (sc.store_id=s.store_id) WHERE sc.season_id=? && s.active=1 ORDER BY s.store_city, d.division_id ASC;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getSeasonsList: async (paramsObj) => {
        try {
            const queryString = 'SELECT DISTINCT(sc.season_id), se.season_id, se.season_name, se.year FROM schedule AS sc JOIN seasons AS se ON (sc.season_id=se.season_id) WHERE sc.store_id=? && sc.division_id=? ORDER BY se.season_id DESC;';
            const queryParams = [
                paramsObj.store_id,
                paramsObj.division_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getSchedulesByStoreDivisionSeason: async (paramsObj) => {
        try {
            const queryString = 'SELECT ds.week_id, DATE_FORMAT(ds.week_date, "%M %d, %Y") AS week_date1, ds.away_team_id, (SELECT t.team_name FROM teams AS t WHERE t.team_id=ds.away_team_id) AS away_team, ds.home_team_id, (SELECT t.team_name FROM teams AS t WHERE t.team_id=ds.home_team_id) AS home_team, ds.alley, ds.start_time FROM (SELECT sc.week_id, sc.week_date, sc.away_team_id AS away_team_id, sc.home_team_id AS home_team_id, sc.alley AS alley, sc.start_time AS start_time FROM schedule AS sc WHERE sc.store_id=? && sc.division_id=? && sc.season_id=? ORDER BY sc.week_id ASC, sc.start_time ASC, sc.alley ASC) AS ds JOIN teams AS t ON (ds.away_team_id=t.team_id) ORDER BY ds.week_id ASC, ds.start_time ASC, ds.alley ASC;';
            const queryParams = [
                paramsObj.store_id,
                paramsObj.division_id, paramsObj.season_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
};

module.exports = Schedule;

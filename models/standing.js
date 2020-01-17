const pool = require('../config/pool.js');

const Standings = {
    getStandingsBySeasonId: async (id) => {
        const queryString = 'SELECT st.standings_id, CONCAT(st.store_id,st.division_id) AS store_division, s.store_id, s.store_city, t.team_id, t.team_name, st.wins, st.losses, st.ties, st.total_points, d.division_id, d.day_name FROM standings AS st JOIN stores AS s ON (st.store_id=s.store_id) JOIN teams AS t ON (st.team_id=t.team_id) JOIN divisions AS d ON (st.division_id=d.division_id) WHERE st.season_id=? ORDER BY s.store_city ASC, d.division_id ASC, st.standings_order ASC;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    getSeasonsList: async () => {
        const queryString = 'SELECT DISTINCT(st.season_id), se.season_id, se.season_name, se.year FROM standings AS st JOIN seasons AS se ON (st.season_id=se.season_id) ORDER BY se.season_id DESC;';
        const [result] = await pool.query(queryString);
        return result;
    },
};

module.exports = Standings;

const connection = require("../config/connection.js");

const Standings = {
    // find standings for the selected season
    selectStandingsBySeason: (id, cb) => {
        const queryString = "SELECT st.standings_id, CONCAT(st.store_id,st.division_id) AS store_division, s.store_id, s.store_city, t.team_id, t.team_name, st.wins, st.losses, st.ties, st.total_points, d.division_id, d.day_name FROM standings AS st JOIN stores AS s ON (st.store_id=s.store_id) JOIN teams AS t ON (st.team_id=t.team_id) JOIN divisions AS d ON (st.division_id=d.division_id) WHERE st.season_id=? ORDER BY s.store_city ASC, d.division_id ASC, st.standings_order ASC;";
        connection.query(queryString, [id], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
}

module.exports = Standings;
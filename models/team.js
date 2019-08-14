const connection = require("../config/connection.js");

const Team = {
    // search the database for teams
    searchTeams: (criteria, cb) => {
        const formattedCriteria = "%" + criteria + "%";
        const queryString = "SELECT t.team_id, t.team_name, s.store_city FROM teams AS t JOIN stores AS s ON (t.store_id=s.store_id) WHERE t.team_name LIKE ? ORDER BY t.team_name ASC;";
        connection.execute(queryString, [formattedCriteria], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
}

module.exports = Team;
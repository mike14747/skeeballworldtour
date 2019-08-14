const connection = require("../config/connection.js");

const Player = {
    // search the database for players
    searchPlayers: (criteria, cb) => {
        const formattedCriteria = "%" + criteria + "%";
        const queryString = "SELECT p.player_id, p.full_name, s.store_id, s.store_city FROM players AS p JOIN stores AS s ON (p.store_id=s.store_id) WHERE p.full_name LIKE ? ORDER BY p.full_name ASC;";
        connection.execute(queryString, [formattedCriteria], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
}

module.exports = Player;
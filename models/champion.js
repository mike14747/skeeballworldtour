const pool = require('../config/pool.js');

const Champion = {
    getAllChampions: async () => {
        const queryString = 'SELECT s.season_name, s.year, s.tourny_team_id, t.team_name, st.store_city, s.comments FROM seasons AS s JOIN teams AS t ON t.team_id=s.tourny_team_id JOIN stores AS st ON st.store_id=t.store_id WHERE s.tourny_team_id>0 ORDER by s.season_id ASC;';
        const [result] = await pool.query(queryString);
        return result;
    },
};

module.exports = Champion;

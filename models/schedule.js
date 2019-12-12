const pool = require('../config/pool.js');

const Schedule = {
    // find all stores, divisiobs in the current season's schedule
    getCurrentStoreDivision: (curSeason, cb) => {
        const queryString = 'SELECT DISTINCT sc.division_id, d.day_name, s.store_id, s.store_city, CONCAT(s.store_id,sc.division_id) AS store_division FROM schedule AS sc JOIN divisions AS d ON (sc.division_id=d.division_id) JOIN stores AS s ON (sc.store_id=s.store_id) WHERE sc.season_id=? && s.active=1 ORDER BY s.store_city, d.division_id ASC;';
        pool.execute(queryString, [curSeason], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
};

module.exports = Schedule;

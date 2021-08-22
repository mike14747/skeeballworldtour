const pool = require('../config/connectionPool.js').getDb();

const Results = {
    getSeasonsList: async (paramsObj) => {
        try {
            const queryString = 'SELECT DISTINCT(r.season_id), se.season_id, se.season_name, se.year FROM results AS r JOIN seasons AS se ON (r.season_id=se.season_id) WHERE r.store_id=? && r.division_id=? ORDER BY se.season_id DESC;';
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
    getResultsByStoreDivisionSeason: async (paramsObj) => {
        try {
            let hA;
            let homeAway;
            let innerString = '';
            for (let i = 1; i <= 2; i++) {
                let playerNum = 1;
                let gameNum = 1;
                if (i === 1) {
                    hA = 'a';
                    homeAway = 'away';
                } else if (i === 2) {
                    hA = 'h';
                    homeAway = 'home';
                }
                while (playerNum <= 3 && gameNum <= 10) {
                    if (playerNum === 1 && gameNum === 1) {
                        innerString += 'MAX(CASE WHEN t.team_id=s.' + homeAway + '_team_id THEN t.team_name ELSE NULL END) AS ' + hA + 't, ';
                    }
                    if (gameNum === 1) {
                        innerString += 'MAX(CASE WHEN r.team_id=s.' + homeAway + '_team_id && r.player_num=' + playerNum + ' THEN r.player_id ELSE NULL END) AS ' + hA + 'p' + playerNum + 'id, MAX(CASE WHEN r.team_id=s.' + homeAway + '_team_id && r.player_num=' + playerNum + ' THEN p.full_name ELSE NULL END) AS ' + hA + 'p' + playerNum + ', ';
                    }
                    innerString += 'MAX(CASE WHEN r.team_id=s.' + homeAway + '_team_id && r.player_num=' + playerNum + ' THEN r.g' + gameNum + ' ELSE NULL END) AS ' + hA + 'p' + playerNum + 'g' + gameNum;
                    if (i !== 2 || playerNum !== 3 || gameNum !== 10) {
                        innerString += ', ';
                    }
                    if (gameNum >= 1 && gameNum < 10) {
                        gameNum++;
                    } else if (gameNum === 10) {
                        gameNum = 1;
                        playerNum++;
                    }
                }
            }
            const queryString = 'SET @store_id=?;SET @division_id=?;SET @season_id=?;SELECT s.week_id, s.week_date1, s.away_team_id, s.home_team_id, s.alley, s.start_time, ' + innerString + ' FROM results AS r JOIN players AS p ON (r.player_id=p.player_id) JOIN teams AS t ON (r.team_id=t.team_id) JOIN (SELECT week_id, DATE_FORMAT(week_date, "%b-%d, %Y") AS week_date1, away_team_id, home_team_id, alley, start_time FROM schedule WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id ORDER BY week_id DESC, start_time ASC, alley ASC) AS s ON (r.week_id=s.week_id AND (r.team_id=s.away_team_id || r.team_id=s.home_team_id)) WHERE r.season_id=@season_id && r.store_id=@store_id && r.division_id=@division_id GROUP BY r.week_id, s.start_time, s.alley ORDER BY r.week_id DESC, s.start_time ASC, s.alley ASC, r.team_id ASC, r.player_num ASC;';
            const queryParams = [
                paramsObj.store_id,
                paramsObj.division_id,
                paramsObj.season_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getAllResults: async () => {
        try {
            const queryString = 'SELECT s.season_id, s.season_name, s.year, st.store_id, st.store_city, d.division_id, d.day_name, r.week_id, t.team_id, t.team_name, p.player_id, p.full_name, r.player_num, DATE_FORMAT(sc.week_date, "%Y-%m-%d") AS date, sc.start_time, sc.alley, IF(t.team_id=sc.away_team_id, "away", "home") AS type, r.g1, r.g2, r.g3, r.g4, r.g5, r.g6, r.g7, r.g8, r.g9, r.g10 FROM seasons AS s INNER JOIN results AS r USING (`season_id`) INNER JOIN stores AS st USING (`store_id`) INNER JOIN divisions AS d USING (`division_id`) INNER JOIN teams AS t USING (`team_id`) INNER JOIN players AS p USING (`player_id`) INNER JOIN schedule AS sc ON  r.season_id=sc.season_id && r.store_id=sc.store_id && r.division_id=sc.division_id && r.week_id=sc.week_id && (r.team_id=sc.away_team_id || r.team_id=sc.home_team_id) ORDER BY s.season_id ASC, st.store_id ASC, d.division_id ASC, r.week_id ASC, sc.start_time ASC, sc.alley ASC, type ASC, r.player_num ASC;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
};

module.exports = Results;

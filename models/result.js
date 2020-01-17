const pool = require('../config/pool.js');

const Results = {
    getSeasonsList: async (paramsObj) => {
        const queryString = 'SELECT DISTINCT(r.season_id), se.season_id, se.season_name, se.year FROM results AS r JOIN seasons AS se ON (r.season_id=se.season_id) WHERE r.store_id=? && r.division_id=? ORDER BY se.season_id DESC;';
        const queryParams = [paramsObj.store_id, paramsObj.division_id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    getResultsByStoreDivisionSeason: async (paramsObj) => {
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
        const queryParams = [paramsObj.store_id, paramsObj.division_id, paramsObj.season_id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
};

module.exports = Results;

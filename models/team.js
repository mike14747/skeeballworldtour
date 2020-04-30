const pool = require('../config/connectionPool.js').getDb();

const Team = {
    searchTeams: async (paramsObj) => {
        try {
            const queryString = 'SELECT te.team_id, te.team_name, GROUP_CONCAT(s.store_city ORDER BY s.store_city SEPARATOR", ") AS cities FROM (SELECT DISTINCT r.store_id, t.team_id, t.team_name FROM (SELECT team_id, team_name FROM teams WHERE team_name LIKE ?) AS t INNER JOIN results AS r ON (t.team_id=r.team_id)) AS te INNER JOIN stores AS s ON (s.store_id=te.store_id) GROUP BY te.team_id ORDER BY te.team_name;';
            const queryParams = [
                '%' + paramsObj.criteria + '%',
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getTeamStatsByTeamSeasonId: async (paramsObj) => {
        try {
            let subQueryString = '';
            for (let g = 1; g <= 10; g++) {
                subQueryString += 'SELECT season_id, team_id, SUM(g' + g + ') AS team_game FROM results WHERE season_id=@season_id && team_id=@team_id GROUP BY week_id';
                if (g < 10) {
                    subQueryString += ' UNION ALL ';
                }
            }
            const queryString = 'SET @team_id=?;SET @season_id=?;SELECT tg1.team_id, s.wins, s.losses, s.ties, s.total_points, ROUND((s.total_points/(s.wins+s.losses+s.ties)),1) AS one_game_avg, ROUND((s.total_points/((s.wins+s.losses+s.ties)/10)),1) AS ten_game_avg, (SELECT (SUM(g1)+SUM(g2)+SUM(g3)+SUM(g4)+SUM(g5)+SUM(g6)+SUM(g7)+SUM(g8)+SUM(g9)+SUM(g10)) AS tgh FROM results WHERE season_id=@season_id && team_id=@team_id GROUP BY week_id ORDER BY tgh DESC LIMIT 1) AS ten_game_high, (SELECT (SUM(g1)+SUM(g2)+SUM(g3)+SUM(g4)+SUM(g5)+SUM(g6)+SUM(g7)+SUM(g8)+SUM(g9)+SUM(g10)) AS tgl FROM results WHERE season_id=@season_id && team_id=@team_id GROUP BY week_id ORDER BY tgl ASC LIMIT 1) AS ten_game_low, tg1.one_game_low, tg1.one_game_high FROM standings AS s INNER JOIN (SELECT season_id, team_id, MIN(tg.team_game) AS one_game_low, MAX(tg.team_game) AS one_game_high FROM (' + subQueryString + ') AS tg) AS tg1 ON (s.season_id=tg1.season_id AND s.team_id=tg1.team_id) WHERE s.season_id=@season_id && s.team_id=@team_id GROUP BY tg1.team_id;';
            // console.log(queryString);
            const queryParams = [
                paramsObj.team_id,
                paramsObj.season_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getTeamNameAndStoreName: async (paramsObj) => {
        try {
            const queryString = 'SELECT te.team_name, te.store_id, GROUP_CONCAT(te.store_city ORDER BY te.store_city SEPARATOR", ") AS cities FROM (SELECT r.store_id, s.store_city, t.team_name FROM teams AS t INNER JOIN results AS r ON (t.team_id=r.team_id) INNER JOIN stores AS s ON (r.store_id=s.store_id) WHERE t.team_id=? GROUP BY r.store_id) AS te;';
            const queryParams = [
                paramsObj.team_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getCurrentStores: async (paramsObj) => {
        try {
            const queryString = 'SELECT GROUP_CONCAT(te.store_division ORDER BY te.store_division SEPARATOR", ") AS stores FROM (SELECT CONCAT(s.store_city, " (", d.day_name, ")") AS store_division FROM results AS r INNER JOIN stores AS s ON (r.store_id=s.store_id) INNER JOIN divisions AS d ON (r.division_id=d.division_id) WHERE r.team_id=? && r.season_id=? GROUP BY r.store_id, r.division_id) AS te;';
            const queryParams = [
                paramsObj.team_id,
                paramsObj.season_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getSeasonsListByTeamId: async (paramsObj) => {
        try {
            const queryString = 'SELECT DISTINCT(r.season_id), se.season_id, se.season_name, se.year FROM results AS r INNER JOIN seasons AS se ON (r.season_id=se.season_id) WHERE r.team_id=? ORDER BY se.season_id DESC;';
            const queryParams = [
                paramsObj.team_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getTeamInScheduleBySeason: async (paramsObj) => {
        try {
            const queryString = 'SET @team_id=?;SET @season_id=?;SELECT s.store_id, s.store_name, d.division_id, d.day_name FROM stores AS s, divisions AS d WHERE s.store_id IN (SELECT DISTINCT store_id FROM schedule WHERE season_id=@season_id && (away_team_id=@team_id || home_team_id=@team_id)) && d.division_id IN (SELECT DISTINCT division_id FROM schedule WHERE season_id=@season_id && (away_team_id=@team_id || home_team_id=@team_id)) ORDER BY d.division_id ASC LIMIT 1;';
            const queryParams = [
                paramsObj.team_id,
                paramsObj.season_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getTeamScheduleBySeason: async (paramsObj) => {
        try {
            const queryString = 'SET @team_id=?;SET @season_id=?;SELECT s.week_id, s.week_date1, s.alley, s.start_time, s.away_team_id, (SELECT team_name FROM teams WHERE team_id=s.away_team_id) AS away_team_name, s.home_team_id, (SELECT team_name FROM teams WHERE team_id=s.home_team_id) AS home_team_name FROM teams AS t, (SELECT week_id, DATE_FORMAT(week_date, "%M %d, %Y") AS week_date1, away_team_id, home_team_id, alley, start_time FROM schedule WHERE season_id=@season_id && (away_team_id=@team_id || home_team_id=@team_id) ORDER BY week_date ASC, start_time ASC, alley ASC) AS s GROUP BY s.week_date1, s.start_time, s.alley ORDER BY week_id ASC;';
            const queryParams = [
                paramsObj.team_id,
                paramsObj.season_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getTeamResultsBySeason: async (paramsObj) => {
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
            const queryString = 'SET @team_id=?;SET @season_id=?;SELECT s.week_id, s.week_date1, s.away_team_id, s.home_team_id, s.alley, s.start_time, ' + innerString + ' FROM results AS r INNER JOIN players AS p ON (r.player_id=p.player_id) INNER JOIN teams AS t ON (r.team_id=t.team_id) INNER JOIN (SELECT week_id, DATE_FORMAT(week_date, "%b-%d, %Y") AS week_date1, away_team_id, home_team_id, alley, start_time FROM schedule WHERE season_id=@season_id && (away_team_id=@team_id || home_team_id=@team_id) ORDER BY week_id DESC, start_time ASC, alley ASC) AS s ON (r.week_id=s.week_id AND (r.team_id=s.away_team_id || r.team_id=s.home_team_id)) WHERE r.season_id=@season_id GROUP BY r.week_id, s.start_time, s.alley ORDER BY r.week_id DESC, s.start_time ASC, s.alley ASC, r.team_id ASC, r.player_num ASC;';
            // console.log(queryString);
            const queryParams = [
                paramsObj.team_id,
                paramsObj.season_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
};

module.exports = Team;

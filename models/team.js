const pool = require('../config/pool.js');

const Team = {
    getTeamStatsByTeamSeasonId: async (paramsObj) => {
        let subQueryString = '';
        for (let g = 1; g <= 10; g++) {
            subQueryString += 'SELECT season_id, team_id, SUM(g' + g + ') AS team_game FROM results WHERE season_id=@season_id && team_id=@team_id GROUP BY week_id';
            if (g < 10) {
                subQueryString += ' UNION ALL ';
            }
        }
        const queryString = 'SET @team_id=?;SET @season_id=?;SELECT tg1.team_id, s.wins, s.losses, s.ties, s.total_points, ROUND((s.total_points/(s.wins+s.losses+s.ties)),1) AS one_game_avg, ROUND((s.total_points/((s.wins+s.losses+s.ties)/10)),1) AS ten_game_avg, (SELECT (SUM(g1)+SUM(g2)+SUM(g3)+SUM(g4)+SUM(g5)+SUM(g6)+SUM(g7)+SUM(g8)+SUM(g9)+SUM(g10)) AS tgh FROM results WHERE season_id=@season_id && team_id=@team_id GROUP BY week_id ORDER BY tgh DESC LIMIT 1) AS ten_game_high, (SELECT (SUM(g1)+SUM(g2)+SUM(g3)+SUM(g4)+SUM(g5)+SUM(g6)+SUM(g7)+SUM(g8)+SUM(g9)+SUM(g10)) AS tgl FROM results WHERE season_id=@season_id && team_id=@team_id GROUP BY week_id ORDER BY tgl ASC LIMIT 1) AS ten_game_low, tg1.one_game_low, tg1.one_game_high FROM standings AS s JOIN (SELECT season_id, team_id, MIN(tg.team_game) AS one_game_low, MAX(tg.team_game) AS one_game_high FROM (' + subQueryString + ') AS tg) AS tg1 ON (s.season_id=tg1.season_id AND s.team_id=tg1.team_id) WHERE s.season_id=@season_id && s.team_id=@team_id GROUP BY tg1.team_id;';
        const queryParams = [paramsObj.team_id, paramsObj.season_id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    getTeamNameAndStoreName: async (id) => {
        const queryString = 'SELECT s.store_name, t.team_name FROM teams AS t JOIN stores AS s ON (t.store_id=s.store_id) WHERE t.team_id=? LIMIT 1;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    getTeamBySeasons: async (id) => {
        const queryString = 'SELECT DISTINCT(r.season_id), se.season_id, se.season_name, se.year FROM results AS r JOIN seasons AS se ON (r.season_id=se.season_id) WHERE r.team_id=? ORDER BY se.season_id ASC;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    getTeamInScheduleBySeason: async (paramsObj) => {
        const queryString = 'SET @team_id=?;SET @season_id=?;SELECT s.store_id, s.store_name, d.division_id, d.day_name FROM stores AS s, divisions AS d WHERE s.store_id IN (SELECT DISTINCT store_id FROM schedule WHERE season_id=@season_id && (away_team_id=@team_id || home_team_id=@team_id)) && d.division_id IN (SELECT DISTINCT division_id FROM schedule WHERE season_id=@season_id && (away_team_id=@team_id || home_team_id=@team_id)) ORDER BY d.division_id ASC LIMIT 1;';
        const queryParams = [paramsObj.team_id, paramsObj.season_id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    searchTeams: async (criteria) => {
        const formattedCriteria = '%' + criteria + '%';
        const queryString = 'SELECT t.team_id, t.team_name, s.store_city FROM teams AS t JOIN stores AS s ON (t.store_id=s.store_id) WHERE t.team_name LIKE ? ORDER BY t.team_name ASC;';
        const queryParams = [formattedCriteria];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
};

module.exports = Team;

const pool = require('../config/pool.js');

const Team = {
    getTeamStatsByTeamSeasonId: async (paramsObj) => {
        const queryString = 'SET @team_id=?;SET @season_id=?;SELECT tg1.team_id, s.wins, s.losses, s.ties, s.total_points, ROUND((s.total_points/(s.wins+s.losses+s.ties)),1) AS one_game_avg, ROUND((s.total_points/((s.wins+s.losses+s.ties)/10)),1) AS ten_game_avg, (SELECT (SUM(g1)+SUM(g2)+SUM(g3)+SUM(g4)+SUM(g5)+SUM(g6)+SUM(g7)+SUM(g8)+SUM(g9)+SUM(g10)) AS tgh FROM results WHERE season_id=@season_id && team_id=@team_id GROUP BY week_id ORDER BY tgh DESC LIMIT 1) AS ten_game_high, (SELECT (SUM(g1)+SUM(g2)+SUM(g3)+SUM(g4)+SUM(g5)+SUM(g6)+SUM(g7)+SUM(g8)+SUM(g9)+SUM(g10)) AS tgl FROM results WHERE season_id=@season_id && team_id=@team_id GROUP BY week_id ORDER BY tgl ASC LIMIT 1) AS ten_game_low, tg1.one_game_low, tg1.one_game_high FROM standings AS s JOIN (SELECT season_id, team_id, MIN(tg.team_game) AS one_game_low, MAX(tg.team_game) AS one_game_high FROM (SELECT season_id, team_id, SUM(g1) AS team_game FROM results WHERE season_id=@season_id && team_id=@team_id GROUP BY week_id UNION ALL SELECT season_id, team_id, SUM(g2) AS team_game FROM results WHERE season_id=@season_id && team_id=@team_id GROUP BY week_id UNION ALL SELECT season_id, team_id, SUM(g3) AS team_game FROM results WHERE season_id=@season_id && team_id=@team_id GROUP BY week_id UNION ALL SELECT season_id, team_id, SUM(g4) AS team_game FROM results WHERE season_id=@season_id && team_id=@team_id GROUP BY week_id UNION ALL SELECT season_id, team_id, SUM(g5) AS team_game FROM results WHERE season_id=@season_id && team_id=@team_id GROUP BY week_id UNION ALL SELECT season_id, team_id, SUM(g6) AS team_game FROM results WHERE season_id=@season_id && team_id=@team_id GROUP BY week_id UNION ALL SELECT season_id, team_id, SUM(g7) AS team_game FROM results WHERE season_id=@season_id && team_id=@team_id GROUP BY week_id UNION ALL SELECT season_id, team_id, SUM(g8) AS team_game FROM results WHERE season_id=@season_id && team_id=@team_id GROUP BY week_id UNION ALL SELECT season_id, team_id, SUM(g9) AS team_game FROM results WHERE season_id=@season_id && team_id=@team_id GROUP BY week_id UNION ALL SELECT season_id, team_id, SUM(g10) AS team_game FROM results WHERE season_id=@season_id && team_id=@team_id GROUP BY week_id) AS tg) AS tg1 ON (s.season_id=tg1.season_id AND s.team_id=tg1.team_id) WHERE s.season_id=@season_id && s.team_id=@team_id GROUP BY tg1.team_id;';
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

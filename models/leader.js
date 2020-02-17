const pool = require('../config/pool.js');

const Leader = {
    getIndividualAverageBySeasonId: async (paramsObj) => {
        try {
            const queryString = 'SET @season_id=?;SELECT COUNT(*)*10 AS player_played, p.player_id, p.full_name, ROUND(AVG(r.g1+r.g2+r.g3+r.g4+r.g5+r.g6+r.g7+r.g8+r.g9+r.g10)/10,5) AS data, tp.season_id, tp.season_name, tp.year, tp.store_city, r.store_id, r.division_id, tp.team_played, tv2.tv21 FROM results AS r JOIN players AS p ON (r.player_id=p.player_id) JOIN (SELECT (st.wins+st.losses+st.ties) AS team_played, st.season_id, s.season_name, s.year, sto.store_city, st.store_id, st.division_id, st.team_id FROM standings AS st JOIN seasons AS s ON (st.season_id=s.season_id) JOIN stores AS sto ON (st.store_id=sto.store_id) ORDER BY st.season_id DESC, st.store_id ASC, st.division_id ASC, team_played DESC) AS tp ON (r.season_id=tp.season_id && r.store_id=tp.store_id && r.division_id=tp.division_id && r.team_id=tp.team_id), (SELECT MAX(CASE WHEN tv21_row=1 THEN tv1.tv21 ELSE 0 END) AS tv21 FROM (SELECT COUNT(*) AS tv21_row, tv.tv21 FROM (SELECT COUNT(*)*10 AS player_played, ROUND(AVG(r.g1+r.g2+r.g3+r.g4+r.g5+r.g6+r.g7+r.g8+r.g9+r.g10)/10,5) AS tv21, tp.team_played FROM results AS r JOIN (SELECT (wins+losses+ties) AS team_played, season_id, store_id, division_id, team_id FROM standings ORDER BY season_id DESC, store_id ASC, division_id ASC, team_played DESC) AS tp ON (r.season_id=tp.season_id && r.store_id=tp.store_id && r.division_id=tp.division_id && r.team_id=tp.team_id) WHERE r.season_id=@season_id && r.player_id!=100 GROUP BY r.season_id, r.player_id HAVING player_played>=team_played/2 ORDER BY tv21 DESC LIMIT ?, 1) AS tv) AS tv1) AS tv2 WHERE r.season_id=@season_id && r.player_id!=100 GROUP BY r.season_id, r.player_id HAVING player_played>=team_played/2 && data>=tv2.tv21 ORDER BY data DESC;';
            const queryParams = [
                paramsObj.season_id,
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getIndividualOneGameBySeasonId: async (paramsObj) => {
        try {
            const setTieValueVariables = 'SELECT r1.data, r2.data INTO @tie_value_num_leaders, @tie_value_num_leaders_plus_one FROM (SELECT tv1.data FROM (SELECT g1 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g2 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g3 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g4 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g5 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g6 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g7 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g8 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g9 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g10 AS data FROM results WHERE season_id=@season_id) AS tv1 ORDER BY data DESC LIMIT ?, 1) AS r1, (SELECT tv1.data FROM (SELECT g1 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g2 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g3 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g4 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g5 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g6 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g7 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g8 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g9 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g10 AS data FROM results WHERE season_id=@season_id) AS tv1 ORDER BY data DESC LIMIT ?, 1) AS r2;';
            const tiesInfo = 'SELECT (CASE WHEN @tie_value_num_leaders=@tie_value_num_leaders_plus_one THEN (SELECT COUNT(*) FROM ((SELECT g1 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g2 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g3 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g4 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g5 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g6 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g7 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g8 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g9 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT g10 AS data FROM results WHERE season_id=@season_id) AS ti) WHERE ti.data=@tie_value_num_leaders_plus_one) ELSE 1 END) AS num_at_tie_value, @tie_value_num_leaders AS tie_value;';
            const mainQuery = 'SELECT p.player_id AS field_id, p.full_name AS field_name, st.store_city, r.data FROM (SELECT ti.player_id, ti.data FROM (SELECT player_id, g1 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT player_id, g2 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT player_id, g3 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT player_id, g4 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT player_id, g5 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT player_id, g6 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT player_id, g7 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT player_id, g8 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT player_id, g9 AS data FROM results WHERE season_id=@season_id UNION ALL SELECT player_id, g10 AS data FROM results WHERE season_id=@season_id) AS ti WHERE ti.data>@tie_value_num_leaders_plus_one) AS r INNER JOIN players AS p ON (r.player_id=p.player_id) INNER JOIN stores AS st ON (p.store_id=st.store_id) ORDER BY data DESC;';
            const queryString = 'SET @season_id=?;' + setTieValueVariables + tiesInfo + mainQuery;
            const queryParams = [
                paramsObj.season_id,
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getIndividualTenGameBySeasonId: async (paramsObj) => {
        try {
            const setTieValueVariables = 'SELECT r1.data, r2.data INTO @tie_value_num_leaders, @tie_value_num_leaders_plus_one FROM (SELECT (g1+g2+g3+g4+g5+g6+g7+g8+g9+g10) as data FROM results WHERE season_id=@season_id && player_id!=100 GROUP BY player_id, week_id, team_id, player_num ORDER BY data DESC LIMIT ?, 1) AS r1, (SELECT (g1+g2+g3+g4+g5+g6+g7+g8+g9+g10) as data FROM results WHERE season_id=@season_id && player_id!=100 GROUP BY player_id, week_id, team_id, player_num ORDER BY data DESC LIMIT ?, 1) AS r2;';
            const tiesInfo = 'SELECT (CASE WHEN @tie_value_num_leaders=@tie_value_num_leaders_plus_one THEN (SELECT COUNT(*) FROM (SELECT (g1+g2+g3+g4+g5+g6+g7+g8+g9+g10) as data FROM results WHERE season_id=@season_id && player_id!=100 GROUP BY player_id, week_id, team_id, player_num HAVING data=@tie_value_num_leaders_plus_one) AS nt) ELSE 0 END) AS num_at_tie_value, @tie_value_num_leaders AS tie_value;';
            const mainQuery = 'SELECT p.player_id AS field_id, p.full_name AS field_name, st.store_city, r.data FROM (SELECT player_id, (g1+g2+g3+g4+g5+g6+g7+g8+g9+g10) as data FROM results WHERE season_id=@season_id && player_id!=100 GROUP BY player_id, week_id, team_id, player_num HAVING data>@tie_value_num_leaders_plus_one) AS r INNER JOIN players AS p ON (r.player_id=p.player_id) INNER JOIN stores AS st ON (p.store_id=st.store_id) ORDER BY data DESC;';
            const queryString = 'SET @season_id=?;' + setTieValueVariables + tiesInfo + mainQuery;
            const queryParams = [
                paramsObj.season_id,
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getTeamAverageBySeasonId: async (paramsObj) => {
        try {
            const queryString = 'SET @season_id=?;SELECT st.team_id, t.team_name, ROUND(10*total_points/(st.wins+st.losses+st.ties),5) AS avg, s.store_id, s.store_city, st.division_id, tv2.tv21 FROM standings AS st JOIN teams AS t ON (st.team_id=t.team_id) JOIN stores AS s ON (st.store_id=s.store_id), (SELECT MAX(CASE WHEN tv21_row=1 THEN tv1.tv21 ELSE 0 END) AS tv21 FROM (SELECT COUNT(*) AS tv21_row, tv.tv21 FROM (SELECT ROUND(10*total_points/(st.wins+st.losses+st.ties),5) AS tv21, st.store_id, st.division_id FROM standings AS st WHERE st.season_id=@season_id GROUP BY st.team_id ORDER BY tv21 DESC LIMIT ?, 1) AS tv) AS tv1) AS tv2 WHERE st.season_id=@season_id HAVING avg>=tv2.tv21 ORDER BY avg DESC;';
            const queryParams = [
                paramsObj.season_id,
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getTeamOneGameBySeasonId: async (paramsObj) => {
        try {
            const setTieValueVariables = 'SELECT r1.data, r2.data INTO @tie_value_num_leaders, @tie_value_num_leaders_plus_one FROM (SELECT tv1.data FROM (SELECT SUM(g1) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g2) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g3) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g4) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g5) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g6) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g7) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g8) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g9) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g10) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id) AS tv1 ORDER BY data DESC LIMIT ?, 1) AS r1, (SELECT tv1.data FROM (SELECT SUM(g1) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g2) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g3) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g4) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g5) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g6) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g7) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g8) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g9) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g10) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id) AS tv1 ORDER BY data DESC LIMIT ?, 1) AS r2;';
            const tiesInfo = 'SELECT (CASE WHEN @tie_value_num_leaders=@tie_value_num_leaders_plus_one THEN (SELECT COUNT(*) FROM ((SELECT SUM(g1) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g2) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g3) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g4) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g5) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g6) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g7) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g8) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g9) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g10) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id) AS ti) WHERE ti.data=@tie_value_num_leaders_plus_one) ELSE 1 END) AS num_at_tie_value, @tie_value_num_leaders AS tie_value;';
            const mainQuery = 'SELECT t.team_id AS field_id, t.team_name AS field_name, st.store_city, r.data FROM (SELECT ti.team_id, ti.data FROM (SELECT team_id, SUM(g1) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT team_id, SUM(g2) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT team_id, SUM(g3) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT team_id, SUM(g4) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT team_id, SUM(g5) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT team_id, SUM(g6) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT team_id, SUM(g7) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT team_id, SUM(g8) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT team_id, SUM(g9) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT team_id, SUM(g10) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id) AS ti WHERE ti.data>@tie_value_num_leaders_plus_one) AS r INNER JOIN teams AS t ON (r.team_id=t.team_id) INNER JOIN stores AS st ON (t.store_id=st.store_id) ORDER BY data DESC;';
            const queryString = 'SET @season_id=?;' + setTieValueVariables + tiesInfo + mainQuery;
            const queryParams = [
                paramsObj.season_id,
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getTeamTenGameBySeasonId: async (paramsObj) => {
        try {
            // const queryString = 'SET @season_id=?;SELECT r.team_id, t.team_name, (SUM(r.g1)+SUM(r.g2)+SUM(r.g3)+SUM(r.g4)+SUM(r.g5)+SUM(r.g6)+SUM(r.g7)+SUM(r.g8)+SUM(r.g9)+SUM(r.g10)) as pts, d.division_id, s.store_id, s.store_city, tv2.tv21 FROM results AS r JOIN stores AS s ON (r.store_id=s.store_id) JOIN divisions AS d ON (r.division_id=d.division_id) JOIN teams AS t ON (r.team_id=t.team_id), (SELECT MAX(CASE WHEN tv21_row=1 THEN tv1.tv21 ELSE 0 END) AS tv21 FROM (SELECT COUNT(*) AS tv21_row, tv.tv21 FROM (SELECT (SUM(g1)+SUM(g2)+SUM(g3)+SUM(g4)+SUM(g5)+SUM(g6)+SUM(g7)+SUM(g8)+SUM(g9)+SUM(g10)) as tv21 FROM results WHERE season_id=@season_id GROUP BY team_id, week_id ORDER BY tv21 DESC LIMIT ?, 1) AS tv) AS tv1) AS tv2 WHERE r.season_id=@season_id GROUP BY r.team_id, r.week_id HAVING pts>=tv2.tv21 ORDER BY pts DESC;';
            const setTieValueVariables = '';
            const tiesInfo = '';
            const mainQuery = '';
            const queryString = 'SET @season_id=?;' + setTieValueVariables + tiesInfo + mainQuery;
            const queryParams = [
                paramsObj.season_id,
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getSeasonsList: async () => {
        try {
            const queryString = 'SELECT DISTINCT(r.season_id), se.season_id, se.season_name, se.year FROM results AS r JOIN seasons AS se ON (r.season_id=se.season_id) ORDER BY se.season_id DESC;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
};

module.exports = Leader;

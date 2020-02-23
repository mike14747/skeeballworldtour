const pool = require('../config/pool.js');

const Leader = {
    getIndividualAverageBySeasonId: async (paramsObj) => {
        try {
            const setTieValueVariables = 'SELECT r1.data, r2.data INTO @tie_value_num_leaders, @tie_value_num_leaders_plus_one FROM (SELECT IFNULL((SELECT tv1.data FROM (SELECT COUNT(*)*10 AS player_played, ROUND(AVG(r.g1+r.g2+r.g3+r.g4+r.g5+r.g6+r.g7+r.g8+r.g9+r.g10)/10,5) AS data, tp.team_played FROM results AS r JOIN (SELECT (wins+losses+ties) AS team_played, season_id, store_id, division_id, team_id FROM standings ORDER BY season_id DESC, store_id ASC, division_id ASC, team_played DESC) AS tp ON (r.season_id=tp.season_id && r.store_id=tp.store_id && r.division_id=tp.division_id && r.team_id=tp.team_id) WHERE r.season_id=@season_id && r.player_id!=100 GROUP BY r.season_id, r.player_id HAVING player_played>=team_played/2 ORDER BY data DESC LIMIT ?, 1) AS tv1), 1) AS data) AS r1, (SELECT IFNULL((SELECT tv2.data FROM (SELECT COUNT(*)*10 AS player_played, ROUND(AVG(r.g1+r.g2+r.g3+r.g4+r.g5+r.g6+r.g7+r.g8+r.g9+r.g10)/10,5) AS data, tp.team_played FROM results AS r JOIN (SELECT (wins+losses+ties) AS team_played, season_id, store_id, division_id, team_id FROM standings ORDER BY season_id DESC, store_id ASC, division_id ASC, team_played DESC) AS tp ON (r.season_id=tp.season_id && r.store_id=tp.store_id && r.division_id=tp.division_id && r.team_id=tp.team_id) WHERE r.season_id=@season_id && r.player_id!=100 GROUP BY r.season_id, r.player_id HAVING player_played>=team_played/2 ORDER BY data DESC LIMIT ?, 1) AS tv2), 1) AS data) AS r2;';
            const tiesInfo = 'SELECT (CASE WHEN @tie_value_num_leaders=@tie_value_num_leaders_plus_one THEN (SELECT COUNT(*) FROM (SELECT COUNT(*)*10 AS player_played, ROUND(AVG(r.g1+r.g2+r.g3+r.g4+r.g5+r.g6+r.g7+r.g8+r.g9+r.g10)/10,5) AS data, tp.team_played FROM results AS r JOIN (SELECT (wins+losses+ties) AS team_played, season_id, store_id, division_id, team_id FROM standings ORDER BY season_id DESC, store_id ASC, division_id ASC, team_played DESC) AS tp ON (r.season_id=tp.season_id && r.store_id=tp.store_id && r.division_id=tp.division_id && r.team_id=tp.team_id) WHERE r.season_id=@season_id && r.player_id!=100 GROUP BY r.season_id, r.player_id HAVING player_played>=team_played/2 && data=@tie_value_num_leaders_plus_one) AS nt) ELSE 1 END) AS num_at_tie_value, @tie_value_num_leaders AS tie_value;';
            const mainQuery = 'SELECT p.player_id AS field_id, p.full_name AS field_name, st.store_city, COUNT(*)*10 AS player_played, ROUND(AVG(r.g1+r.g2+r.g3+r.g4+r.g5+r.g6+r.g7+r.g8+r.g9+r.g10)/10,5) AS data, tp.team_played FROM results AS r JOIN (SELECT (wins+losses+ties) AS team_played, season_id, store_id, division_id, team_id FROM standings ORDER BY season_id DESC, store_id ASC, division_id ASC, team_played DESC) AS tp ON (r.season_id=tp.season_id && r.store_id=tp.store_id && r.division_id=tp.division_id && r.team_id=tp.team_id) INNER JOIN players AS p ON (r.player_id=p.player_id) INNER JOIN stores AS st ON (p.store_id=st.store_id) WHERE r.season_id=@season_id && r.player_id!=100 GROUP BY r.season_id, r.player_id HAVING player_played>=team_played/2 && data>@tie_value_num_leaders_plus_one ORDER BY data DESC;';
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
    getIndividualOneGameBySeasonId: async (paramsObj) => {
        try {
            const setTieValueVariables = 'SELECT r1.data, r2.data INTO @tie_value_num_leaders, @tie_value_num_leaders_plus_one FROM (SELECT IFNULL((SELECT tv1.data FROM (SELECT g1 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g2 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g3 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g4 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g5 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g6 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g7 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g8 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g9 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g10 AS data FROM results WHERE season_id=@season_id && player_id!=100) AS tv1 ORDER BY data DESC LIMIT ?, 1), 1) AS data) AS r1, (SELECT IFNULL((SELECT tv1.data FROM (SELECT g1 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g2 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g3 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g4 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g5 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g6 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g7 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g8 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g9 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g10 AS data FROM results WHERE season_id=@season_id && player_id!=100) AS tv1 ORDER BY data DESC LIMIT ?, 1), 0) AS data) AS r2;';
            const tiesInfo = 'SELECT (CASE WHEN @tie_value_num_leaders=@tie_value_num_leaders_plus_one THEN (SELECT COUNT(*) FROM ((SELECT g1 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g2 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g3 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g4 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g5 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g6 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g7 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g8 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g9 AS data FROM results WHERE season_id=@season_id && player_id!=100 UNION ALL SELECT g10 AS data FROM results WHERE season_id=@season_id) AS ti) WHERE ti.data=@tie_value_num_leaders_plus_one) ELSE 1 END) AS num_at_tie_value, @tie_value_num_leaders AS tie_value;';
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
            const setTieValueVariables = 'SELECT r1.data, r2.data INTO @tie_value_num_leaders, @tie_value_num_leaders_plus_one FROM (SELECT IFNULL((SELECT (g1+g2+g3+g4+g5+g6+g7+g8+g9+g10) as data FROM results WHERE season_id=@season_id && player_id!=100 GROUP BY player_id, week_id, team_id, player_num ORDER BY data DESC LIMIT ?, 1), 1) AS data) AS r1, (SELECT IFNULL((SELECT (g1+g2+g3+g4+g5+g6+g7+g8+g9+g10) as data FROM results WHERE season_id=@season_id && player_id!=100 GROUP BY player_id, week_id, team_id, player_num ORDER BY data DESC LIMIT ?, 1), 0) AS data) AS r2;';
            const tiesInfo = 'SELECT (CASE WHEN @tie_value_num_leaders=@tie_value_num_leaders_plus_one THEN (SELECT COUNT(*) FROM (SELECT (g1+g2+g3+g4+g5+g6+g7+g8+g9+g10) as data FROM results WHERE season_id=@season_id && player_id!=100 GROUP BY player_id, week_id, team_id, player_num HAVING data=@tie_value_num_leaders_plus_one) AS nt) ELSE 1 END) AS num_at_tie_value, @tie_value_num_leaders AS tie_value;';
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
            const setTieValueVariables = 'SELECT r1.data, r2.data INTO @tie_value_num_leaders, @tie_value_num_leaders_plus_one FROM (SELECT IFNULL((SELECT ROUND(10*total_points/(st.wins+st.losses+st.ties),5) AS data FROM standings AS st WHERE st.season_id=@season_id GROUP BY st.team_id ORDER BY data DESC LIMIT ?, 1), 1) AS data) AS r1, (SELECT IFNULL((SELECT ROUND(10*total_points/(st.wins+st.losses+st.ties),5) AS data FROM standings AS st WHERE st.season_id=@season_id GROUP BY st.team_id ORDER BY data DESC LIMIT ?, 1), 0) AS data) AS r2;';
            const tiesInfo = 'SELECT (CASE WHEN @tie_value_num_leaders=@tie_value_num_leaders_plus_one THEN (SELECT COUNT(*) FROM (SELECT ROUND(10*total_points/(st.wins+st.losses+st.ties),5) AS data FROM standings AS st WHERE st.season_id=@season_id GROUP BY st.team_id HAVING data=@tie_value_num_leaders_plus_one) AS nt) ELSE 1 END) AS num_at_tie_value, @tie_value_num_leaders AS tie_value;';
            const mainQuery = 'SELECT t.team_id AS field_id, t.team_name AS field_name, s.store_city, st.data FROM (SELECT team_id, store_id, ROUND(10*total_points/(wins+losses+ties),5) AS data FROM standings WHERE season_id=@season_id GROUP BY team_id HAVING data>@tie_value_num_leaders_plus_one) as st JOIN teams AS t ON (st.team_id=t.team_id) JOIN stores AS s ON (st.store_id=s.store_id) ORDER BY st.data DESC;';
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
    getTeamOneGameBySeasonId: async (paramsObj) => {
        try {
            const setTieValueVariables = 'SELECT r1.data, r2.data INTO @tie_value_num_leaders, @tie_value_num_leaders_plus_one FROM (SELECT IFNULL((SELECT tv1.data FROM (SELECT SUM(g1) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g2) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g3) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g4) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g5) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g6) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g7) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g8) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g9) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g10) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id) AS tv1 ORDER BY data DESC LIMIT ?, 1), 1) AS data) AS r1, (SELECT IFNULL((SELECT tv1.data FROM (SELECT SUM(g1) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g2) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g3) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g4) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g5) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g6) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g7) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g8) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g9) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g10) AS data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id) AS tv1 ORDER BY data DESC LIMIT ?, 1), 0) AS data) AS r2;';
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
            const setTieValueVariables = 'SELECT r1.data, r2.data INTO @tie_value_num_leaders, @tie_value_num_leaders_plus_one FROM (SELECT IFNULL((SELECT (SUM(g1)+SUM(g2)+SUM(g3)+SUM(g4)+SUM(g5)+SUM(g6)+SUM(g7)+SUM(g8)+SUM(g9)+SUM(g10)) as data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id ORDER BY data DESC LIMIT ?, 1), 1) AS data) AS r1, (SELECT IFNULL((SELECT (SUM(g1)+SUM(g2)+SUM(g3)+SUM(g4)+SUM(g5)+SUM(g6)+SUM(g7)+SUM(g8)+SUM(g9)+SUM(g10)) as data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id ORDER BY data DESC LIMIT ?, 1), 0) AS data) AS r2;';
            const tiesInfo = 'SELECT (CASE WHEN @tie_value_num_leaders=@tie_value_num_leaders_plus_one THEN (SELECT COUNT(*) FROM (SELECT (SUM(g1)+SUM(g2)+SUM(g3)+SUM(g4)+SUM(g5)+SUM(g6)+SUM(g7)+SUM(g8)+SUM(g9)+SUM(g10)) as data FROM results WHERE season_id=@season_id GROUP BY team_id, week_id HAVING data=@tie_value_num_leaders_plus_one ORDER BY data DESC) AS nt) ELSE 1 END) AS num_at_tie_value, @tie_value_num_leaders AS tie_value;';
            const mainQuery = 'SELECT t.team_id AS field_id, t.team_name AS field_name, st.store_city, (SUM(r.g1)+SUM(r.g2)+SUM(r.g3)+SUM(r.g4)+SUM(r.g5)+SUM(r.g6)+SUM(r.g7)+SUM(r.g8)+SUM(r.g9)+SUM(r.g10)) as data FROM results AS r INNER JOIN teams AS t ON (r.team_id=t.team_id) INNER JOIN stores AS st ON (t.store_id=st.store_id) WHERE r.season_id=@season_id GROUP BY r.team_id, r.week_id HAVING data>@tie_value_num_leaders_plus_one ORDER BY data DESC;';
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
    getIndividualAverageBySeasonStoreDivisionId: async (paramsObj) => {
        try {
            const setTieValueVariables = 'SELECT r1.data, r2.data INTO @tie_value_num_leaders, @tie_value_num_leaders_plus_one FROM (SELECT IFNULL((SELECT tv1.data FROM (SELECT COUNT(*)*10 AS player_played, ROUND(AVG(r.g1+r.g2+r.g3+r.g4+r.g5+r.g6+r.g7+r.g8+r.g9+r.g10)/10,5) AS data, tp.team_played FROM results AS r JOIN (SELECT (wins+losses+ties) AS team_played, season_id, store_id, division_id, team_id FROM standings ORDER BY season_id DESC, store_id ASC, division_id ASC, team_played DESC) AS tp ON (r.season_id=tp.season_id && r.store_id=tp.store_id && r.division_id=tp.division_id && r.team_id=tp.team_id) WHERE r.season_id=@season_id && r.player_id!=100 && r.store_id=@store_id && r.division_id=@division_id GROUP BY r.season_id, r.player_id HAVING player_played>=team_played/2 ORDER BY data DESC LIMIT ?, 1) AS tv1), 1) AS data) AS r1, (SELECT IFNULL((SELECT tv2.data FROM (SELECT COUNT(*)*10 AS player_played, ROUND(AVG(r.g1+r.g2+r.g3+r.g4+r.g5+r.g6+r.g7+r.g8+r.g9+r.g10)/10,5) AS data, tp.team_played FROM results AS r JOIN (SELECT (wins+losses+ties) AS team_played, season_id, store_id, division_id, team_id FROM standings ORDER BY season_id DESC, store_id ASC, division_id ASC, team_played DESC) AS tp ON (r.season_id=tp.season_id && r.store_id=tp.store_id && r.division_id=tp.division_id && r.team_id=tp.team_id) WHERE r.season_id=@season_id && r.player_id!=100 && r.store_id=@store_id && r.division_id=@division_id GROUP BY r.season_id, r.player_id HAVING player_played>=team_played/2 ORDER BY data DESC LIMIT ?, 1) AS tv2), 1) AS data) AS r2;';
            const tiesInfo = 'SELECT (CASE WHEN @tie_value_num_leaders=@tie_value_num_leaders_plus_one THEN (SELECT COUNT(*) FROM (SELECT COUNT(*)*10 AS player_played, ROUND(AVG(r.g1+r.g2+r.g3+r.g4+r.g5+r.g6+r.g7+r.g8+r.g9+r.g10)/10,5) AS data, tp.team_played FROM results AS r JOIN (SELECT (wins+losses+ties) AS team_played, season_id, store_id, division_id, team_id FROM standings ORDER BY season_id DESC, store_id ASC, division_id ASC, team_played DESC) AS tp ON (r.season_id=tp.season_id && r.store_id=tp.store_id && r.division_id=tp.division_id && r.team_id=tp.team_id) WHERE r.season_id=@season_id && r.player_id!=100 && r.store_id=@store_id && r.division_id=@division_id GROUP BY r.season_id, r.player_id HAVING player_played>=team_played/2 && data=@tie_value_num_leaders_plus_one) AS nt) ELSE 1 END) AS num_at_tie_value, @tie_value_num_leaders AS tie_value;';
            const mainQuery = 'SELECT p.player_id AS field_id, p.full_name AS field_name, st.store_city, COUNT(*)*10 AS player_played, ROUND(AVG(r.g1+r.g2+r.g3+r.g4+r.g5+r.g6+r.g7+r.g8+r.g9+r.g10)/10,5) AS data, tp.team_played FROM results AS r JOIN (SELECT (wins+losses+ties) AS team_played, season_id, store_id, division_id, team_id FROM standings ORDER BY season_id DESC, store_id ASC, division_id ASC, team_played DESC) AS tp ON (r.season_id=tp.season_id && r.store_id=tp.store_id && r.division_id=tp.division_id && r.team_id=tp.team_id) INNER JOIN players AS p ON (r.player_id=p.player_id) INNER JOIN stores AS st ON (p.store_id=st.store_id) WHERE r.season_id=@season_id && r.player_id!=100 && r.store_id=@store_id && r.division_id=@division_id GROUP BY r.season_id, r.player_id HAVING player_played>=team_played/2 && data>@tie_value_num_leaders_plus_one ORDER BY data DESC;';
            const queryString = 'SET @season_id=?, @store_id=?, @division_id=?;' + setTieValueVariables + tiesInfo + mainQuery;
            const queryParams = [
                paramsObj.season_id,
                paramsObj.store_id,
                paramsObj.division_id,
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getIndividualOneGameBySeasonStoreDivisionId: async (paramsObj) => {
        try {
            const setTieValueVariables = 'SELECT r1.data, r2.data INTO @tie_value_num_leaders, @tie_value_num_leaders_plus_one FROM (SELECT IFNULL((SELECT tv1.data FROM (SELECT g1 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g2 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g3 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g4 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g5 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g6 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g7 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g8 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g9 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g10 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id) AS tv1 ORDER BY data DESC LIMIT ?, 1), 1) AS data) AS r1, (SELECT IFNULL((SELECT tv1.data FROM (SELECT g1 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g2 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g3 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g4 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g5 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g6 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g7 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g8 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g9 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g10 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id) AS tv1 ORDER BY data DESC LIMIT ?, 1), 0) AS data) AS r2;';
            const tiesInfo = 'SELECT (CASE WHEN @tie_value_num_leaders=@tie_value_num_leaders_plus_one THEN (SELECT COUNT(*) FROM ((SELECT g1 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g2 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g3 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g4 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g5 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g6 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g7 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g8 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g9 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT g10 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id) AS ti) WHERE ti.data=@tie_value_num_leaders_plus_one) ELSE 1 END) AS num_at_tie_value, @tie_value_num_leaders AS tie_value;';
            const mainQuery = 'SELECT p.player_id AS field_id, p.full_name AS field_name, st.store_city, r.data FROM (SELECT ti.player_id, ti.data FROM (SELECT player_id, g1 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT player_id, g2 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT player_id, g3 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT player_id, g4 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT player_id, g5 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT player_id, g6 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT player_id, g7 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT player_id, g8 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT player_id, g9 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id UNION ALL SELECT player_id, g10 AS data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id) AS ti WHERE ti.data>@tie_value_num_leaders_plus_one) AS r INNER JOIN players AS p ON (r.player_id=p.player_id) INNER JOIN stores AS st ON (p.store_id=st.store_id) ORDER BY data DESC;';
            const queryString = 'SET @season_id=?, @store_id=?, @division_id=?;' + setTieValueVariables + tiesInfo + mainQuery;
            const queryParams = [
                paramsObj.season_id,
                paramsObj.store_id,
                paramsObj.division_id,
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getIndividualTenGameBySeasonStoreDivisionId: async (paramsObj) => {
        try {
            const setTieValueVariables = 'SELECT r1.data, r2.data INTO @tie_value_num_leaders, @tie_value_num_leaders_plus_one FROM (SELECT IFNULL((SELECT (g1+g2+g3+g4+g5+g6+g7+g8+g9+g10) as data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id GROUP BY player_id, week_id, team_id, player_num ORDER BY data DESC LIMIT ?, 1), 1) AS data) AS r1, (SELECT IFNULL((SELECT (g1+g2+g3+g4+g5+g6+g7+g8+g9+g10) as data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id GROUP BY player_id, week_id, team_id, player_num ORDER BY data DESC LIMIT ?, 1), 0) AS data) AS r2;';
            const tiesInfo = 'SELECT (CASE WHEN @tie_value_num_leaders=@tie_value_num_leaders_plus_one THEN (SELECT COUNT(*) FROM (SELECT (g1+g2+g3+g4+g5+g6+g7+g8+g9+g10) as data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id GROUP BY player_id, week_id, team_id, player_num HAVING data=@tie_value_num_leaders_plus_one) AS nt) ELSE 1 END) AS num_at_tie_value, @tie_value_num_leaders AS tie_value;';
            const mainQuery = 'SELECT p.player_id AS field_id, p.full_name AS field_name, st.store_city, r.data FROM (SELECT player_id, (g1+g2+g3+g4+g5+g6+g7+g8+g9+g10) as data FROM results WHERE season_id=@season_id && player_id!=100 && store_id=@store_id && division_id=@division_id GROUP BY player_id, week_id, team_id, player_num HAVING data>@tie_value_num_leaders_plus_one) AS r INNER JOIN players AS p ON (r.player_id=p.player_id) INNER JOIN stores AS st ON (p.store_id=st.store_id) ORDER BY data DESC;';
            const queryString = 'SET @season_id=?, @store_id=?, @division_id=?;' + setTieValueVariables + tiesInfo + mainQuery;
            const queryParams = [
                paramsObj.season_id,
                paramsObj.store_id,
                paramsObj.division_id,
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getTeamAverageBySeasonStoreDivisionId: async (paramsObj) => {
        try {
            const setTieValueVariables = 'SELECT r1.data, r2.data INTO @tie_value_num_leaders, @tie_value_num_leaders_plus_one FROM (SELECT IFNULL((SELECT ROUND(10*total_points/(st.wins+st.losses+st.ties),5) AS data FROM standings AS st WHERE st.season_id=@season_id && st.store_id=@store_id && st.division_id=@division_id GROUP BY st.team_id ORDER BY data DESC LIMIT ?, 1), 1) AS data) AS r1, (SELECT IFNULL((SELECT ROUND(10*total_points/(st.wins+st.losses+st.ties),5) AS data FROM standings AS st WHERE st.season_id=@season_id && st.store_id=@store_id && st.division_id=@division_id GROUP BY st.team_id ORDER BY data DESC LIMIT ?, 1), 0) AS data) AS r2;';
            const tiesInfo = 'SELECT (CASE WHEN @tie_value_num_leaders=@tie_value_num_leaders_plus_one THEN (SELECT COUNT(*) FROM (SELECT ROUND(10*total_points/(st.wins+st.losses+st.ties),5) AS data FROM standings AS st WHERE st.season_id=@season_id && st.store_id=@store_id && st.division_id=@division_id GROUP BY st.team_id HAVING data=@tie_value_num_leaders_plus_one) AS nt) ELSE 1 END) AS num_at_tie_value, @tie_value_num_leaders AS tie_value;';
            const mainQuery = 'SELECT t.team_id AS field_id, t.team_name AS field_name, s.store_city, st.data FROM (SELECT team_id, store_id, ROUND(10*total_points/(wins+losses+ties),5) AS data FROM standings WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id HAVING data>@tie_value_num_leaders_plus_one) as st JOIN teams AS t ON (st.team_id=t.team_id) JOIN stores AS s ON (st.store_id=s.store_id) ORDER BY st.data DESC;';
            const queryString = 'SET @season_id=?, @store_id=?, @division_id=?;' + setTieValueVariables + tiesInfo + mainQuery;
            const queryParams = [
                paramsObj.season_id,
                paramsObj.store_id,
                paramsObj.division_id,
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getTeamOneGameBySeasonStoreDivisionId: async (paramsObj) => {
        try {
            const setTieValueVariables = 'SELECT r1.data, r2.data INTO @tie_value_num_leaders, @tie_value_num_leaders_plus_one FROM (SELECT IFNULL((SELECT tv1.data FROM (SELECT SUM(g1) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g2) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g3) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g4) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g5) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g6) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g7) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g8) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g9) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g10) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id) AS tv1 ORDER BY data DESC LIMIT ?, 1), 1) AS data) AS r1, (SELECT IFNULL((SELECT tv1.data FROM (SELECT SUM(g1) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g2) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g3) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g4) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g5) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g6) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g7) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g8) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g9) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g10) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id) AS tv1 ORDER BY data DESC LIMIT ?, 1), 0) AS data) AS r2;';
            const tiesInfo = 'SELECT (CASE WHEN @tie_value_num_leaders=@tie_value_num_leaders_plus_one THEN (SELECT COUNT(*) FROM ((SELECT SUM(g1) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g2) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g3) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g4) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g5) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g6) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g7) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g8) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g9) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT SUM(g10) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id) AS ti) WHERE ti.data=@tie_value_num_leaders_plus_one) ELSE 1 END) AS num_at_tie_value, @tie_value_num_leaders AS tie_value;';
            const mainQuery = 'SELECT t.team_id AS field_id, t.team_name AS field_name, st.store_city, r.data FROM (SELECT ti.team_id, ti.data FROM (SELECT team_id, SUM(g1) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT team_id, SUM(g2) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT team_id, SUM(g3) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT team_id, SUM(g4) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT team_id, SUM(g5) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT team_id, SUM(g6) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT team_id, SUM(g7) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT team_id, SUM(g8) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT team_id, SUM(g9) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id UNION ALL SELECT team_id, SUM(g10) AS data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id) AS ti WHERE ti.data>@tie_value_num_leaders_plus_one) AS r INNER JOIN teams AS t ON (r.team_id=t.team_id) INNER JOIN stores AS st ON (t.store_id=st.store_id) ORDER BY data DESC;';
            const queryString = 'SET @season_id=?, @store_id=?, @division_id=?;' + setTieValueVariables + tiesInfo + mainQuery;
            const queryParams = [
                paramsObj.season_id,
                paramsObj.store_id,
                paramsObj.division_id,
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getTeamTenGameBySeasonStoreDivisionId: async (paramsObj) => {
        try {
            const setTieValueVariables = 'SELECT r1.data, r2.data INTO @tie_value_num_leaders, @tie_value_num_leaders_plus_one FROM (SELECT IFNULL((SELECT (SUM(g1)+SUM(g2)+SUM(g3)+SUM(g4)+SUM(g5)+SUM(g6)+SUM(g7)+SUM(g8)+SUM(g9)+SUM(g10)) as data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id ORDER BY data DESC LIMIT ?, 1), 1) AS data) AS r1, (SELECT IFNULL((SELECT (SUM(g1)+SUM(g2)+SUM(g3)+SUM(g4)+SUM(g5)+SUM(g6)+SUM(g7)+SUM(g8)+SUM(g9)+SUM(g10)) as data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id ORDER BY data DESC LIMIT ?, 1), 0) AS data) AS r2;';
            const tiesInfo = 'SELECT (CASE WHEN @tie_value_num_leaders=@tie_value_num_leaders_plus_one THEN (SELECT COUNT(*) FROM (SELECT (SUM(g1)+SUM(g2)+SUM(g3)+SUM(g4)+SUM(g5)+SUM(g6)+SUM(g7)+SUM(g8)+SUM(g9)+SUM(g10)) as data FROM results WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id GROUP BY team_id, week_id HAVING data=@tie_value_num_leaders_plus_one ORDER BY data DESC) AS nt) ELSE 1 END) AS num_at_tie_value, @tie_value_num_leaders AS tie_value;';
            const mainQuery = 'SELECT t.team_id AS field_id, t.team_name AS field_name, st.store_city, (SUM(r.g1)+SUM(r.g2)+SUM(r.g3)+SUM(r.g4)+SUM(r.g5)+SUM(r.g6)+SUM(r.g7)+SUM(r.g8)+SUM(r.g9)+SUM(r.g10)) as data FROM results AS r INNER JOIN teams AS t ON (r.team_id=t.team_id) INNER JOIN stores AS st ON (t.store_id=st.store_id) WHERE r.season_id=@season_id && r.store_id=@store_id && r.division_id=@division_id GROUP BY r.team_id, r.week_id HAVING data>@tie_value_num_leaders_plus_one ORDER BY data DESC;';
            const queryString = 'SET @season_id=?, @store_id=?, @division_id=?;' + setTieValueVariables + tiesInfo + mainQuery;
            const queryParams = [
                paramsObj.season_id,
                paramsObj.store_id,
                paramsObj.division_id,
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

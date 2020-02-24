const pool = require('../config/pool.js');

const Leader = {
    getIndividualAverage: async (paramsObj) => {
        try {
            let whereClause = '';
            let whereClause2 = '';
            let setVariables = '';
            const queryParams = [
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            if (paramsObj.season_id && paramsObj.store_id && paramsObj.division_id) {
                whereClause = 'WHERE r.season_id=@season_id && r.store_id=@store_id && r.division_id=@division_id ';
                whereClause2 = 'WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id ';
                setVariables = 'SET @season_id=?, @store_id=?, @division_id=?;';
                queryParams.unshift(paramsObj.season_id, paramsObj.store_id, paramsObj.division_id);
            } else if (paramsObj.season_id) {
                whereClause = 'WHERE r.season_id=@season_id ';
                whereClause2 = 'WHERE season_id=@season_id ';
                setVariables = 'SET @season_id=?;';
                queryParams.unshift(paramsObj.season_id);
            } else {
                setVariables = 'SET @dummy_variable=?;';
                queryParams.unshift(0);
            }
            const setTieValueVariables = 'SELECT r1.data, r2.data INTO @tie_value_num_leaders, @tie_value_num_leaders_plus_one FROM (SELECT IFNULL((SELECT tv1.data FROM (SELECT COUNT(*)*10 AS player_played, ROUND(AVG(r.g1+r.g2+r.g3+r.g4+r.g5+r.g6+r.g7+r.g8+r.g9+r.g10)/10,5) AS data, tp.team_played FROM results AS r JOIN (SELECT (wins+losses+ties) AS team_played, season_id, store_id, division_id, team_id FROM standings ' + whereClause2 + 'ORDER BY season_id DESC, store_id ASC, division_id ASC, team_played DESC) AS tp USING (season_id, store_id, division_id, team_id) ' + whereClause + 'GROUP BY r.season_id, r.player_id HAVING player_played>=tp.team_played/2 ORDER BY data DESC LIMIT ?, 1) AS tv1), 1) AS data) AS r1, (SELECT IFNULL((SELECT tv2.data FROM (SELECT COUNT(*)*10 AS player_played, ROUND(AVG(g1+g2+g3+g4+g5+g6+g7+g8+g9+g10)/10,5) AS data, tp.team_played FROM results AS r JOIN (SELECT (wins+losses+ties) AS team_played, season_id, store_id, division_id, team_id FROM standings ' + whereClause2 + 'ORDER BY season_id DESC, store_id ASC, division_id ASC, team_played DESC) AS tp USING (season_id, store_id, division_id, team_id) ' + whereClause + 'GROUP BY r.season_id, r.player_id HAVING player_played>=tp.team_played/2 ORDER BY data DESC LIMIT ?, 1) AS tv2), 1) AS data) AS r2;';
            const tiesInfo = 'SELECT (CASE WHEN @tie_value_num_leaders=@tie_value_num_leaders_plus_one THEN (SELECT COUNT(*) FROM (SELECT COUNT(*)*10 AS player_played, ROUND(AVG(r.g1+r.g2+r.g3+r.g4+r.g5+r.g6+r.g7+r.g8+r.g9+r.g10)/10,5) AS data, tp.team_played FROM results AS r JOIN (SELECT (wins+losses+ties) AS team_played, season_id, store_id, division_id, team_id FROM standings ' + whereClause2 + 'ORDER BY season_id DESC, store_id ASC, division_id ASC, team_played DESC) AS tp USING (season_id, store_id, division_id, team_id) ' + whereClause + 'GROUP BY r.season_id, r.player_id HAVING player_played>=tp.team_played/2 && data=@tie_value_num_leaders_plus_one) AS nt) ELSE 1 END) AS num_at_tie_value, @tie_value_num_leaders AS tie_value;';
            const mainQuery = 'SELECT p.player_id AS field_id, p.full_name AS field_name, s.store_city, COUNT(*)*10 AS player_played, ROUND(AVG(r.g1+r.g2+r.g3+r.g4+r.g5+r.g6+r.g7+r.g8+r.g9+r.g10)/10,5) AS data, team_played FROM results AS r JOIN (SELECT (wins+losses+ties) AS team_played, season_id, store_id, division_id, team_id FROM standings ' + whereClause2 + 'ORDER BY season_id DESC, store_id ASC, division_id ASC, team_played DESC) AS tp USING (season_id, store_id, division_id, team_id) INNER JOIN stores AS s USING (store_id) INNER JOIN players AS p USING (player_id) ' + whereClause + 'GROUP BY r.season_id, r.player_id HAVING player_played>=tp.team_played/2 && data>@tie_value_num_leaders_plus_one ORDER BY data DESC;';
            const queryString = setVariables + setTieValueVariables + tiesInfo + mainQuery;
            // console.log(queryString);
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getIndividualOneGame: async (paramsObj) => {
        try {
            let whereClause = '';
            let setVariables = '';
            const queryParams = [
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            if (paramsObj.season_id && paramsObj.store_id && paramsObj.division_id) {
                whereClause = 'WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id ';
                setVariables = 'SET @season_id=?, @store_id=?, @division_id=?;';
                queryParams.unshift(paramsObj.season_id, paramsObj.store_id, paramsObj.division_id);
            } else if (paramsObj.season_id) {
                whereClause = 'WHERE season_id=@season_id ';
                setVariables = 'SET @season_id=?;';
                queryParams.unshift(paramsObj.season_id);
            } else {
                setVariables = 'SET @dummy_variable=?;';
                queryParams.unshift(0);
            }
            const setTieValueVariables = 'SELECT r1.data, r2.data INTO @tie_value_num_leaders, @tie_value_num_leaders_plus_one FROM (SELECT IFNULL((SELECT tv1.data FROM (SELECT g1 AS data FROM results ' + whereClause + 'UNION ALL SELECT g2 AS data FROM results ' + whereClause + 'UNION ALL SELECT g3 AS data FROM results ' + whereClause + 'UNION ALL SELECT g4 AS data FROM results ' + whereClause + 'UNION ALL SELECT g5 AS data FROM results ' + whereClause + 'UNION ALL SELECT g6 AS data FROM results ' + whereClause + 'UNION ALL SELECT g7 AS data FROM results ' + whereClause + 'UNION ALL SELECT g8 AS data FROM results ' + whereClause + 'UNION ALL SELECT g9 AS data FROM results ' + whereClause + 'UNION ALL SELECT g10 AS data FROM results ' + whereClause + ') AS tv1 ORDER BY data DESC LIMIT ?, 1), 1) AS data) AS r1, (SELECT IFNULL((SELECT tv1.data FROM (SELECT g1 AS data FROM results ' + whereClause + 'UNION ALL SELECT g2 AS data FROM results ' + whereClause + 'UNION ALL SELECT g3 AS data FROM results ' + whereClause + 'UNION ALL SELECT g4 AS data FROM results ' + whereClause + 'UNION ALL SELECT g5 AS data FROM results ' + whereClause + 'UNION ALL SELECT g6 AS data FROM results ' + whereClause + 'UNION ALL SELECT g7 AS data FROM results ' + whereClause + 'UNION ALL SELECT g8 AS data FROM results ' + whereClause + 'UNION ALL SELECT g9 AS data FROM results ' + whereClause + 'UNION ALL SELECT g10 AS data FROM results ' + whereClause + ') AS tv1 ORDER BY data DESC LIMIT ?, 1), 0) AS data) AS r2;';
            const tiesInfo = 'SELECT (CASE WHEN @tie_value_num_leaders=@tie_value_num_leaders_plus_one THEN (SELECT COUNT(*) FROM ((SELECT g1 AS data FROM results ' + whereClause + 'UNION ALL SELECT g2 AS data FROM results ' + whereClause + 'UNION ALL SELECT g3 AS data FROM results ' + whereClause + 'UNION ALL SELECT g4 AS data FROM results ' + whereClause + 'UNION ALL SELECT g5 AS data FROM results ' + whereClause + 'UNION ALL SELECT g6 AS data FROM results ' + whereClause + 'UNION ALL SELECT g7 AS data FROM results ' + whereClause + 'UNION ALL SELECT g8 AS data FROM results ' + whereClause + 'UNION ALL SELECT g9 AS data FROM results ' + whereClause + 'UNION ALL SELECT g10 AS data FROM results ' + whereClause + ') AS ti) WHERE ti.data=@tie_value_num_leaders_plus_one) ELSE 1 END) AS num_at_tie_value, @tie_value_num_leaders AS tie_value;';
            const mainQuery = 'SELECT player_id AS field_id, full_name AS field_name, store_city, r.data FROM (SELECT ti.player_id, ti.data FROM (SELECT player_id, g1 AS data FROM results ' + whereClause + 'UNION ALL SELECT player_id, g2 AS data FROM results ' + whereClause + 'UNION ALL SELECT player_id, g3 AS data FROM results ' + whereClause + 'UNION ALL SELECT player_id, g4 AS data FROM results ' + whereClause + 'UNION ALL SELECT player_id, g5 AS data FROM results ' + whereClause + 'UNION ALL SELECT player_id, g6 AS data FROM results ' + whereClause + 'UNION ALL SELECT player_id, g7 AS data FROM results ' + whereClause + 'UNION ALL SELECT player_id, g8 AS data FROM results ' + whereClause + 'UNION ALL SELECT player_id, g9 AS data FROM results ' + whereClause + 'UNION ALL SELECT player_id, g10 AS data FROM results ' + whereClause + ') AS ti WHERE ti.data>@tie_value_num_leaders_plus_one) AS r INNER JOIN players USING (player_id) INNER JOIN stores USING (store_id) ORDER BY data DESC;';
            const queryString = setVariables + setTieValueVariables + tiesInfo + mainQuery;
            // console.log(queryString);
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getIndividualTenGame: async (paramsObj) => {
        try {
            let whereClause = '';
            let setVariables = '';
            const queryParams = [
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            if (paramsObj.season_id && paramsObj.store_id && paramsObj.division_id) {
                whereClause = 'WHERE season_id=@season_id && store_id=@store_id && division_id=@division_id ';
                setVariables = 'SET @season_id=?, @store_id=?, @division_id=?;';
                queryParams.unshift(paramsObj.season_id, paramsObj.store_id, paramsObj.division_id);
            } else if (paramsObj.season_id) {
                whereClause = 'WHERE season_id=@season_id ';
                setVariables = 'SET @season_id=?;';
                queryParams.unshift(paramsObj.season_id);
            } else {
                setVariables = 'SET @dummy_variable=?;';
                queryParams.unshift(0);
            }
            const setTieValueVariables = 'SELECT r1.data, r2.data INTO @tie_value_num_leaders, @tie_value_num_leaders_plus_one FROM (SELECT IFNULL((SELECT (g1+g2+g3+g4+g5+g6+g7+g8+g9+g10) as data FROM results ' + whereClause + 'GROUP BY season_id, player_id, week_id, team_id, player_num ORDER BY data DESC LIMIT ?, 1), 1) AS data) AS r1, (SELECT IFNULL((SELECT (g1+g2+g3+g4+g5+g6+g7+g8+g9+g10) as data FROM results ' + whereClause + 'GROUP BY season_id, player_id, week_id, team_id, player_num ORDER BY data DESC LIMIT ?, 1), 0) AS data) AS r2;';
            const tiesInfo = 'SELECT (CASE WHEN @tie_value_num_leaders=@tie_value_num_leaders_plus_one THEN (SELECT COUNT(*) FROM (SELECT (g1+g2+g3+g4+g5+g6+g7+g8+g9+g10) as data FROM results ' + whereClause + 'GROUP BY season_id, player_id, week_id, team_id, player_num HAVING data=@tie_value_num_leaders_plus_one) AS nt) ELSE 1 END) AS num_at_tie_value, @tie_value_num_leaders AS tie_value;';
            const mainQuery = 'SELECT p.player_id AS field_id, p.full_name AS field_name, st.store_city, r.data FROM (SELECT player_id, (g1+g2+g3+g4+g5+g6+g7+g8+g9+g10) as data FROM results ' + whereClause + 'GROUP BY season_id, player_id, week_id, team_id, player_num HAVING data>@tie_value_num_leaders_plus_one) AS r INNER JOIN players AS p USING (player_id) INNER JOIN stores AS st USING (store_id) ORDER BY data DESC;';
            const queryString = setVariables + setTieValueVariables + tiesInfo + mainQuery;
            // console.log(queryString);
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getTeamAverage: async (paramsObj) => {
        try {
            let selectClause = '';
            let setVariables = '';
            const queryParams = [
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            if (paramsObj.season_id && paramsObj.store_id && paramsObj.division_id) {
                if (paramsObj.season_id > 5) {
                    selectClause = '';
                } else {
                    selectClause = '';
                }
                setVariables = 'SET @season_id=?, @store_id=?, @division_id=?;';
                queryParams.unshift(paramsObj.season_id, paramsObj.store_id, paramsObj.division_id);
            } else if (paramsObj.season_id) {
                if (paramsObj.season_id > 5) {
                    selectClause = '';
                } else {
                    selectClause = '';
                }
                setVariables = 'SET @season_id=?;';
                queryParams.unshift(paramsObj.season_id);
            } else {
                selectClause = 'SELECT ROUND(10*total_points/(wins+losses+ties),5) AS data FROM standings WHERE season_id>5 UNION ALL SELECT ROUND(total_points/(wins+losses+ties),5) AS data FROM standings WHERE season_id<=5';
                setVariables = 'SET @dummy_variable=?;';
                queryParams.unshift(0);
            }
            const setTieValueVariables = 'SELECT r1.data, r2.data INTO @tie_value_num_leaders, @tie_value_num_leaders_plus_one FROM (SELECT IFNULL((' + selectClause + ' ORDER BY data DESC LIMIT ?, 1), 1) AS data) AS r1, (SELECT IFNULL((' + selectClause + ' ORDER BY data DESC LIMIT ?, 1), 0) AS data) AS r2;';
            const tiesInfo = 'SELECT (CASE WHEN @tie_value_num_leaders=@tie_value_num_leaders_plus_one THEN (SELECT COUNT(*) FROM (SELECT ROUND(10*total_points/(wins+losses+ties),5) AS data FROM standings WHERE season_id>5 HAVING data=@tie_value_num_leaders_plus_one UNION ALL SELECT ROUND(total_points/(wins+losses+ties),5) AS data FROM standings WHERE season_id<=5 HAVING data=@tie_value_num_leaders_plus_one) AS nt) ELSE 1 END) AS num_at_tie_value, @tie_value_num_leaders AS tie_value;';
            const mainQuery = 'SELECT t.team_id AS field_id, t.team_name AS field_name, s.store_city, st.data FROM (SELECT team_id, store_id, ROUND(10*total_points/(wins+losses+ties),5) AS data FROM standings WHERE season_id>5 HAVING data>@tie_value_num_leaders_plus_one UNION ALL SELECT team_id, store_id, ROUND(total_points/(wins+losses+ties),5) AS data FROM standings WHERE season_id<=5 HAVING data>@tie_value_num_leaders_plus_one) as st JOIN teams AS t USING (team_id) JOIN stores AS s ON (st.store_id=s.store_id) ORDER BY st.data DESC;';
            const queryString = setVariables + setTieValueVariables + tiesInfo + mainQuery;
            console.log(queryString);
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

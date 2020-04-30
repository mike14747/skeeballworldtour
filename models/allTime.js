const pool = require('../config/connectionPool.js').getDb();

const AllTime = {
    getIndividualPointsInAGame: async (paramsObj) => {
        try {
            const setTieValueVariables = 'SELECT r1.data, r2.data INTO @tie_value_num_leaders, @tie_value_num_leaders_plus_one FROM (SELECT IFNULL((SELECT tv1.data FROM (SELECT g1 AS data FROM results UNION ALL SELECT g2 AS data FROM results UNION ALL SELECT g3 AS data FROM results UNION ALL SELECT g4 AS data FROM results UNION ALL SELECT g5 AS data FROM results UNION ALL SELECT g6 AS data FROM results UNION ALL SELECT g7 AS data FROM results UNION ALL SELECT g8 AS data FROM results UNION ALL SELECT g9 AS data FROM results UNION ALL SELECT g10 AS data FROM results) AS tv1 ORDER BY data DESC LIMIT ?, 1), 1) AS data) AS r1, (SELECT IFNULL((SELECT tv1.data FROM (SELECT g1 AS data FROM results UNION ALL SELECT g2 AS data FROM results UNION ALL SELECT g3 AS data FROM results UNION ALL SELECT g4 AS data FROM results UNION ALL SELECT g5 AS data FROM results UNION ALL SELECT g6 AS data FROM results UNION ALL SELECT g7 AS data FROM results UNION ALL SELECT g8 AS data FROM results UNION ALL SELECT g9 AS data FROM results UNION ALL SELECT g10 AS data FROM results) AS tv1 ORDER BY data DESC LIMIT ?, 1), 0) AS data) AS r2;';
            const tiesInfo = 'SELECT (CASE WHEN @tie_value_num_leaders=@tie_value_num_leaders_plus_one THEN (SELECT COUNT(*) FROM ((SELECT g1 AS data FROM results UNION ALL SELECT g2 AS data FROM results UNION ALL SELECT g3 AS data FROM results UNION ALL SELECT g4 AS data FROM results UNION ALL SELECT g5 AS data FROM results UNION ALL SELECT g6 AS data FROM results UNION ALL SELECT g7 AS data FROM results UNION ALL SELECT g8 AS data FROM results UNION ALL SELECT g9 AS data FROM results UNION ALL SELECT g10 AS data FROM results) AS ti) WHERE ti.data=@tie_value_num_leaders_plus_one) ELSE 1 END) AS num_at_tie_value, @tie_value_num_leaders AS tie_value;';
            const mainQuery = 'SELECT player_id AS field_id, full_name AS field_name, store_city, r.data FROM (SELECT ti.player_id, ti.data FROM (SELECT player_id, g1 AS data FROM results UNION ALL SELECT player_id, g2 AS data FROM results UNION ALL SELECT player_id, g3 AS data FROM results UNION ALL SELECT player_id, g4 AS data FROM results UNION ALL SELECT player_id, g5 AS data FROM results UNION ALL SELECT player_id, g6 AS data FROM results UNION ALL SELECT player_id, g7 AS data FROM results UNION ALL SELECT player_id, g8 AS data FROM results UNION ALL SELECT player_id, g9 AS data FROM results UNION ALL SELECT player_id, g10 AS data FROM results) AS ti WHERE ti.data>@tie_value_num_leaders_plus_one) AS r INNER JOIN players USING (player_id) INNER JOIN stores USING (store_id) ORDER BY data DESC;';
            const queryString = setTieValueVariables + tiesInfo + mainQuery;
            // console.log(queryString);
            const queryParams = [
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getIndividualPointsInAMatch: async (paramsObj) => {
        try {
            const groupByClause = 'GROUP BY season_id, week_id, team_id, player_id, player_num ';
            const setTieValueVariables = 'SELECT r1.data, r2.data INTO @tie_value_num_leaders, @tie_value_num_leaders_plus_one FROM (SELECT IFNULL((SELECT (g1+g2+g3+g4+g5+g6+g7+g8+g9+g10) as data FROM results ' + groupByClause + 'ORDER BY data DESC LIMIT ?, 1), 1) AS data) AS r1, (SELECT IFNULL((SELECT (g1+g2+g3+g4+g5+g6+g7+g8+g9+g10) as data FROM results ' + groupByClause + 'ORDER BY data DESC LIMIT ?, 1), 0) AS data) AS r2;';
            const tiesInfo = 'SELECT (CASE WHEN @tie_value_num_leaders=@tie_value_num_leaders_plus_one THEN (SELECT COUNT(*) FROM (SELECT (g1+g2+g3+g4+g5+g6+g7+g8+g9+g10) as data FROM results ' + groupByClause + 'HAVING data=@tie_value_num_leaders_plus_one) AS nt) ELSE 1 END) AS num_at_tie_value, @tie_value_num_leaders AS tie_value;';
            const mainQuery = 'SELECT se.season_id, se.season_name, se.year, r.week_id, p.player_id AS field_id, p.full_name AS field_name, st.store_city, r.data FROM (SELECT season_id, week_id, player_id, (g1+g2+g3+g4+g5+g6+g7+g8+g9+g10) as data FROM results ' + groupByClause + 'HAVING data>@tie_value_num_leaders_plus_one) AS r INNER JOIN players AS p USING (player_id) INNER JOIN stores AS st USING (store_id) INNER JOIN seasons AS se USING (season_id) ORDER BY data DESC;';
            const queryString = setTieValueVariables + tiesInfo + mainQuery;
            // console.log(queryString);
            const queryParams = [
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getIndividualPointsInACareer: async (paramsObj) => {
        try {
            const groupByClause = 'GROUP BY player_id ';
            const setTieValueVariables = 'SELECT r1.data, r2.data INTO @tie_value_num_leaders, @tie_value_num_leaders_plus_one FROM (SELECT IFNULL((SELECT SUM(g1+g2+g3+g4+g5+g6+g7+g8+g9+g10) as data FROM results ' + groupByClause + 'ORDER BY data DESC LIMIT ?, 1), 1) AS data) AS r1, (SELECT IFNULL((SELECT SUM(g1+g2+g3+g4+g5+g6+g7+g8+g9+g10) as data FROM results ' + groupByClause + 'ORDER BY data DESC LIMIT ?, 1), 0) AS data) AS r2;';
            const tiesInfo = 'SELECT (CASE WHEN @tie_value_num_leaders=@tie_value_num_leaders_plus_one THEN (SELECT COUNT(*) FROM (SELECT SUM(g1+g2+g3+g4+g5+g6+g7+g8+g9+g10) as data FROM results ' + groupByClause + 'HAVING data=@tie_value_num_leaders_plus_one) AS nt) ELSE 1 END) AS num_at_tie_value, @tie_value_num_leaders AS tie_value;';
            const mainQuery = 'SELECT p.player_id AS field_id, p.full_name AS field_name, st.store_city, r.data FROM (SELECT season_id, week_id, player_id, SUM(g1+g2+g3+g4+g5+g6+g7+g8+g9+g10) as data FROM results ' + groupByClause + 'HAVING data>@tie_value_num_leaders_plus_one) AS r INNER JOIN players AS p USING (player_id) INNER JOIN stores AS st USING (store_id) ORDER BY data DESC;';
            const queryString = setTieValueVariables + tiesInfo + mainQuery;
            // console.log(queryString);
            const queryParams = [
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getIndividualSeasonAvg: async (paramsObj) => {
        try {
            const setTieValueVariables = '';
            const tiesInfo = '';
            const mainQuery = '';
            const queryString = setTieValueVariables + tiesInfo + mainQuery;
            // console.log(queryString);
            const queryParams = [
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getIndividualCareerGames: async (paramsObj) => {
        try {
            const setTieValueVariables = '';
            const tiesInfo = '';
            const mainQuery = '';
            const queryString = setTieValueVariables + tiesInfo + mainQuery;
            // console.log(queryString);
            const queryParams = [
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getIndividualScoreInAPeriod: async (paramsObj) => {
        try {
            let groupByClause = '';
            if (paramsObj.period === 'match') {
                groupByClause = 'GROUP BY season_id, week_id, team_id, player_id, player_num';
            } else if (paramsObj.period === 'season') {
                groupByClause = 'GROUP BY season_id, player_id';
            } else {
                groupByClause = 'GROUP BY player_id';
            }
            const setTieValueVariables = '';
            const tiesInfo = '';
            const mainQuery = '';
            const queryString = 'SET @score=?;' + setTieValueVariables + tiesInfo + mainQuery;
            // console.log(queryString);
            const queryParams = [
                paramsObj.score,
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getIndividualYearlySeasonAvg: async (paramsObj) => {
        try {
            const setTieValueVariables = '';
            const tiesInfo = '';
            const mainQuery = '';
            const queryString = setTieValueVariables + tiesInfo + mainQuery;
            // console.log(queryString);
            const queryParams = [
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getTeamPointsInAPeriod: async (paramsObj) => {
        try {
            let groupByClause = '';
            if (paramsObj.period === 'game') {
                groupByClause = 'GROUP BY season_id, week_id, team_id, ???game_num???';
            } else if (paramsObj.period === 'match') {
                groupByClause = 'GROUP BY season_id, week_id, team_id';
            } else {
                groupByClause = 'GROUP BY season_id, team_id';
            }
            const setTieValueVariables = '';
            const tiesInfo = '';
            const mainQuery = '';
            const queryString = setTieValueVariables + tiesInfo + mainQuery;
            // console.log(queryString);
            const queryParams = [
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getTeamRecord: async (paramsObj) => {
        try {
            const setTieValueVariables = '';
            const tiesInfo = '';
            const mainQuery = '';
            const queryString = setTieValueVariables + tiesInfo + mainQuery;
            // console.log(queryString);
            const queryParams = [
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getYearlyTeamRecord: async (paramsObj) => {
        try {
            const setTieValueVariables = '';
            const tiesInfo = '';
            const mainQuery = '';
            const queryString = setTieValueVariables + tiesInfo + mainQuery;
            // console.log(queryString);
            const queryParams = [
                paramsObj.num_leaders - 1,
                paramsObj.num_leaders,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
};

module.exports = AllTime;

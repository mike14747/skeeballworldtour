const pool = require('../config/pool.js');

const AllTime = {
    getIndividualPointsInAPeriod: async (paramsObj) => {
        try {
            let groupByClause = '';
            if (paramsObj.period === 'game') {
                groupByClause = 'GROUP BY season_id, week_id, team_id, player_id, player_num, ???game_num???';
            } else if (paramsObj.period === 'match') {
                groupByClause = 'GROUP BY season_id, week_id, team_id, player_id, player_num';
            } else {
                groupByClause = 'GROUP BY player_id';
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

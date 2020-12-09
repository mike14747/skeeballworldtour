const router = require('express').Router();
const Player = require('../models/player');
const PlayerFunctions = require('./utils/playersFunctions');

router.get('/:playerid/results/seasons/:seasonid', async (req, res, next) => {
    try {
        const data = await Player.getPlayerResultsByPlayerSeasonId({
            player_id: req.params.playerid,
            season_id: req.params.seasonid,
        });
        data[0] ? res.json(PlayerFunctions.formatPlayerStats(data[1])) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:playerid/name-store', async (req, res, next) => {
    try {
        const data = await Player.getPlayerNameAndStore({
            player_id: req.params.playerid,
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:playerid/current-stores/season/:seasonid', async (req, res, next) => {
    try {
        const data = await Player.getCurrentStores({
            player_id: req.params.playerid,
            season_id: req.params.seasonid,
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:playerid/seasons-list', async (req, res, next) => {
    try {
        const data = await Player.getSeasonsListByPlayerId({
            player_id: req.params.playerid,
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/mongo/convert', async (req, res, next) => {
    try {
        const [data, error] = await Player.getAllPlayersForMongo();
        const mapData = async (data) => {
            // const filtered = data.filter(f => f.player_id < 112);
            const data2 = await Promise.all(data.map(async (p) => {
                const [careerStats, error1] = await Player.getPlayersCareerStatsForMongo({ player_id: p.player_id });
                // console.log(careerStats);
                // const [seasonStats, error2] = await Player.getPlayersSeasonalStatsForMongo({ player_id: p.player_id });
                // console.log(careerStats);
                return {
                    ...p,
                    seasonStatsArr: [],
                    careerStats: {
                        games: careerStats[1][0] ? careerStats[1][0].games_played : 0,
                        totalPoints: careerStats[1][0] ? parseInt(careerStats[1][0].total_points) : 0,
                        num800plus: careerStats[1][0] ? careerStats[1][0].games800 : 0,
                        num700plus: careerStats[1][0] ? careerStats[1][0].games700 : 0,
                        num600plus: careerStats[1][0] ? careerStats[1][0].games600 : 0,
                        num500plus: careerStats[1][0] ? careerStats[1][0].games500 : 0,
                        num400plus: careerStats[1][0] ? careerStats[1][0].games400 : 0,
                        num300plus: careerStats[1][0] ? careerStats[1][0].games300 : 0,
                        highGame: careerStats[1][0] ? careerStats[1][0].high_game : 0,
                        numHighGames: careerStats[1][0] ? careerStats[1][0].num_high_games : 0,
                        lowGame: careerStats[1][0] ? careerStats[1][0].low_game : 0,
                        numLowGames: careerStats[1][0] ? careerStats[1][0].num_low_games : 0,
                        highTenGame: careerStats[1][0] ? parseInt(careerStats[1][0].ten_game) : 0,
                    },
                };
            }));
            return data2 || next('some error occurred');
        };
        if (data) {
            // console.log(data);
            const data2 = await mapData(data);
            data2 ? res.json(data2) : next('some error occurred');
        } else {
            next(error);
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;

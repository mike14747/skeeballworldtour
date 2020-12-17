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
            const filtered = data.filter(f => f.player_id === 218);
            const data2 = await Promise.all(data.map(async (p) => {
                const [careerStats, error1] = await Player.getPlayersCareerStatsForMongo({ player_id: p.player_id });
                const [seasonStats, error2] = await Player.getPlayersSeasonalStatsForMongo({ player_id: p.player_id });
                const seasonStatsArr = seasonStats[1].map(s => {
                    return {
                        seasonId: s.season_id,
                        seasonName: s.season_name,
                        year: s.year,
                        seasonGames: s.season_games,
                        gamesPlayed: s.games_played,
                        totalPoints: parseInt(s.total_points),
                        num800plus: s.games800,
                        num700plus: s.games700,
                        num600plus: s.games600,
                        num500plus: s.games500,
                        num400plus: s.games400,
                        num300plus: s.games300,
                        highGame: s.high_game,
                        numHighGames: s.num_high_games,
                        lowGame: s.low_game,
                        numLowGames: s.num_low_games,
                        highTenGame: parseInt(s.ten_game),
                    };
                });
                return {
                    ...p,
                    seasonStats: seasonStatsArr,
                    careerStats: {
                        gamesPlayed: careerStats[1][0] ? careerStats[1][0].games_played : 0,
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

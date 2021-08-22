function formatResults(unGroupedResults) {
    let seasonStoreDivisionObj, weekObj, matchObj, teamsObj, playerObj, seasonIndex, storeIndex, divisionIndex, weekIndex, teamIndex, playerIndex;

    return unGroupedResults.reduce((acc, cur) => {
        seasonStoreDivisionObj = {
            seasonId: cur.season_id,
            seasonName: cur.season_name,
            year: cur.year,
            storeId: cur.store_id,
            storeCity: cur.store_city,
            divisionId: cur.division_id,
            divisionName: cur.day_name,
            weeks: [],
        };

        weekObj = {
            weekId: cur.week_id,
            date: cur.date,
            matches: [],
        };

        matchObj = {
            startTime: cur.start_time,
            alley: cur.alley,
            teams: [],
        };

        teamsObj = {
            teamId: cur.team_id,
            teamName: cur.team_name,
            type: cur.type,
            players: [],
        };

        playerObj = {
            playerId: cur.player_id,
            playerName: cur.full_name,
            scores: [cur.g1, cur.g2, cur.g3, cur.g4, cur.g5, cur.g6, cur.g7, cur.g8, cur.g9, cur.g10],
            totalPoints: cur.g1 + cur.g2 + cur.g3 + cur.g4 + cur.g5 + cur.g6 + cur.g7 + cur.g8 + cur.g9 + cur.g10,
        };

        // find out if the cur season is already in acc
        seasonIndex = acc.findIndex(a => a.seasonId === cur.season_id);
        if (seasonIndex === -1) {
            // since the cur season is NOT in the acc:
            // push the cur player to the teamsObj's players array
            // push the teamObj to the matchObj's team array
            // push the matchObj to the weekObj's matches array
            // push the weekObj to seasonStoreDivisionObj's weeks array
            // push the seasonStoreDivisionObj into acc
            teamsObj.players.push(playerObj);
            matchObj.teams.push(teamsObj);
            weekObj.matches.push(matchObj);
            seasonStoreDivisionObj.weeks.push(weekObj);
            acc.push(seasonStoreDivisionObj);
            return acc;
        }

        // find out if the cur store is in an existing season object
        storeIndex = acc.findIndex(a => a.seasonId === cur.season_id && a.storeId === cur.store_id);
        if (storeIndex === -1) {
            // since the cur season/store is NOT in the acc:
            // push the cur player to the teamsObj's players array
            // push the teamObj to the matchObj's team array
            // push the matchObj to the weekObj's matches array
            // push the weekObj to seasonStoreDivisionObj's weeks array
            // push the seasonStoreDivisionObj into acc
            teamsObj.players.push(playerObj);
            matchObj.teams.push(teamsObj);
            weekObj.matches.push(matchObj);
            seasonStoreDivisionObj.weeks.push(weekObj);
            acc.push(seasonStoreDivisionObj);
            return acc;
        }

        // find out if the cur division is in an existing season/store object
        divisionIndex = acc.findIndex(a => a.seasonId === cur.season_id && a.storeId === cur.store_id && a.divisionId === cur.division_id);
        if (divisionIndex === -1) {
            // since the cur season/store/division is NOT in the acc:
            // push the cur player to the teamsObj's players array
            // push the teamObj to the matchObj's team array
            // push the matchObj to the weekObj's matches array
            // push the weekObj to seasonStoreDivisionObj's weeks array
            // push the seasonStoreDivisionObj into acc
            teamsObj.players.push(playerObj);
            matchObj.teams.push(teamsObj);
            weekObj.matches.push(matchObj);
            seasonStoreDivisionObj.weeks.push(weekObj);
            acc.push(seasonStoreDivisionObj);
            return acc;
        }

        // find out if the cur week is already in an existing season/store/division/weeks array
        divisionIndex = acc.findIndex(a => a.seasonId === cur.season_id && a.storeId === cur.store_id && a.divisionId === cur.division_id);
        weekIndex = acc[divisionIndex].weeks.findIndex(w => w.weekId === cur.week_id);
        if (weekIndex === -1) {
            // since the cur season/store/division/week is NOT in the acc:
            // push the cur player to the teamsObj's players array
            // push the teamObj to the matchObj's team array
            // push the matchObj to the weekObj's matches array
            // push the weekObj to seasonStoreDivisionObj's weeks array
            teamsObj.players.push(playerObj);
            matchObj.teams.push(teamsObj);
            weekObj.matches.push(matchObj);
            seasonStoreDivisionObj.weeks.push(weekObj);
            acc[divisionIndex].weeks.push(weekObj);
            return acc;
        }

        // // at this point, the season/store/division/week/teams array for the cur team will exist, so find out if the cur team is in there
        // weekIndex = acc.findIndex(a => a.seasonId === cur.season_id && a.storeId === cur.store_id && a.divisionId === cur.division_id && a.weekId === cur.week_id);
        // teamIndex = acc[weekIndex].teams.findIndex(t => t.teamId === cur.team_id);
        // if (teamIndex === -1) {
        //     // since the cur season/store/division/week/teams array in the acc doesn't already include the cur team, push the cur player to the teamsObj's players array, then push the teamsObj to the appropriate cur season/store/division/week/teams array in the acc
        //     teamsObj.players.push(playerObj);
        //     acc[weekIndex].teams.push(teamsObj);
        //     return acc;
        // }

        // // at this point, the season/store/division/week/teams/players array for the cur player will exist, so find out if the cur player is in there
        // weekIndex = acc.findIndex(a => a.seasonId === cur.season_id && a.storeId === cur.store_id && a.divisionId === cur.division_id && a.weekId === cur.week_id);
        // teamIndex = acc[weekIndex].teams.findIndex(t => t.teamId === cur.team_id);
        // playerIndex = acc[weekIndex].teams[teamIndex].players.findIndex(p => p.playerId === cur.player_id);
        // if (playerIndex === -1) {
        //     // since the cur player is not yet in the acc, find the appropriate place to add it
        //     acc[weekIndex].teams[teamIndex].players.push(playerObj);
        //     return acc;
        // }

        return acc;
    }, []);
}

module.exports = {
    formatResults,
};

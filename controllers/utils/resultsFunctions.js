function formatResults(unGroupedResults) {
    let seasonStoreDivisionObj, weekObj, matchObj, teamsObj, playerObj, seasonStoreDivisionIndex, weekIndex, matchIndex, teamIndex, playerIndex;

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

        // find out if the cur division is in an existing season/store object
        seasonStoreDivisionIndex = acc.findIndex(a => a.seasonId === cur.season_id && a.storeId === cur.store_id && a.divisionId === cur.division_id);
        if (seasonStoreDivisionIndex === -1) {
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
        weekIndex = acc[seasonStoreDivisionIndex].weeks.findIndex(w => w.weekId === cur.week_id);
        if (weekIndex === -1) {
            // since the cur week is NOT in the existing season/store/division/week in the acc:
            // push the cur player to the teamsObj's players array
            // push the teamObj to the matchObj's team array
            // push the matchObj to the weekObj's matches array
            // add it to the appropriate weeks array
            teamsObj.players.push(playerObj);
            matchObj.teams.push(teamsObj);
            weekObj.matches.push(matchObj);
            acc[seasonStoreDivisionIndex].weeks.push(weekObj);
            return acc;
        }

        // find out if the cur team's match is already in an existing season/store/division/weeks/matches array
        matchIndex = acc[seasonStoreDivisionIndex].weeks[weekIndex].matches.findIndex(m => m.startTime === cur.start_time && m.alley === cur.alley);
        if (matchIndex === -1) {
            // since the cur team's match is NOT in the season/store/division/week/matches array in the acc:
            // push the cur player to the teamsObj's players array
            // push the teamObj to the matchObj's team array
            // add it to the appropriate matches array
            teamsObj.players.push(playerObj);
            matchObj.teams.push(teamsObj);
            acc[seasonStoreDivisionIndex].weeks[weekIndex].matches.push(matchObj);
            return acc;
        }

        // find out if the cur team is NOT its already existing season/store/division/weeks/matches/teams array
        teamIndex = acc[seasonStoreDivisionIndex].weeks[weekIndex].matches[matchIndex].teams.findIndex(t => t.teamId === cur.team_id);
        if (teamIndex === -1) {
            // since the cur team is NOT in any matches in season/store/division/week/matches array in the acc:
            // push the cur player to the teamsObj's players array
            // add it to the appropriate teams array
            teamsObj.players.push(playerObj);
            acc[seasonStoreDivisionIndex].weeks[weekIndex].matches[matchIndex].teams.push(teamsObj);
            return acc;
        }

        // // find out if the cur player is NOT its already existing season/store/division/weeks/matches/teams/players array
        // playerIndex = acc[seasonStoreDivisionIndex].weeks[weekIndex].matches[matchIndex].teams[teamIndex].players.findIndex(p => p.playerId === cur.player_id);
        // if (playerIndex === -1) {
        //     // since the cur team's match in NOT season/store/division/week/matches array in the acc:
        //     // add playerObj to the appropriate players array
        //     acc[seasonStoreDivisionIndex].weeks[weekIndex].matches[matchIndex].teams[teamIndex].players.push(playerObj);
        //     return acc;
        // }

        acc[seasonStoreDivisionIndex].weeks[weekIndex].matches[matchIndex].teams[teamIndex].players.push(playerObj);
        return acc;
    }, []);
}

module.exports = {
    formatResults,
};

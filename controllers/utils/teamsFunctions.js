function groupTeamsForMongo(unGroupedTeams) {
    let teamId, storeId, seasonId, teamIndex, storeIndex, seasonIndex, seasonObj, storeObj, teamObj;
    return unGroupedTeams.reduce((acc, cur) => {
        teamId = cur.team_id;
        storeId = cur.store_id;
        seasonId = cur.season_id;

        teamObj = {
            teamId: cur.team_id,
            teamName: cur.team_name,
            tournyShow: !!cur.tourny_show,
            realTeam: !!cur.real_team,
            stores: [],
            seasons: [],
        };

        seasonObj = {
            seasonId: cur.season_id,
            seasonNum: cur.season_num,
            seasonName: cur.season_name,
            year: cur.year,
            wins: cur.wins,
            losses: cur.losses,
            ties: cur.ties,
            totalPoints: cur.total_points,
            oneGameAvg: Number(cur.one_game_avg),
            tenGameAvg: Number(cur.ten_game_avg),
            oneGameLow: Number(cur.one_game_low),
            oneGameHigh: Number(cur.one_game_high),
            tenGameLow: Number(cur.ten_game_low),
            tenGameHigh: Number(cur.ten_game_high),
        };

        storeObj = {
            storeId: cur.store_id,
            storeCity: cur.store_city,
        };

        // find out if the cur team is already in acc
        teamIndex = acc.findIndex(t => t.teamId === teamId);
        if (teamIndex === -1) {
            // since the cur team isn't in the acc, push the storesObj and seasonObj into the empty stores and seasons arrays, then push the teamObj into it
            teamObj.stores.push(storeObj);
            teamObj.seasons.push(seasonObj);
            acc.push(teamObj);
        } else {
            // since the cur team is in the acc, find out if the cur season cur team's seasons array
            seasonIndex = acc[teamIndex].seasons.findIndex(se => se.seasonId === seasonId);
            if (seasonIndex === -1) acc[teamIndex].seasons.push(seasonObj);

            // since the cur team is in the acc, find out if the cur season cur team's seasons array
            storeIndex = acc[teamIndex].stores.findIndex(st => st.storeId === storeId);
            if (storeIndex === -1) acc[teamIndex].stores.push(storeObj);
        }
        return acc;
    }, []);
}

module.exports = {
    groupTeamsForMongo,
};

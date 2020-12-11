function groupStandings(unGroupedStandings) {
    let storeDiv, index, standingObj;
    return unGroupedStandings.reduce((acc, obj) => {
        storeDiv = obj.store_division;
        standingObj = {
            standingsId: obj.standings_id,
            teamId: obj.team_id,
            teamName: obj.team_name,
            wins: obj.wins,
            losses: obj.losses,
            ties: obj.ties,
            totalPoints: obj.total_points,
        };
        index = acc.findIndex(item => item.storeDivision === storeDiv);
        if (index === -1) {
            acc.push({
                storeDivision: obj.store_division,
                storeId: obj.store_id,
                storeCity: obj.store_city,
                divisionId: obj.division_id,
                dayName: obj.day_name,
                standingsList: [standingObj],
            });
        } else {
            acc[index].standingsList.push(standingObj);
        }
        return acc;
    }, []);
}

const cur = {
    season_id: 1,
    season_num: 3,
    season_name: 'Summer',
    year: 2010,
    season_games: 7,
    store_division: 112,
    store_id: 11,
    store_city: 'Mentor',
    division_id: 2,
    day_name: 'Tuesday',
    team_id: 106,
    team_name: 'Spy Guys',
    wins: 7,
    losses: 0,
    ties: 0,
    total_points: 72680,
    standings_order: 1,
};

function groupStandingsForMongo(unGroupedStandings) {
    let season, storeDiv, storeDivisionIndex, seasonIndex, seasonObj, storeObj, teamObj;
    return unGroupedStandings.reduce((acc, cur) => {
        season = cur.season_id;
        storeDiv = `${cur.store_id}${cur.division_id}`;
        seasonObj = {
            seasonId: cur.season_id,
            seasonNum: cur.season_num,
            seasonName: cur.season_name,
            year: cur.year,
            seasonGames: cur.season_games,
            stores: [],
        };
        storeObj = {
            storeId: cur.store_id,
            storeCity: cur.store_city,
            divisionId: cur.division_id,
            divisionName: cur.day_name,
            teams: [],
        };
        teamObj = {
            teamId: cur.team_id,
            teamName: cur.team_name,
            wins: cur.wins,
            losses: cur.losses,
            ties: cur.ties,
            totalPoints: cur.total_points,
            ranking: cur.standings_order,
        };
        // find out if the cur season is already in acc
        seasonIndex = acc.findIndex(s => s.seasonId === season);
        if (seasonIndex === -1) {
            // since the cur season isn't in the acc, push the teamObj into the storeObj's empty teams array, then push the storeObj into the seasonObj's empty stores array, then push the seasonObj into acc
            storeObj.teams.push(teamObj);
            seasonObj.stores.push(storeObj);
            acc.push(seasonObj);
        } else {
            // since the cur season is already in acc, see if the cur store_division is already in there
            storeDivisionIndex = acc[seasonIndex].stores.findIndex(sd => `${sd.storeId}${sd.divisionId}` === storeDiv);
            if (storeDivisionIndex === -1) {
                // since the cur store_division isn't already in acc, push the teamObj into the storeObj's empty teams array, then push the storeObj nested into acc
                storeObj.teams.push(teamObj);
                acc[seasonIndex].stores.push(storeObj);
            } else {
                // since the cur store_division is already in acc, push the teamObj into it
                acc[seasonIndex].stores[storeDivisionIndex].teams.push(teamObj);
            }
        }
        return acc;
    }, []);
}

module.exports = {
    groupStandings,
    groupStandingsForMongo,
};

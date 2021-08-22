function formatResults(unGroupedResults) {
    let matchObj, seasonIndex, storeIndex, divisionIndex, weekIndex, teamIndex;

    return unGroupedResults.reduce((acc, cur) => {
        matchObj = {
            seasonId: cur.season_id,
            seasonName: cur.season_name,
            year: cur.year,
            storeId: cur.store_id,
            storeCity: cur.store_city,
            divisionId: cur.division_id,
            divisionName: cur.day_name,
            weekId: cur.week_id,
            teams: [],
        };

        // find out if the cur season is already in acc
        seasonIndex = acc.findIndex(a => a.seasonId === cur.season_id);
        if (seasonIndex === -1) {
            // since the cur season isn't in the acc, push the matchObj into it
            acc.push(matchObj);
        }

        // find out if the cur store is already in an existing season object
        storeIndex = acc.findIndex(a => a.seasonId === cur.season_id && a.storeId === cur.store_id);
        if (storeIndex === -1) {
            // since the cur season in the acc doesn't already include the cur store, push the matchObj to it
            acc.push(matchObj);
        }

        // find out if the cur division is already in an existing season/store object
        divisionIndex = acc.findIndex(a => a.seasonId === cur.season_id && a.storeId === cur.store_id && a.divisionId === cur.division_id);
        if (divisionIndex === -1) {
            // since the cur season/store in the acc doesn't already include the cur division, push the matchObj to it
            acc.push(matchObj);
        }

        // find out if the cur week is already in an existing season/store/division object
        weekIndex = acc.findIndex(a => a.seasonId === cur.season_id && a.storeId === cur.store_id && a.divisionId === cur.division_id && a.weekId === cur.week_id);
        if (weekIndex === -1) {
            // since the cur season/store/division in the acc doesn't already include the cur week, push the matchObj to it
            acc.push(matchObj);
        }

        return acc;
    }, []);
}

module.exports = {
    formatResults,
};

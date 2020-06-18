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

module.exports = {
    groupStandings,
};

function formatScheduleArray(schedules) {
    const formattedArray = [];
    let tempObj = {};
    let counter = 0;
    schedules.map((schedule) => {
        const { week_id: weekId, week_date1: weekDate, ...rest } = schedule;
        if (schedule.week_id !== counter) {
            tempObj = {
                week_id: weekId,
                week_date1: weekDate,
                matchups: [],
            };
            formattedArray.push(tempObj);
            counter = schedule.week_id;
        }
        return formattedArray[counter - 1].matchups.push({ ...rest });
    });
    return formattedArray;
}

function convertSchedulesForMongo(oldSchedArr) {
    let seasonStoreObj, seasonStoreIndex, weekObj, weekIndex, matchupObj;
    return oldSchedArr.reduce((acc, cur) => {
        seasonStoreObj = {
            seasonId: cur.season_id,
            seasonNum: cur.season_num,
            seasonName: cur.season_name,
            year: cur.year,
            seasonGames: cur.season_games,
            storeId: cur.store_id,
            storeCity: cur.store_city,
            divisionId: cur.division_id,
            divisionName: cur.day_name,
            weeks: [],
        };
        weekObj = {
            weekId: cur.week_id,
            date: cur.week_date1,
            matchups: [],
        };
        matchupObj = {
            startTime: cur.start_time,
            alley: cur.alley,
            awayTeam: {
                teamId: cur.away_team_id,
                teamName: cur.away_team,
            },
            homeTeam: {
                teamId: cur.home_team_id,
                teamName: cur.home_team,
            },
        };
        seasonStoreIndex = acc.findIndex(a => a.seasonId === cur.season_id && a.storeId === cur.store_id && a.divisionId === cur.division_id);
        if (seasonStoreIndex === -1) {
            weekObj.matchups.push(matchupObj);
            seasonStoreObj.weeks.push(weekObj);
            acc.push(seasonStoreObj);
        } else {
            weekIndex = acc[seasonStoreIndex].weeks.findIndex(w => w.weekId === cur.week_id);
            if (weekIndex === -1) {
                weekObj.matchups.push(matchupObj);
                acc[seasonStoreIndex].weeks.push(weekObj);
            } else {
                acc[seasonStoreIndex].weeks[weekIndex].matchups.push(matchupObj);
            }
        }
        return acc;
    }, []);
}

module.exports = {
    formatScheduleArray,
    convertSchedulesForMongo,
};

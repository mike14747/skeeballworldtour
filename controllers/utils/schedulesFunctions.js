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

module.exports = {
    formatScheduleArray,
};

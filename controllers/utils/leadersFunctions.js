function rankLeaders(leaders) {
    let rank = 0;
    let lastData = 0;
    const newLeaders = leaders.map((leader, index) => {
        (leader.data !== lastData) && (rank = index + 1);
        leader.key = `${leader.field_id}${index}`;
        leader.rank = rank;
        lastData = leader.data;
        return leader;
    });
    return newLeaders;
}

module.exports = {
    rankLeaders,
};

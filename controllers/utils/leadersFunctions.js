function rankLeaders(details, oldLeaders) {
    let rank = 0;
    let lastData = 0;
    const newLeaders = oldLeaders.map((leader, index) => {
        (leader.data !== lastData) && (rank = index + 1);
        leader.key = `${leader.field_id}${index}`;
        leader.rank = rank;
        lastData = leader.data;
        return leader;
    });
    const leadersObj = {
        numAtTieValue: details[0].num_at_tie_value,
        tieValue: details[0].tie_value,
        leaders: newLeaders,
    };
    return leadersObj;
}

module.exports = {
    rankLeaders,
};

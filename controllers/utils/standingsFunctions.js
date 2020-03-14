function groupStandings(standings) {
    const standingsArray = [];
    let curStoreDivision = 0;
    let index = -1;
    standings.forEach(standing => {
        if (index === -1 || curStoreDivision !== standing.store_division) {
            standingsArray.push([]);
            index++;
            curStoreDivision = standing.store_division;
        }
        standingsArray[index].push(standing);
    });
    return standingsArray;
}

module.exports = {
    groupStandings,
};

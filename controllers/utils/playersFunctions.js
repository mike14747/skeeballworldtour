function formatPlayerStats(unformattedStats) {
    const allScores = [];
    const formattedResults = unformattedStats.map((result, index) => {
        const tempObj = {
            id: index,
            team_id: result.team_id,
            team_name: result.team_name,
            week_id: result.week_id,
            player_id: result.player_id,
            scores: [result.g1, result.g2, result.g3, result.g4, result.g5, result.g6, result.g7, result.g8, result.g9, result.g10],
        };
        tempObj.scores.map(score => allScores.push(score));
        tempObj.total = tempObj.scores.reduce((accumulator, currentValue) => accumulator + currentValue);
        return tempObj;
    });
    const [totalGames, games800, games700, games600, games500, games400, games300, highGame, lowGame] = [
        allScores.length,
        allScores.filter(score => score >= 800).length,
        allScores.filter(score => score >= 700).length,
        allScores.filter(score => score >= 600).length,
        allScores.filter(score => score >= 500).length,
        allScores.filter(score => score >= 400).length,
        allScores.filter(score => score >= 300).length,
        Math.max(...allScores), Math.min(...allScores),
    ];
    const [averageScore, highGameCount, lowGameCount] = [allScores.reduce((accumulator, currentValue) => accumulator + currentValue) / totalGames, allScores.filter(score => score === highGame).length, allScores.filter(score => score === lowGame).length];
    const matchesArray = formattedResults.map(match => match.scores.reduce((accumulator, currentValue) => accumulator + currentValue));
    const bestTenGameSeries = Math.max(...matchesArray);
    const tempPlayerStats = [];
    tempPlayerStats.push({ text: 'Total Games Played:', data: totalGames });
    games800 > 0 && tempPlayerStats.push({ text: '800+ Games:', data: games800 + ' (' + (100 * games800 / totalGames).toFixed(1) + '%)' });
    games700 > 0 && tempPlayerStats.push({ text: '700+ Games:', data: games700 + ' (' + (100 * games700 / totalGames).toFixed(1) + '%)' });
    games600 > 0 && tempPlayerStats.push({ text: '600+ Games:', data: games600 + ' (' + (100 * games600 / totalGames).toFixed(1) + '%)' });
    games500 > 0 && tempPlayerStats.push({ text: '500+ Games:', data: games500 + ' (' + (100 * games500 / totalGames).toFixed(1) + '%)' });
    games400 > 0 && tempPlayerStats.push({ text: '400+ Games:', data: games400 + ' (' + (100 * games400 / totalGames).toFixed(1) + '%)' });
    games300 > 0 && tempPlayerStats.push({ text: '300+ Games:', data: games300 + ' (' + (100 * games300 / totalGames).toFixed(1) + '%)' });
    tempPlayerStats.push({ text: 'Average Score per Game:', data: averageScore.toFixed(1) });
    tempPlayerStats.push({ text: 'High Game:', data: highGame + ' (' + highGameCount + ')' });
    tempPlayerStats.push({ text: 'Low Game:', data: lowGame + ' (' + lowGameCount + ')' });
    tempPlayerStats.push({ text: 'Best 10-Game Series:', data: bestTenGameSeries });
    return {
        formattedPlayerStats: tempPlayerStats,
        formattedPlayerResults: formattedResults,
    };
};

module.exports = {
    formatPlayerStats,
};

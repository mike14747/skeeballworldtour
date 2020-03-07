import React from 'react';
import PropTypes from 'prop-types';

const ResultsTbody = ({ players }) => {
    return (
        <tbody>
            {players.map((player, index) => (
                <tr key={index} className="bg-white">
                    <td><a href={'/players/' + player.player_id}>{player.name}</a></td>
                    {player.scores.map((score, i) => (
                        <td key={i} className="text-center">{score}</td>
                    ))}
                    <td className="text-center">{player.total_points}</td>
                </tr>
            ))}
        </tbody>
    );
};

ResultsTbody.propTypes = {
    players: PropTypes.array,
};

export default ResultsTbody;

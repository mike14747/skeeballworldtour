import React from 'react';
import PropTypes from 'prop-types';

ResultsTbody.propTypes = {
    players: PropTypes.array,
};

export default function ResultsTbody(props) {
    return (
        <tbody>
            {props.players.map((player) => (
                <tr key={player.player_id}>
                    <td><a href={'/players/' + player.player_id}>{player.name}</a></td>
                    {player.scores.map((score, i) => (
                        <td key={i} className="text-center">{score}</td>
                    ))}
                    <td>{player.total_points}</td>
                </tr>
            ))}
        </tbody>
    );
}

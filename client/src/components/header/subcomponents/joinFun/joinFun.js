import React, { useContext } from 'react';
import './css/joinFun.css';
import SettingsContext from '../../../../context/settingsContext';

const JoinFun = () => {
    const settings = useContext(SettingsContext);

    return (
        <div className="join-fun">
            Join the fun!!!
            {settings && settings.current_season_id && <span className="ml-2 text-warning">{settings.current_season_id}</span>}
        </div>
    );
};

export default JoinFun;

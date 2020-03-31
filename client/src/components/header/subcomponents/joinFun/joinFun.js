import React, { useContext } from 'react';
import ReactHtmlParser from 'react-html-parser';
import './css/joinFun.css';
import SettingsContext from '../../../../context/settingsContext';

const JoinFun = () => {
    const settings = useContext(SettingsContext);

    return (
        // <div className="join">
        <div>
            {settings.text_box_heading &&
                <div>{settings.text_box_heading}</div>
            }
            {settings.text_box_text &&
                <div>{ReactHtmlParser(settings.text_box_text)}</div>
            }
        </div>
    );
};

export default JoinFun;

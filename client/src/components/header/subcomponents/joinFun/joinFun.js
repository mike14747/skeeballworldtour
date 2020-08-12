import React, { useContext, Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';
import './css/joinFun.css';
import SettingsContext from '../../../../context/settingsContext';

const JoinFun = () => {
    const { text_box_heading: textBoxHeading, text_box_text: textBoxText } = useContext(SettingsContext);

    return (
        <div className="join-dropdown" data-toggle="dropdown">
            <div className="join-heading">
                {textBoxHeading &&
                    <Fragment>{textBoxHeading} +</Fragment>
                }
            </div>
            <div className="join-dropdown-content">
                {textBoxText &&
                    <Fragment>{ReactHtmlParser(textBoxText)}</Fragment>
                }
            </div>
        </div>

    );
};

export default JoinFun;

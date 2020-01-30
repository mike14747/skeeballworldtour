// import React from 'react';
// import './css/seasonDropdown.css';
// import PropTypes from 'prop-types';

// function Dropdown({ buttonText, listItems, handleSeasonId }) {
//     return (
//         <div className="d-flex justify-content-end">
//             <div className="dropdown mb-3">
//                 <button className="dropbtn">{buttonText}</button>
//                 <ul className="dropdown-content">
//                     {listItems.map(item => (
//                         <li key={item.season_id} onClick={() => handleSeasonId(item.season_id)}>{item.text}</li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }

// Dropdown.propTypes = {
//     buttonText: PropTypes.string,
//     listItems: PropTypes.array,
//     handleSeasonId: PropTypes.func,
// };

// export default Dropdown;

import React, { Fragment } from 'react';
import './css/seasonDropdown.css';
import PropTypes from 'prop-types';

function Dropdown({ currentSeason, buttonText, listItems, handleSeasonId }) {
    return (
        <div className="d-flex justify-content-end">
            {currentSeason &&
                <span className="py-1 px-2"><span className="small">Current View:</span> {currentSeason.season_name}, {currentSeason.season_year}</span>
            }
            <div className="dropdown mb-3">
                <button className="dropbtn">{buttonText}</button>
                <ul className="dropdown-content">
                    {listItems.map(item => (
                        <Fragment key={item.season_id}>
                            {currentSeason && (item.season_id === currentSeason.season_id)
                                ? <li className="viewing">{item.text}</li>
                                : <li onClick={() => handleSeasonId(item.season_id)}>{item.text}</li>
                            }
                        </Fragment>
                    ))}
                </ul>
            </div>
        </div>
    );
}

Dropdown.propTypes = {
    currentSeason: PropTypes.object,
    buttonText: PropTypes.string,
    listItems: PropTypes.array,
    handleSeasonId: PropTypes.func,
};

export default Dropdown;

import React, { useState, useEffect, useContext } from 'react';
import SettingsContext from './settingsContext';
import './css/navbar.css';
import axios from 'axios';

function NavBar() {
    const { currentSeasonId, displaySchedule } = useContext(SettingsContext);
    const [storeDivisionArr, setStoreDivisionArr] = useState([]);

    useEffect(() => {
        axios.get('/api/schedule/navbar/' + currentSeasonId)
            .then((response) => {
                console.log(response.data);
                setStoreDivisionArr(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [currentSeasonId]);

    return (
        <div className="row">
            <div className="col-sm-12 justify-content-center text-center">
                <nav className="navbar navbar-expand-sm justify-content-center">
                    <ul className="navbar-nav">
                        <li className="nav-item mr-2 mb-1">
                            <a className="nav-link a-custom2" href="/standings">Standings</a>
                        </li>
                        <li className="nav-item dropdown mr-2 mb-1">
                            <a className="nav-link dropdown-toggle a-custom2" href="#" data-toggle="dropdown">Results</a>
                            <div className="dropdown-menu pt-0 pb-0">
                                {storeDivisionArr.map(result => (
                                    <p key={result.store_division} className="small m-0"><a className="dropdown-item a-custom mb-2 p-3" href={'results/' + result.store_id + '/' + result.division_id}>{result.store_city} ({result.day_name})</a></p>
                                ))}
                            </div>
                        </li>
                        {displaySchedule === 1 &&
                            <li className="nav-item dropdown navbar-custom mr-2 mb-1">
                                <a className="nav-link dropdown-toggle a-custom2" href="#" data-toggle="dropdown">Schedule</a>
                                <div className="dropdown-menu">
                                    {storeDivisionArr.map(sched => (
                                        <p key={sched.store_division} className="small m-0"><a className="dropdown-item a-custom mb-2 p-3" href={'schedule/' + sched.store_id + '/' + sched.division_id}>{sched.store_city} ({sched.day_name})</a></p>
                                    ))}
                                </div>
                            </li>
                        }
                        <li className="nav-item dropdown navbar-custom mr-2 mb-1">
                            <a className="nav-link dropdown-toggle a-custom2" href="#" data-toggle="dropdown">Stores</a>
                            <div className="dropdown-menu pt-0 pb-0">
                            </div>
                        </li>
                        <li className="nav-item mr-2 mb-1">
                            <a className="nav-link a-custom2" href="/rules">Rules</a>
                        </li>
                        <li className="nav-item mr-2 mb-1">
                            <a className="nav-link a-custom2" href="/champions">Champions</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link a-custom2 mr-2" href="mailto:sal@automaticmusic.com">Contact</a>
                        </li>
                    </ul >
                </nav >
            </div >
        </div >
    );
}

export default NavBar;

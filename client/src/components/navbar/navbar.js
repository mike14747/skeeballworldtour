import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavDropdown from '../navDropdown/navDropdown';
import NavButton from '../navButton/navButton';

function NavBar() {
    const [displaySchedule, setDisplaySchedule] = useState(0);
    const [storeDivisionArr, setStoreDivisionArr] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response1 = await axios.get('/api/settings/navbar');
                const currentSeasonId = (response1.data[0].current_season_id);
                setDisplaySchedule(response1.data[0].display_schedule);
                const response2 = await axios.get('/api/schedules/navbar/' + currentSeasonId);
                const storeDivArray = response2.data.map((storeDiv) => {
                    return {
                        id: storeDiv.store_division,
                        text: storeDiv.store_city + ' (' + storeDiv.day_name + ')',
                        href: '/' + storeDiv.store_id + '/' + storeDiv.division_id,
                    };
                });
                setStoreDivisionArr(storeDivArray);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    return (
        <div className="row">
            <div className="col-sm-12 justify-content-center text-center">
                <NavButton buttonText="Standings" url="/standings" />
                <NavDropdown buttonText="Results +" urlPrefix="/results" listItems={storeDivisionArr} />
                {displaySchedule === 1 &&
                    <NavDropdown buttonText="Schedule +" urlPrefix="/schedule" listItems={storeDivisionArr} />
                }
                <NavDropdown buttonText="Stores +" urlPrefix="/stores" listItems={storeDivisionArr} />
                <NavButton buttonText="Rules" url="/rules" />
                <NavButton buttonText="Champions" url="champions" />
                <NavButton buttonText="Contact" url="mailto:ktaylor@bellmusicco.com" />
            </div >
        </div >
    );
}

export default NavBar;

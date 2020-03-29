import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CurrentSeasonContext from '../../context/currentSeasonContext';
import NavDropdown from './subcomponents/navDropdown/navDropdown';
import NavButton from './subcomponents/navButton/navButton';

function NavBar() {
    const currentSeasonId = useContext(CurrentSeasonContext);

    const [displaySchedule, setDisplaySchedule] = useState(0);
    const [storeDivisionArr, setStoreDivisionArr] = useState([]);

    useEffect(() => {
        axios.get('/api/settings/navbar')
            .then(response => response.data[0] ? setDisplaySchedule(response.data[0].display_schedule) : setDisplaySchedule(0))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        if (currentSeasonId) {
            axios.get('/api/schedules/navbar/' + currentSeasonId)
                .then((response) => {
                    const storeDivArray = response.data.map((storeDiv) => {
                        return {
                            id: storeDiv.store_division,
                            text: storeDiv.store_city + ' (' + storeDiv.day_name + ')',
                            href: '/' + storeDiv.store_id + '/' + storeDiv.division_id,
                        };
                    });
                    setStoreDivisionArr(storeDivArray);
                })
                .catch(error => console.log(error));
        }
    }, [currentSeasonId]);

    return (
        <div className="row mt-1 mb-4">
            <div className="col-12 justify-content-center text-center">
                <NavButton buttonText="Standings" url="/standings" />
                <NavDropdown buttonText="Results +" urlPrefix="/results" listItems={storeDivisionArr} />
                {displaySchedule === 1 &&
                    <NavDropdown buttonText="Schedule +" urlPrefix="/schedule" listItems={storeDivisionArr} />
                }
            </div >
        </div >
    );
}

export default NavBar;

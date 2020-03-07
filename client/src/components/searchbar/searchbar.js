import React, { useState, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import './css/searchbar.css';

function SearchBar() {
    const [searchInput, setSearchInput] = useState('');
    const [submitted, setSubmitted] = useState(false);
    useEffect(() => {
        if (submitted) {
            setSearchInput('');
            setSubmitted(false);
        }
    }, [submitted]);

    const handleSubmit = (e) => {
        e.preventDefault();
        searchInput.length > 0 && setSubmitted(true);
    };

    return (
        <Fragment>
            <form className="form-searchbar" onSubmit={handleSubmit}>
                <input type="text" maxLength="20" placeholder="Find Player/Team" className="input-searchbar" value={searchInput} onChange={event => setSearchInput(event.target.value)} />
                <button type="submit" name="submit" className="search-button">Go</button>
            </form>
            {submitted && <Redirect to={'/search/' + searchInput} />}
        </Fragment>
    );
}

export default SearchBar;

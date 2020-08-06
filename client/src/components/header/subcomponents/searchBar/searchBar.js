import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './css/searchBar.css';

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
        <div className="mt-auto">
            <form className="form-searchbar" onSubmit={handleSubmit}>
                <input type="text" maxLength="20" placeholder="Find Player/Team" className="input-searchbar" value={searchInput} onChange={event => setSearchInput(event.target.value)} />
                <button type="submit" name="submit" className="search-button">Go</button>
            </form>
            {submitted && <Redirect to={'/search/' + searchInput} />}
        </div>
    );
}

export default SearchBar;

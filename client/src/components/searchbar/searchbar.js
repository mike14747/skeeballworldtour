import React, { useState, useEffect } from 'react';
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

    const handleSubmit = () => {
        searchInput.length > 0 && setSubmitted(true);
    };

    return (
        <div className="d-flex justify-content-center mb-4">
            <form className="form-inline justify-content-center mt-2" onSubmit={handleSubmit}>
                <label className="m-1">Find a player or team: </label>
                <input type="text" maxLength="20" className="form-control m-1" value={searchInput} onChange={event => setSearchInput(event.target.value)} />
                <button type="submit" className="form-control search-button m-1">Submit</button>
            </form>
            {submitted && <Redirect to={'/search/' + searchInput} />}
        </div >
    );
}

export default SearchBar;

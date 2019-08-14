import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class SearchBar extends Component {
    state = {
        searchInput: "",
        submitted: false
    };

    handleChange = event => {
        this.setState({ searchInput: event.target.value, submitted: false });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ submitted: true }, () => {
            this.setState({ searchInput: "", submitted: false });
        });
    }

    render() {
        return (
            <div>
                <form className="form-inline justify-content-center mt-2" onSubmit={this.handleSubmit}>
                    <label className="m-1">Find a player or team: </label>
                    <input type="text" maxLength="20" className="form-control m-1" value={this.state.searchInput} onChange={this.handleChange} />
                    <button type="submit" className="form-control m-1">Submit</button>
                </form>
                {(this.state.submitted && this.state.searchInput.length > 0) &&
                    <Redirect to={{
                        pathname: '/search',
                        state: this.state.searchInput
                    }} />
                }
            </div>
        )
    }
}

export default SearchBar;
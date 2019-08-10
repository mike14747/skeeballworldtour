import React, { Component } from "react";
import api from '../utils/api';
import ReactHtmlParser from 'react-html-parser';

class Rules extends Component {
    state = {
        rules: {}
    };

    componentDidMount() {
        api.getRules()
            .then(res => this.setState({ rules: res[0] }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <h2 className="text-center">{this.state.rules.content_heading}</h2>
                <div>{ReactHtmlParser(this.state.rules.page_content)}</div>
            </div>
        )
    }
}

export default Rules;
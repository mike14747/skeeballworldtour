import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';

function Rules() {
    const [rules, setRules] = useState({});
    useEffect(() => {
        axios.get('/api/pages/rules')
            .then((response) => {
                setRules(response.data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <h2 className="text-center">{rules.content_heading}</h2>
            <div>{ReactHtmlParser(rules.page_content)}</div>
        </div>
    );
}

export default Rules;

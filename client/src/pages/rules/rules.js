import React, { useState, useEffect, Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';
import PageHeading from '../../components/pageHeading/pageHeading';

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
        <Fragment>
            <PageHeading text={rules.content_heading} />
            <div>{ReactHtmlParser(rules.page_content)}</div>
        </Fragment>
    );
}

export default Rules;

import React, { useState, useEffect, Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';
import PageHeading from '../../components/pageHeading/pageHeading';

const Rules = () => {
    const [rules, setRules] = useState(null);
    const [rulesStatus, setRulesStatus] = useState({ errorMsg: undefined, isLoaded: false });

    useEffect(() => {
        axios.get('/api/pages/rules')
            .then((response) => {
                response.data[0] && setRules(response.data[0]);
                setRulesStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setRulesStatus({ errorMsg: 'An error occurred fetching league rules!', isLoaded: true });
            });
    }, []);

    return (
        <Fragment>
            {!rulesStatus.isLoaded
                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                : rules
                    ? <Fragment>
                        <PageHeading text={rules.content_heading} />
                        {ReactHtmlParser(rules.page_content)}
                    </Fragment>
                    : <div className="text-center empty-result">Please check back again soon to see the rules!</div>

            }
        </Fragment>
    );
};

export default Rules;

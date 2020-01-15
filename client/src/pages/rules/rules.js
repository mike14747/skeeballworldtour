import React, { useState, useEffect, Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';
import PageHeading from '../../components/pageHeading/pageHeading';

const Rules = () => {
    const [rules, setRules] = useState();
    const [haveRulesLoaded, setHaveRulesLoaded] = useState(false);

    useEffect(() => {
        axios.get('/api/pages/rules')
            .then((response) => {
                if (response.data[0]) {
                    setRules(response.data[0]);
                }
                setHaveRulesLoaded(true);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <Fragment>
            {!haveRulesLoaded
                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                : rules
                    ? <Fragment>
                        <PageHeading text={rules.content_heading} />
                        {ReactHtmlParser(rules.page_content)}
                    </Fragment>
                    : <div className="text-center bigger text-danger">Please check back again soon to see the rules!</div>

            }
        </Fragment>
    );
};

export default Rules;


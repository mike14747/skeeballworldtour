import React, { useState, useEffect, Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';
import PageHeading from '../../components/pageHeading/pageHeading';
import Loading from '../../components/loading/loading';

const Rules = () => {
    const [rules, setRules] = useState({
        data: null,
        status: {
            errorMsg: undefined,
            isLoaded: false,
        },
    });

    useEffect(() => {
        axios.get('/api/pages/rules')
            .then((response) => {
                setRules({
                    data: response.data[0],
                    status: {
                        errorMsg: undefined,
                        isLoaded: true,
                    },
                });
            })
            .catch((error) => {
                console.log(error);
                setRules({
                    data: null,
                    status: {
                        errorMsg: 'An error occurred fetching league rules!',
                        isLoaded: true,
                    },
                });
            });
    }, []);

    return (
        <Fragment>
            {!rules.status.isLoaded
                ? <Loading />
                : rules.data
                    ? <Fragment>
                        <PageHeading text={rules.data.content_heading} />
                        {ReactHtmlParser(rules.data.page_content)}
                    </Fragment>
                    : !rules.status.errorMsg
                        ? <div className="text-center empty-result">Please check back again soon to see the rules!</div>
                        : <span className="empty-result">{rules.status.errorMsg}</span>

            }
        </Fragment>
    );
};

export default Rules;

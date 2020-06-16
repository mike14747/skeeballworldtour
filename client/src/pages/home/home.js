import React, { useState, useEffect, useContext, Fragment } from 'react';
import SettingsContext from '../../context/settingsContext';
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';

function Home() {
    const settings = useContext(SettingsContext);

    const showRegButton = settings.show_reg_button;
    const regButtonUrl = settings.reg_button_url;
    const regButtonText = settings.reg_button_text;

    const [newsArr, setNewsArr] = useState([]);
    const [newsStatus, setNewsStatus] = useState({ errorMsg: undefined, isLoaded: false });
    const [newsCounter, setNewsCounter] = useState(0);

    useEffect(() => {
        axios.get('/api/pages/homepage-news')
            .then((response) => {
                setNewsArr(response.data);
                setNewsStatus({ errorMsg: undefined, isLoaded: true });
            })
            .catch((error) => {
                console.log(error);
                setNewsStatus({ errorMsg: 'An error occurred fetching league news!', isLoaded: true });
            });
    }, []);

    return (
        <div>
            {showRegButton === 1 && regButtonUrl && regButtonText &&
                <div>
                    <div className="text-center">
                        <a href={regButtonUrl}><img src="/images/register_now.jpg" alt="REGISTER NOW!" /></a>
                        {ReactHtmlParser(regButtonText)}
                    </div>
                </div>
            }

            {!newsStatus.isLoaded
                ? <div className="text-center"><img src={'/images/loading.gif'} alt={'Loading'} /></div>
                : newsArr && newsArr.length > 0
                    ? <Fragment>
                        {newsArr.map((news, i) => (
                            <div key={news.page_id}>
                                {i > 0 && <hr className="mt-4 mb-4" />}
                                <h5 className="text-danger mt-1 mb-0">{news.content_heading}</h5>
                                <p><span className="small">{news.text_date1}</span></p>
                                {ReactHtmlParser(news.page_content)}
                            </div>
                        ))}
                    </Fragment>
                    : <div className="text-center empty-result">Please check back again soon to see league news!</div>

            }
        </div>
    );
}

export default Home;

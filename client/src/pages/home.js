import React, { useState, useEffect, useContext } from 'react';
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';
import SettingsContext from '../components/settingsContext';

function Home() {
    const { showRegButton } = useContext(SettingsContext);
    const [newsArr, setNewsArr] = useState([]);

    useEffect(() => {
        axios.get('/api/homepage-news')
            .then((response) => {
                setNewsArr(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            {showRegButton === 1 &&
                <div>
                    <p className="text-center">
                        <a href={this.props.reg_button_url}><img src="/images/register_now.jpg" alt="REGISTER NOW!" /></a>
                        {ReactHtmlParser(this.props.reg_button_text)}
                    </p>
                </div>
            }
            {newsArr.map((news, i) => (
                <div key={news.page_id}>
                    {i > 0 && <hr className="mt-4 mb-4" />}
                    <h5 className="text-danger mt-1 mb-0">{news.content_heading}</h5>
                    <p><span className="small">{news.text_date1}</span></p>
                    {ReactHtmlParser(news.page_content)}
                </div>
            ))}
        </div>
    );
}

export default Home;

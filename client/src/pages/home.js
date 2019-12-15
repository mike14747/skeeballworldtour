import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';

function Home() {
    const [showRegButton, setShowRegButton] = useState(0);
    const [regButtonUrl, setregButtonUrl] = useState('');
    const [regButtonText, setregButtonText] = useState('');
    const [newsArr, setNewsArr] = useState([]);

    useEffect(() => {
        axios.get('/api/settings/homepage')
            .then((response) => {
                setShowRegButton(response.data[0].show_reg_button);
                setregButtonUrl(response.data[0].reg_button_url);
                setregButtonText(response.data[0].reg_button_text);
            })
            .catch((err) => {
                console.log(err);
            });
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
                        <a href={regButtonUrl}><img src="/images/register_now.jpg" alt="REGISTER NOW!" /></a>
                        {ReactHtmlParser(regButtonText)}
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

import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../utils/api';
import ReactHtmlParser from 'react-html-parser';

class Home extends Component {
    static defaultProps = {
        show_reg_button: 0,
        reg_button_url: '',
        reg_button_text: '',
    }

    static propTypes = {
        show_reg_button: PropTypes.number,
        reg_button_url: PropTypes.string,
        reg_button_text: PropTypes.string,
    }

    state = {
        newsArray: [],
    }

    componentDidMount() {
        api.getHomepageNews()
            .then(res => this.setState({ newsArray: res }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                {this.props.show_reg_button === 1 &&
                    <div>
                        <p className="text-center">
                            <a href={this.props.reg_button_url}><img src="./images/register_now.jpg" alt="REGISTER NOW!" /></a>
                            {ReactHtmlParser(this.props.reg_button_text)}
                        </p>
                    </div>
                }
                {this.state.newsArray.map((news, i) => (
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
}

export default Home;

const connection = require('../config/connection.js');

const StoreText = {
    // find all homepage news items that are active
    selectHomepageNews: (cb) => {
        const queryString = 'SELECT page_id, content_heading, page_content, DATE_FORMAT(text_date, "%M %d, %Y") AS text_date1 FROM store_text WHERE store_id=10 && display_content=1 ORDER BY text_date DESC, page_id DESC;';
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    // find the rules content in store_text (store_id=97)
    selectRules: (cb) => {
        const queryString = 'SELECT content_heading, page_content FROM store_text WHERE store_id=97;';
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
};

module.exports = StoreText;

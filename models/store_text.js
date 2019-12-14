const pool = require('../config/pool.js');

const StoreText = {
    // find all homepage news items that are active
    getHomepageNews: async () => {
        const queryString = 'SELECT page_id, content_heading, page_content, DATE_FORMAT(text_date, "%M %d, %Y") AS text_date1 FROM store_text WHERE store_id=10 && display_content=1 ORDER BY text_date DESC, page_id DESC;';
        const [result] = await pool.query(queryString);
        return result;
    },
    // find the rules content in store_text (store_id=97)
    getRules: async () => {
        const queryString = 'SELECT content_heading, page_content FROM store_text WHERE store_id=97;';
        const [result] = await pool.query(queryString);
        return result;
    },
};

module.exports = StoreText;

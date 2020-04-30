const pool = require('../config/connectionPool.js').getDb();

const Page = {
    getHomepageNews: async () => {
        try {
            const queryString = 'SELECT page_id, content_heading, page_content, DATE_FORMAT(text_date, "%M %d, %Y") AS text_date1 FROM store_text WHERE store_id=10 && display_content=1 ORDER BY text_date DESC, page_id DESC;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getRules: async () => {
        try {
            const queryString = 'SELECT content_heading, page_content FROM store_text WHERE store_id=97;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
};

module.exports = Page;

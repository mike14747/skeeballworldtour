const pool = require('../config/connectionPool.js').getDb();

const Page = {
    getHomepageNews: async (paramsObj = { start: 0, end: 10 }) => {
        try {
            const queryString = 'SELECT page_id, content_heading, page_content, DATE_FORMAT(text_date, "%M %d, %Y") AS text_date1 FROM store_text WHERE store_id=10 && display_content=1 ORDER BY text_date DESC, page_id DESC LIMIT ?,?;';
            const queryParams = [
                paramsObj.start,
                paramsObj.end,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getRules: async () => {
        try {
            const queryString = 'SELECT content_heading, page_content FROM store_text WHERE store_id=97;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getHomepageNewsForMongo: async () => {
        try {
            // const queryString = 'SELECT content_heading, page_content, DATE_FORMAT(text_date, "%M %d, %Y") AS text_date1, display_content FROM store_text WHERE store_id=10 ORDER BY text_date ASC';
            const queryString = 'SELECT content_heading AS heading, page_content AS content, DATE_FORMAT(text_date, "%Y-%m-%d") AS date, display_content AS display FROM store_text WHERE store_id=10 ORDER BY text_date ASC';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
};

module.exports = Page;

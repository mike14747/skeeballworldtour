const pool = require('../config/pool.js');

const Setting = {
    // find all settings for use both on the homepage, in the navbar and current season info
    getAllSettings: async () => {
        try {
            const queryString = 'SELECT current_season_id, display_schedule, show_reg_button, reg_button_url, reg_button_text, num_leaders, tourny_rankings_status, text_box_heading, text_box_text FROM settings WHERE setting_id=1';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
};

module.exports = Setting;

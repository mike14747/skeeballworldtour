const Strategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');
// const salt = bcryptjs.genSaltSync(10);
const User = require('../models/user');

const LoginStrategy = new Strategy(async (username, password, done) => {
    // console.log(bcryptjs.hashSync(password, salt));
    try {
        const data = await User.getUserByUsername({ username: username });
        if (data[0] && data[0].length === 1) {
            bcryptjs.compare(password, data[0][0].hashed_password)
                .then((res) => {
                    if (res) return done(null, { id: data[0][0].user_id, username: data[0][0].username });
                    return done(null, false, { message: 'Incorrect password!' });
                })
                .catch(error => console.log(error));
        } else if (data[0] && data[0].length === 0) {
            return done(null, false, { message: 'Incorrect username!' });
        } else {
            return done(data[1]);
        }
    } catch (error) {
        return done(error);
    }
});

module.exports = LoginStrategy;

const passport = require('passport');
const User = require('../models/user');

const LoginStrategy = require('./loginStrategy');
passport.use('login', LoginStrategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const data = await User.getUserById({ id: id });
        if (data[0] && data[0].length > 0) {
            const user = { id: data[0][0].user_id, username: data[0][0].username };
            return done(null, user);
        } else if (data[0] && data[0].length === 0) {
            return done(null, false, { message: 'Could not find a valid user!' });
        } else {
            return done(data[1]);
        }
    } catch (error) {
        return done(error);
    }
});

module.exports = passport;

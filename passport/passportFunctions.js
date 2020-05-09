const passport = require('passport');
const User = require('../models/user');

const LoginStrategy = require('./loginStrategy');
passport.use('login', LoginStrategy);

passport.serializeUser((user, done) => {
    // console.log('serializeUser:', user);
    // this takes in the whole user object from localStrategy, then returns just the user id to be serialized
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    // console.log('deserializeUser:', id);
    // this takes in the user id that was serialized, then try to match it with a user in the database
    try {
        const data = await User.getUserById({ id: id });
        if (data[0] && data[0].length > 0) {
            const user = { id: data[0][0].user_id, username: data[0][0].username };
            // console.log('found a user with that id in passport deserializeUser:', user);
            return done(null, user);
        } else if (data[0] && data[0].length === 0) {
            // console.log('could not find a valid user in passport deserializeUser');
            return done(null, false, { message: 'Could not find a valid user!' });
        } else {
            // console.log('an error occurred with the query in passport deserializeUser');
            return done(data[1]);
        }
    } catch (error) {
        return done(error);
    }
});

module.exports = passport;

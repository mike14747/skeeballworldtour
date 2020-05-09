const session = (
    require('express-session')(
        {
            key: 'swt',
            secret: process.env.SESSION_SECRET,
            store: require('./sessionStore'),
            resave: false,
            saveUninitialized: true, // setting this to true creates a cookie and session before anyone is logged in
            cookie: {
                maxAge: 2592000000, // 2592000000 is 30 days
            },
        },
    )
);

module.exports = session;

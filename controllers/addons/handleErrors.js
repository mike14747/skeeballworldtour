const HandleErrors = (err, res) => {
    console.log('\nAn error has occurred!\n' + 'aprjegkja' + err);
    return res.status(500).send('Request failed... please check your request and try again!');
};

module.exports = HandleErrors;

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

describe('Test public API routes', function () {
    const runTests = () => {
        require('./apiTests/standingsAPI');
    };

    const checkRoutes = () => {
        it('should check and see if the API routes are ready', function (done) {
            chai.request(app)
                .get('/api/test')
                .then(response => {
                    if (response.status === 200) runTests();
                    response.should.have.status(200);
                    done();
                })
                .catch(error => done(error));
        });
    };

    checkRoutes();
});

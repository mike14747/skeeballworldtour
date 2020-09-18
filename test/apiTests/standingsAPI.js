const app = require('../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const requester = chai.request(app).keepOpen();

describe('Standings API (/api/standings)', function () {
    it('should GET all standings by seasonid 24', function (done) {
        requester.get('/api/standings/seasons/24')
            .then(response => {
                response.should.have.status(200);
                response.body.should.be.a('array').and.have.lengthOf(7);
                response.body.forEach(function (element1) {
                    element1.should.be.an('object').and.have.all.keys('storeDivision', 'storeId', 'storeCity', 'divisionId', 'dayName', 'standingsList');
                    element1.storeDivision.should.be.a('string');
                    element1.storeId.should.be.a('number');
                    element1.storeCity.should.be.a('string');
                    element1.divisionId.should.be.a('number');
                    element1.dayName.should.be.a('string');
                    element1.standingsList.should.be.a('array');
                    element1.standingsList.forEach(function (element2) {
                        element2.should.be.an('object').and.have.all.keys('standingsId', 'teamId', 'teamName', 'wins', 'losses', 'ties', 'totalPoints');
                        element2.standingsId.should.be.a('number');
                        element2.teamId.should.be.a('number');
                        element2.teamName.should.be.a('string');
                        element2.wins.should.be.a('number');
                        element2.losses.should.be.a('number');
                        element2.ties.should.be.a('number');
                        element2.totalPoints.should.be.a('number');
                    });
                });
                done();
            })
            .catch(error => done(error));
    });

    it('should GET all standings by storeid 12, divisionid 3 and seasonid 24', function (done) {
        requester.get('/api/standings/stores/12/divisions/3/seasons/24')
            .then(response => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                if (response.body.length > 0) {
                    response.body.forEach(function (element) {
                        element.should.be.an('object').and.have.all.keys('standings_id', 'store_division', 'store_id', 'store_city', 'team_id', 'team_name', 'wins', 'losses', 'ties', 'total_points', 'division_id', 'day_name');
                        element.standings_id.should.be.a('number');
                        element.store_division.should.be.a('string');
                        element.store_id.should.be.a('number');
                        element.store_city.should.be.a('string');
                        element.team_id.should.be.a('number');
                        element.team_name.should.be.a('string');
                        element.wins.should.be.a('number');
                        element.losses.should.be.a('number');
                        element.ties.should.be.a('number');
                        element.total_points.should.be.a('number');
                        element.division_id.should.be.a('number');
                        element.day_name.should.be.a('string');
                    });
                }
                done();
            })
            .catch(error => done(error));
    });

    it('should GET a list of seasons that have standings data', function (done) {
        requester.get('/api/standings/seasons-list')
            .then(response => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.forEach(function (element) {
                    element.should.have.all.keys('season_id', 'season_name', 'year');
                    element.season_id.should.be.a('number');
                    element.season_name.should.be.a('string');
                    element.year.should.be.a('number');
                });
                response.body.should.have.lengthOf.at.least(24);
                done();
            })
            .catch(error => done(error));
    });

    it('should GET an empty array of standings by non-existent seasonid 0', function (done) {
        requester.get('/api/standings/seasons/0')
            .then(response => {
                response.should.have.status(200);
                response.body.should.be.a('array').and.have.lengthOf(0);
                done();
            })
            .catch(error => done(error));
    });

    it('should GET status 404 because the seasonid param is not an integer', function (done) {
        requester.get('/api/standings/seasons/12a')
            .then(response => {
                response.should.have.status(404);
                done();
            })
            .catch(error => done(error));
    });

    it('should GET status 404 because the storeid param is not an integer', function (done) {
        requester.get('/api/standings/stores/1a2/divisions/3/seasons/24')
            .then(response => {
                response.should.have.status(404);
                done();
            })
            .catch(error => done(error));
    });

    it('should GET status 404 because the divisionid param is not an integer', function (done) {
        requester.get('/api/standings/stores/12/divisions/b3/seasons/24')
            .then(response => {
                response.should.have.status(404);
                done();
            })
            .catch(error => done(error));
    });

    it('should GET status 404 because the seasonid param is not an integer', function (done) {
        requester.get('/api/standings/stores/12/divisions/3/seasons/24c')
            .then(response => {
                response.should.have.status(404);
                done();
            })
            .catch(error => done(error));
    });

    after(function (done) {
        requester.close();
        done();
    });
});

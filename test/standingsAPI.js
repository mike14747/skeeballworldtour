const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Standings API', () => {
    describe('GET /api/standings/seasons/24', () => {
        it('should get all standings by season id 24', (done) => {
            chai.request(server)
                .get('/api/standings/seasons/24')
                .end((error, response) => {
                    if (error) console.log(error);
                    response.should.have.status(200);
                    response.body.should.be.a('array').and.have.lengthOf(7);
                    response.body.forEach(element1 => {
                        element1.should.be.an('object').and.have.all.keys('storeDivision', 'storeId', 'storeCity', 'divisionId', 'dayName', 'standingsList');
                        element1.storeDivision.should.be.a('string');
                        element1.storeId.should.be.a('number');
                        element1.storeCity.should.be.a('string');
                        element1.divisionId.should.be.a('number');
                        element1.dayName.should.be.a('string');
                        element1.standingsList.should.be.a('array');
                        element1.standingsList.forEach(element2 => {
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
                });
        });
    });

    describe('GET /api/standings/stores/12/divisions/3/seasons/24', () => {
        it('should get all standings by store id 12, division id 3 and season id 24', (done) => {
            chai.request(server)
                .get('/api/standings/stores/12/divisions/3/seasons/24')
                .end((error, response) => {
                    if (error) console.log(error);
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    if (response.body.length > 0) {
                        response.body.forEach(element => {
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
                });
        });
    });

    describe('GET /api/standings/seasons-list', () => {
        it('should get a list of seasons that have standings data', (done) => {
            chai.request(server)
                .get('/api/standings/seasons-list')
                .end((error, response) => {
                    if (error) console.log(error);
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.forEach(element => {
                        element.should.have.all.keys('season_id', 'season_name', 'year');
                        element.season_id.should.be.a('number');
                        element.season_name.should.be.a('string');
                        element.year.should.be.a('number');
                    });
                    response.body.should.have.lengthOf.at.least(24);
                    done();
                });
        });
    });

    describe('GET /api/standings/seasons/12a', () => {
        it('should get a status 404 because the seasonid param is not an integer', (done) => {
            chai.request(server)
                .get('/api/standings/seasons/12a')
                .end((error, response) => {
                    if (error) console.log(error);
                    response.should.have.status(404);
                    done();
                });
        });
    });

    describe('GET /api/standings/stores/1a2/divisions/3/seasons/24', () => {
        it('should get a status 404 because the storeid param is not an integer', (done) => {
            chai.request(server)
                .get('/api/standings/stores/1a2/divisions/3/seasons/24')
                .end((error, response) => {
                    if (error) console.log(error);
                    response.should.have.status(404);
                    done();
                });
        });
    });

    describe('GET /api/standings/stores/12/divisions/b3/seasons/24', () => {
        it('should get a status 404 because the divisionid param is not an integer', (done) => {
            chai.request(server)
                .get('/api/standings/stores/12/divisions/b3/seasons/24')
                .end((error, response) => {
                    if (error) console.log(error);
                    response.should.have.status(404);
                    done();
                });
        });
    });

    describe('GET /api/standings/stores/12/divisions/3/seasons/24c', () => {
        it('should get a status 404 because the seasonid param is not an integer', (done) => {
            chai.request(server)
                .get('/api/standings/stores/12/divisions/3/seasons/24c')
                .end((error, response) => {
                    if (error) console.log(error);
                    response.should.have.status(404);
                    done();
                });
        });
    });
});

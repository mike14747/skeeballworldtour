import axios from "axios";

export default {
    getSettings: () => {
        return axios.get('/api/settings')
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getSeason: () => {
        return axios.get('/api/cur_season')
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getHomepageNews: () => {
        return axios.get('/api/homepage_news')
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getRules: () => {
        return axios.get('/api/rules')
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getStandingsById: (id) => {
        return axios.get('/api/standings/' + id)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getSearchResults: (criteria) => {
        return axios.all([
            axios.get('/api/search/players/' + criteria),
            axios.get('/api/search/teams/' + criteria)
        ])
            .then(axios.spread((players, teams) => {
                return { players: players.data, teams: teams.data };
            }));
    }
}
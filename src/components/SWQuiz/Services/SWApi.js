import axios from 'axios';

const getAPIResource = (url) => (
	axios({
		method: 'GET',
		url
	})
);

const getPeoplesPage = (page) => (
	axios({
		method: 'GET',
		url: `https://swapi.co/api/people/?page=${page}`
	})
);

export default {
	getAPIResource,
	getPeoplesPage
}
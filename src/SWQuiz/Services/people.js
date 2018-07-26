import axios from 'axios';

const getPeoplesPage = (page) => (
	axios({
		method: 'GET',
		url: `https://swapi.co/api/people/?page=${page}`
	})
);

export default {
	getPeoplesPage
}
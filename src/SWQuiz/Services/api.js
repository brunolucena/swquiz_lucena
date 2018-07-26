import axios from 'axios';

const getAPIResource = (url) => (
	axios({
		method: 'GET',
		url
	})
);

export default {
	getAPIResource
}
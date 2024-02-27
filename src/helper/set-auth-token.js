import axios from 'axios';

const setAuthToken = (token) => {
	if (token) {
		// Provide for each request
		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common.Authorization;
	}
};

export default setAuthToken;

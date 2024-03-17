// studentActions.js
import axios from 'axios';
import { baseUrl } from '../api/base';

const getStudentData = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	// tutor/user
	// students/profile
	const response = await axios.get(baseUrl + 'students/profile', config);

	return response.data;
};
const studentAction = {
	getStudentData
};

export default studentAction;

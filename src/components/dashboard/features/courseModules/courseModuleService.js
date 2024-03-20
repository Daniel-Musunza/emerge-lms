import axios from 'axios';
import { baseUrl } from '../../../../api/base';

const API_URL = `${baseUrl}course-section/`;
// Get user courseContents
const getcourseModules = async (id, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	const response = await axios.get(API_URL + 'course/' + id, config);


	return response?.data;
};

const courseModuleService = {
	getcourseModules
};

export default courseModuleService;

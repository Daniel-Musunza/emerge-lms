import axios from 'axios';
import { baseUrl } from '../../../../api/base';

const API_URL = `${baseUrl}course-section/`;
// Get user courseContents
const getcourseModules = async (id) => {
	
	const response = await axios.get(API_URL + 'student/' + id);


	return response?.data;
};

const courseModuleService = {
	getcourseModules
};

export default courseModuleService;

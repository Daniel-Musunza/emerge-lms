import axios from 'axios';
import { baseUrl } from '../../../../api/base';

const API_URL = `${baseUrl}course-section/`;
// Get user courseContents
const getcourseModules = async (token, id) => {
	
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.get(API_URL + 'student/' + id, config);

	return response?.data;
};


const postProgress = async ( token, Data) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	// const response = await axios.post(`${baseUrl}course-manager/track/progress`, Data, config);
	const response = await axios.post(`${baseUrl}course-manager/track/progress/student/${Data.studentId}/course/${courseId}`, config);

	return response.data;
};

const courseModuleService = {
	getcourseModules,
	postProgress
};

export default courseModuleService;

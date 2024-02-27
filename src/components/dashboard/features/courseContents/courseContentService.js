import axios from 'axios';
import { baseUrl } from '../../../../api/base';

const API_URL = `${baseUrl}course-sub-section/`;
// Get user courseContents
const getcourseContents = async (token, id) => {
	
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.get(API_URL + 'course/' + id, config);

	console.log(response.data.data.subsections);

	return response.data.data.subsections;
};
const createCourseContent = async (courseContentData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	const response = await axios.post(API_URL, courseContentData, config);
	return response.data;
};
const courseContentService = {
	getcourseContents,
	createCourseContent
};

export default courseContentService;

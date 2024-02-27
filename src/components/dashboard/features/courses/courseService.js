import axios from 'axios';
import { baseUrl } from '../../../../api/base';

const API_URL = `${baseUrl}course`;
const getCourses = async () => {
	const response = await axios.get(API_URL);

	return response.data;
};
const getTutorCourses = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	const response = await axios.get(`${API_URL}/all`, config);

	return response.data;
};
const createCourse = async (courseData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	const response = await axios.post(API_URL, courseData, config);
	return response.data;
};
const courseService = {
	getCourses,
	createCourse,
	getTutorCourses
};

export default courseService;

import axios from 'axios';
import { baseUrl } from '../../../../api/base';

const API_URL = `${baseUrl}`;
const getCourses = async () => {
	const response = await axios.get(API_URL + 'course');

	return response.data;
};
const bookmarkCourse = async (Data, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	const response = await axios.post(API_URL+ 'course-manager/bookmark', Data, config);
	return response.data;
};
const courseService = {
	getCourses,
	bookmarkCourse
};

export default courseService;

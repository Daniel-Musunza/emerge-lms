import axios from 'axios';
import { baseUrl } from '../../../../api/base';

const API_URL = `${baseUrl}`;
const getCourses = async () => {
	const response = await axios.get(API_URL + 'course');

	return response.data;
};
const getBookmarkedCourses = async (token, studentId) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	const response = await axios.get(API_URL + 'course-manager/bookmarked/' + studentId, config);
	return response.data;
};

const getPaidCourses = async (token, studentId) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	const response = await axios.get(API_URL + 'course-manager/paid/' + studentId, config);
	return response.data;
};

const bookmarkCourse = async ( token, Data) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	const response = await axios.post(API_URL+ 'course-manager/bookmark', Data, config);
	return response.data;
};

const payCourse = async ( token, Data) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	const response = await axios.post(API_URL+ 'course-manager/pay', Data, config);
	return response.data;
};

const courseService = {
	getCourses,
	bookmarkCourse,
	getBookmarkedCourses,
	getPaidCourses,
	payCourse
};

export default courseService;

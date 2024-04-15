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

const getCourseAnalytics = async (token, courseData) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	// /api/v1/course-manager/single/{courseId}/{studentId}
	
	const response = await axios.get(API_URL + `course-manager/single/${courseData.courseId}/${courseData.studentId}`, config);
	
	const managerId = response?.data

	const response2 = await axios.get(API_URL + `course-manager/progress/${managerId}`, config);

	console.log(response2.data);
	return response2.data;

};

const courseService = {
	getCourses,
	bookmarkCourse,
	getBookmarkedCourses,
	getCourseAnalytics,
	getPaidCourses,
	payCourse
};

export default courseService;

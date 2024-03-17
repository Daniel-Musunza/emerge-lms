import axios from 'axios';
import { baseUrl } from './base';

const coursesApi = {
	getCourses: () => {
		return axios.get(`${baseUrl}course`);
	},
	getTutorCourses: () => {
		return axios.get(`${baseUrl}course/all`);
	},
	createCourses: (courseData) => {
		return axios.post(`${baseUrl}course`, courseData);
	},
	changeCourseStatus: (courseId, status) => {
		return axios.patch(`${baseUrl}course/change-status/${courseId}`, status);
	},
	editCourseReq: (courseId, data) => {
		return axios.patch(`${baseUrl}course/${courseId}`, data);
	},
	deleteCourse: (courseId) => {
		return axios.delete(`${baseUrl}course/${courseId}`);
	}
};

export default coursesApi;

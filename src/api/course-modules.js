import axios from 'axios';
import { baseUrl } from './base';

const coursesModulesApi = {
	getCoursesModules: (id) => {
		return axios.get(`${baseUrl}course-section/course/${id}`);
	},
	createCourseModules: (courseModuleData) => {
		return axios.post(`${baseUrl}course-section`, courseModuleData);
	},
	editCourseModules: (moduleId, courseModuleData) => {
		return axios.patch(
			`${baseUrl}course-section/${moduleId}`,
			courseModuleData
		);
	}
};

export default coursesModulesApi;

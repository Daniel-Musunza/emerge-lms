import axios from 'axios';
import { baseUrl } from './base';

const coursesContentApi = {
	createCourseModules: (courseContentData) => {
		return axios.post(`${baseUrl}course-sub-section`, courseContentData);
	},
	getSingleContent: (contentId) => {
		return axios.get(`${baseUrl}course-sub-section/section/${contentId}`);
	},
	editSingleContent: (contentId, contentData) => {
		return axios.patch(
			`${baseUrl}course-sub-section/${contentId}`,
			contentData
		);
	},
	deleteContent: (contentId) => {
		return axios.delete(`${baseUrl}course-sub-section/${contentId}`);
	}
};

export default coursesContentApi;

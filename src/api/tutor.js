import axios from 'axios';
import { baseUrl } from './base';

const tutorApi = {
	getTutorProfile: () => {
		return axios.get(`${baseUrl}tutor/user`);
	},
	getAllTutors: () => {
		return axios.get(`${baseUrl}tutor`);
	},
	editTutorProfile: (tutorData) => {
		return axios.patch(`${baseUrl}tutor`, tutorData);
	}
};

export default tutorApi;

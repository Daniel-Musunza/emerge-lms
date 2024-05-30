import axios from 'axios';
import { baseUrl } from '../../../../api/base';

const API_URL = `${baseUrl}assignment/`;


const getCourseAssignments = async (token, courseId) => {

	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.get(API_URL + `all/${courseId}`, config);

	return response.data;
};

const getAssignment = async (token, assignmentId) => {

	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.get(API_URL + `single/${assignmentId}`, config);

	return response.data;
};

const getGroup = async (token, assignmentId) => {

	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.get(API_URL + `groups/${assignmentId}`, config);

	return response.data;
};

const submitAssignment = async (token, assignmentData) => {

	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	let response = null;
	if (assignmentData.groupId) {
		response = await axios.post(API_URL + `submit/group`, assignmentData, config);
	} else {
		response = await axios.post(API_URL + `submit/individual`, assignmentData, config);
	}


	return response.data;
};


const assignmentService = {
	getCourseAssignments,
	getAssignment,
	submitAssignment,
	getGroup
};

export default assignmentService;

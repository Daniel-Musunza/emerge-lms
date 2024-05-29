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
const assignmentService = {
	getCourseAssignments,
	getAssignment
};

export default assignmentService;

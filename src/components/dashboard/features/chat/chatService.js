import axios from 'axios';
import { baseUrl } from '../../../../api/base';

const API_URL = `${baseUrl}chat/`;

const getGroupChat = async (token, courseId) => {

	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.get(API_URL + `course/${courseId}`, config);

	return response.data;
};

const postMessage = async (token, messageData) => {

	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.post(API_URL + `post-message`, messageData, config);

	return response.data;
};

const getChatMessages = async (token, chatId) => {

	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.get(API_URL + `group/${chatId}`, config);

	return response.data;
};

const assignmentService = {
    getGroupChat,
	postMessage,
    getChatMessages
};

export default assignmentService;

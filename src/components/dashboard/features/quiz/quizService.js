import axios from 'axios';
import { baseUrl } from '../../../../api/base';

const API_URL = `${baseUrl}`;
const getQuiz = async (token, quizData) => {
    const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	
	const response = await axios.get(`${API_URL}quiz/student/${quizData.quizId}`, config);

	return response.data;
};


const getFullQuiz = async (token, sectionId) => {
    const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	
	const response = await axios.get(API_URL + `quiz/student/${sectionId}`, config);

	return response.data;
};

const getSingleQuestion = async (token, questionId) => {
    const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	const response = await axios.get(API_URL + `quiz-question/single/${questionId}`, config);

	return response.data;
};

const getAllQuestions = async (token, quizId) => {
    const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	const response = await axios.get(API_URL + `quiz-question/${quizId}`, config);

	return response.data.data;
};

const getQuizAnswer = async (token, questionId) => {
    const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	const response = await axios.get(API_URL + `quiz-answer/${questionId}`, config);

	return response.data;
};

const startQuizTrack = async (token, quizData) => {
    const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	const response = await axios.post(API_URL + `quiz-tracker/`, quizData, config);

	return response;
};
const calculateScore = async (token, quizData) => {
    const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	const response = await axios.post(API_URL + `quiz-result/calculate-score`, quizData, config);

	return response;
};
const courseService = {
	getQuiz,
	getFullQuiz,
    getSingleQuestion,
    getAllQuestions,
    getQuizAnswer,
    startQuizTrack,
    calculateScore
};

export default courseService;

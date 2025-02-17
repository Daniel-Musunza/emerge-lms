import axios from 'axios';
import { baseUrl } from '../../../../api/base';

const API_URL = `${baseUrl}`;
const getQuiz = async (token, quizData) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.get(`${API_URL}quiz/student/${quizData.sectionId}`, config);

	return response.data;
};


const getFullQuiz = async (token, sectionId) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	const response = await axios.get(API_URL + `quiz/student/${sectionId.sectionId}`, config);
	// const response = await axios.get(API_URL + `quiz/section/839eaa83-4153-4d6c-9f07-0af068477787`, config);
	
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

const getQuizAnswer = async (token, quizData) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	const response = await axios.post(API_URL + `quiz-result/`, quizData, config);

	return response.data.data;
};

const startQuizTrack = async (token, quizData) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	
	const response = await axios.post(API_URL + `quiz-tracker/`, quizData, config);

	return response.data;
};
const calculateScore = async (token, quizData) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	const response = await axios.post(API_URL + `quiz-result/calculate-score`, quizData, config);

	return response.data;

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

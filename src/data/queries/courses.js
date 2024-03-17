const { default: coursesApi } = require('api/courses');
const { default: errorHandler } = require('services/errorHandler');

const getCoursesAll = async () => {
	try {
		let resp = await (await coursesApi.getCourses()).data.data;
		return resp;
	} catch (error) {
		errorHandler(error);
	}
};

const fetchTutorCourses = async () => {
	try {
		let resp = await (await coursesApi.getTutorCourses()).data.data;
		return resp;
	} catch (error) {
		errorHandler(error);
	}
};
export { getCoursesAll, fetchTutorCourses };

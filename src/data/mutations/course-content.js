import coursesContentApi from 'api/course.content';

const { default: coursesModulesApi } = require('api/course-modules');
const { default: errorHandler } = require('services/errorHandler');

const addCoursesContent = async (courseContentData) => {
	try {
		let resp = await (
			await coursesContentApi.createCourseModules(courseContentData)
		).data.data;
		return resp;
	} catch (error) {
		errorHandler(error);
	}
};
const editCoursesContent = async (contentId, courseContentData) => {
	try {
		let resp = await (
			await coursesContentApi.editSingleContent(contentId, courseContentData)
		).data.data;
		return resp;
	} catch (error) {
		errorHandler(error);
	}
};

const deleteContent = async (contentId) => {
	try {
		let resp = await (
			await coursesContentApi.deleteContent(contentId)
		).data.data;
		return resp;
	} catch (error) {
		errorHandler(error);
	}
};
export { addCoursesContent, editCoursesContent, deleteContent };

const { default: coursesModulesApi } = require('api/course-modules');
const { default: errorHandler } = require('services/errorHandler');

const addCoursesModule = async (courseData) => {
	try {
		let resp = await (
			await coursesModulesApi.createCourseModules(courseData)
		).data.data;
		return resp;
	} catch (error) {
		errorHandler(error);
	}
};

const editCoursesModuleData = async (sectionId, sectionData) => {
	try {
		let resp = await (
			await coursesModulesApi.editCourseModules(sectionId, sectionData)
		).data.data;
		return resp;
	} catch (error) {
		errorHandler(error);
	}
};
export { addCoursesModule, editCoursesModuleData };

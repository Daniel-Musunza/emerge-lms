import coursesApi from 'api/courses';
import errorHandler from 'services/errorHandler';

const addCourses = async (courseData) => {
	try {
		let resp = await (await coursesApi.createCourses(courseData)).data.data;
		return resp;
	} catch (error) {
		errorHandler(error);
	}
};

const changeCourseStatus = async (id, courseStatus) => {
	try {
		let resp = await (
			await coursesApi.changeCourseStatus(id, { status: courseStatus })
		).data.data;
		return resp;
	} catch (error) {
		errorHandler(error);
	}
};

const deleteSingleCourse = async (courseId) => {
	try {
		let resp = await (await coursesApi.deleteCourse(courseId)).data.data;
		return resp;
	} catch (error) {
		errorHandler(error);
	}
};

const editCourse = async (id, courseStatus) => {
	try {
		let resp = await (
			await coursesApi.editCourseReq(id, courseStatus)
		).data.data;
		return resp;
	} catch (error) {
		errorHandler(error);
	}
};

export { addCourses, changeCourseStatus, deleteSingleCourse, editCourse };

import coursesModulesApi from 'api/course-modules';
import errorHandler from 'services/errorHandler';

const getCoursesModules = async (params) => {
	const [, { id }] = params.queryKey;
	try {
		let resp = await (
			await coursesModulesApi.getCoursesModules(id)
		).data.data;
		return resp;
	} catch (error) {
		errorHandler(error);
	}
};

//
export { getCoursesModules };

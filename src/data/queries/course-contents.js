import coursesContentApi from 'api/course.content';
import errorHandler from 'services/errorHandler';

const getCourseContent = async (params) => {
	const [, { contentId }] = params.queryKey;
	try {
		let resp = await (
			await coursesContentApi.getSingleContent(contentId)
		).data.data;
		return resp;
	} catch (error) {
		errorHandler(error);
	}
};

//
export { getCourseContent };

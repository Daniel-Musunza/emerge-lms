import tutorApi from 'api/tutor';
import errorHandler from 'services/errorHandler';

const editTutorProfile = async (tutorData) => {
	try {
		let resp = await (await tutorApi.editTutorProfile(tutorData)).data.data;
		return resp;
	} catch (error) {
		errorHandler(error);
	}
};

export { editTutorProfile };

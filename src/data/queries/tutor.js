// tutorActions.js
import tutorApi from 'api/tutor';
import errorHandler from 'services/errorHandler';

const getTutorProfile = async () => {
	try {
		let response = await (await tutorApi.getTutorProfile()).data.data;
		return response;
	} catch (error) {
		errorHandler(error);
	}
};

const getTutorUsers = async () => {
	try {
		let response = await (await tutorApi.getAllTutors()).data.data;
		return response;
	} catch (error) {
		errorHandler(error);
	}
};
export { getTutorProfile, getTutorUsers };

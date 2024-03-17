import miscApi from 'api/misc';
import errorHandler from 'services/errorHandler';

const uploadFiles = async (fileData) => {
	try {
		let resp = await (await miscApi.uploadFiles(fileData)).data.data;
		return resp;
	} catch (error) {
		errorHandler(error);
	}
};

export { uploadFiles };

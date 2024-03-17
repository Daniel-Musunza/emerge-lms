import axios from 'axios';
import { baseUrl } from './base';

const miscApi = {
	uploadFiles: (fileData) => {
		return axios.post(`${baseUrl}files-upload`, fileData);
	}
};

export default miscApi;

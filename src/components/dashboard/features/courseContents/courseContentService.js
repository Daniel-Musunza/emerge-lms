import axios from 'axios';
import { baseUrl } from '../../../../api/base';

const API_URL = `${baseUrl}course-sub-section/`;
// Get user courseContents
const getcourseContents = async (token, id) => {
	
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.get(API_URL + 'course/' + id, config);

	return response.data.data.subsections;
};

const courseContentService = {
	getcourseContents
};

export default courseContentService;

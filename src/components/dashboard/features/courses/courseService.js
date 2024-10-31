import axios from 'axios';
import { baseUrl } from '../../../../api/base';

const API_URL = `${baseUrl}`;
const getCourses = async () => {
	const response = await axios.get(API_URL + 'course');
	return response.data;
};
const getBookmarkedCourses = async (token, studentId) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	// console.log(token+ " "+ studentId);
	if (typeof studentId == "undefined") {
		return [];
	} else {
		const response = await axios.get(API_URL + 'course-manager/bookmarked/' + studentId, config);
		
		return response.data;
	}
};
const getPaidCourses = async (token, studentId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    
    if (typeof studentId === "undefined") {
        return [];
    } else {
        try {
            const response = await axios.get(`${API_URL}course-manager/paid/${studentId}`, config);
			
            return response.data;
        } catch (error) {
            console.error("Error fetching paid courses:", error);
            return null; // or handle the error according to your application's logic
        }
    }
};

const bookmarkCourse = async (token, Data) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.post(API_URL + 'course-manager/bookmark', Data, config);
	return response.data;
};

const payCourse = async (token, Data) => {
	try {
	  const config = {
		headers: {
		  Authorization: `Bearer ${token}`
		}
	  };

  
	  const response = await axios.post(API_URL + 'course-manager/pay', Data, config);
  
	
	  
	  return response.data;
	} catch (error) {
	  console.error("Error during course payment:", error.message);
	  return { success: false, message: error.message };
	}
  };
  

const getCourseAnalytics = async (token, courseData) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	
	const response = await axios.get(API_URL + `course-manager/single/${courseData.courseId}/${courseData.studentId}`, config);


	const managerId = response?.data?.data?.id

	const response2 = await axios.get(API_URL + `course-manager/progress/${managerId}`, config);


	return response2.data;

};

const getCoursePercentage = async (token, courseData) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.get(API_URL + `course-score/${courseData.courseId}/${courseData.studentId}`, config);


	return response.data;

};

const tryCourse = async (token, Data) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	const response = await axios.post(API_URL + 'course-manager/trial/activate', Data, config);
	return response.data;
};

const getCertificates = async (studentId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	const response = await axios.get(API_URL + 'certificate/student/' + studentId, config );
	
	return response.data;
}
const verifyCertificate = async (token) => {
	const response = await axios.post(API_URL + 'certificate/verify/' + token );
	return response.data;
}

const getCertificate = async (token, certificateId) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	const response = await axios.post(API_URL + 'certificate/' + certificateId, config );
	return response.data;
}

const courseService = {
	getCourses,
	bookmarkCourse,
	getBookmarkedCourses,
	getCourseAnalytics,
	getCoursePercentage,
	getPaidCourses,
	payCourse,
	tryCourse,
	getCertificates,
	verifyCertificate,
	getCertificate
};

export default courseService;

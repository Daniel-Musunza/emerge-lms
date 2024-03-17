import analyticsApi from "api/analytics";
import coursesModulesApi from "api/course-modules";
import errorHandler from "services/errorHandler";


const getCourseAnalytics = async(params) => {    
    const [, { courseId }] = params.queryKey;
    try {
        let resp = await ((await analyticsApi.getCourseAnalytics(courseId)).data.data); 
        return resp;
    } catch (error) {
        errorHandler(error)
    }
}

const getAdminAnalyticsData = async() => {    
    try {
        let resp = await ((await analyticsApi.getAdminAnalytics()).data.data); 
        return resp;
    } catch (error) {
        errorHandler(error)
    }
}

export {getAdminAnalyticsData, getCourseAnalytics}
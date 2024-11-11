import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './dashboard/features/auth/authSlice';
import courseService from './dashboard/features/courses/courseService';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const token = user?.data?.accessToken;
    const studentData = JSON.parse(localStorage.getItem('studentData'));
    const studentId = studentData?.data?.id;

    const [generalProgress, setGeneralProgress] = useState(null);
    const [courses, setCourses] = useState(null);
    const [coursesLoading, setCoursesLoading] = useState(true);
    const [bookmarkedCourses, setBookmarkedCourses] = useState(null);
    const [bookmarkedIDs, setBookmarkedIDs] = useState([]);

    // Fetch courses data
    const fetchCourses = useCallback(async () => {
        try {
            const response = await courseService.getCourses();
            setCourses(response.data.courses);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        } finally {
            setCoursesLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    // Fetch bookmarked courses data
    const fetchBookmarkedCourses = useCallback(async () => {
        if (token && studentId) {
            try {
                const response = await courseService.getBookmarkedCourses(token, studentId);
                setBookmarkedCourses(response.data);
                setBookmarkedIDs(response.data?.map(course => course.course.id));
            } catch (error) {
                console.error('Failed to fetch bookmarked courses:', error);
            }
        }
    }, [token, studentId]);

    useEffect(() => {
        fetchBookmarkedCourses();
    }, [fetchBookmarkedCourses]);

    // Calculate progress for bookmarked courses
    const fetchProgress = useCallback(async () => {
        if (bookmarkedCourses?.length > 0) {
            let totalProgress = 0;
            try {
                const coursePercentages = await Promise.all(
                    bookmarkedCourses.map(async (course) => {
                        const courseData = { courseId: course.course.id, studentId };
                        const { data: courseAnalytics } = await courseService.getCoursePercentage(token, courseData);
                        return parseFloat(courseAnalytics.courseTotalPercentage);
                    })
                );
                totalProgress = coursePercentages.reduce((acc, curr) => acc + curr, 0);
                setGeneralProgress(totalProgress / bookmarkedCourses.length);
            } catch (error) {
                console.error('Failed to fetch course progress:', error);
            }
        }
    }, [bookmarkedCourses, studentId, token]);

    useEffect(() => {
        fetchProgress();
    }, [fetchProgress]);

    const getProgress = () => {
        if (generalProgress > 80) {
            return { text: "Excellent, keep going!", value: generalProgress };
        } else if (generalProgress < 10) {
            return { text: "Good start!", value: generalProgress };
        } else if (generalProgress > 50) {
            return { text: "You're making good progress!", value: generalProgress };
        } else {
            return { text: "Keep up the effort!", value: generalProgress };
        }
    };

    const signOut = async () => {
        await dispatch(logout());
        navigate('/');
    };

    return (
        <CourseContext.Provider value={{
            generalProgress,
            courses,
            coursesLoading,
            bookmarkedCourses,
            bookmarkedIDs,
            studentData,
            getProgress,
            signOut
        }}>
            {children}
        </CourseContext.Provider>
    );
};

export const useCourseContext = () => useContext(CourseContext);

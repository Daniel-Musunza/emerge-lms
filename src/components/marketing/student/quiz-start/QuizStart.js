import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button } from 'react-bootstrap';

// Import sub/custom components
import Question from 'components/marketing/common/quiz/Question';
import QuizProgress from './QuizProgress';
import QuizPagination from './QuizPagination';
import QuizTimer from './QuizTimer';

// Import profile layout wrapper
import ProfileLayout from '../ProfileLayout';
import Spinner from 'components/Spinner';
import quizService from '../../../dashboard/features/quiz/quizService';
import studentAction from 'store/studentAction';
import axios from 'axios';

const QuizStart = () => {
    const { sectionId, quizId } = useParams();
    const { user } = useSelector((state) => state.auth);
    const token = user?.data?.accessToken;
    const { data: studentData } = useQuery(['studentData', token], () =>
        studentAction.getStudentData(token)
    );
    const quizData = { sectionId, quizId };
    const { data: quiz } = useQuery(['quiz', token], () =>
        quizService.getQuiz(token, quizData)
    );
    const { data: QuizData, isLoading } = useQuery(['Allquestions', token], () =>
        quizService.getAllQuestions(token, quizId)
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(1);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = QuizData?.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(QuizData?.length / recordsPerPage);

    const dashboardData = {
        avatar: `${studentData?.data?.profilePicture}`,
        name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
        linkname: 'Account Settings',
        link: '/marketing/student/student-edit-profile/',
    };


    if (isLoading) {
        return <Spinner />;
    }

    // Function to handle recording student's answer to a question
    const recordAnswer = async (answerId, questionId, resultId) => {
        const quizData = {
            answerId,
            questionId,
            resultId
        };
          console.log(quizData)
        try {
            const response = await quizService.startQuizTrack(token, quizData)
            console.log(response.data);
        } catch (error) {
            console.error('Error recording answer:', error);
        }
    };

    // Function to calculate quiz result
    const calculateScore = async (quizId, resultId, studentId) => {
        const quizData = { quizId, resultId, studentId}; // Adjust quizData as required
          
        try {
            const response = await quizService.calculateScore(token, quizData);
            const score = response.data.score; // Assuming response contains score
            toast.success(`Quiz completed! Your score: ${score}`);
        } catch (error) {
            console.error('Error calculating result:', error);
        }
    };

    // Handler for finish button click
    const handleFinishQuiz = () => {
        calculateScore(); // Call calculateScore function
        // Additional logic to navigate or perform other actions after finishing the quiz
    };

    return (
        <ProfileLayout dashboardData={dashboardData}>
            <Card className="mb-4">
                <Card.Body>
                    {/* Question Title + Timer */}
                    <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                        <div className="d-flex align-items-center">
                            {/* quiz img */}
                            <Link to="#">
                                {' '}
                                <img src="noimage.jpg" alt="" className="rounded img-4by3-lg" />
                            </Link>
                            {/* quiz content */}
                            <div className="ms-3">
                                <h3 className="mb-0">
                                    <Link to="#" className="text-inherit">
                                        {quiz?.data.title}{' '}
                                    </Link>
                                </h3>
                            </div>
                        </div>
                        {/* Timer */}
                        <QuizTimer hours={0} minutes={5} seconds={55} />
                    </div>
                    {currentRecords && (
                        <>
                            {/* Progress */}
                            <QuizProgress
                                currentQuestion={indexOfFirstRecord + 1}
                                totalQuestion={QuizData?.length}
                            />
                            {/* Question(s) */}
                            <div className="mt-5">
                                <span>Question {indexOfFirstRecord + 1}</span>
                                <Question
                                    item={currentRecords[0]}
                                    recordAnswer={recordAnswer} // Pass recordAnswer function as prop
                                />
                            </div>
                        </>
                    )}
                </Card.Body>
            </Card>
            <QuizPagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                handleFinishQuiz={handleFinishQuiz}
            />
        </ProfileLayout>
    );
};

export default QuizStart;

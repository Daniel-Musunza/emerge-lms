import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
    const navigate = useNavigate();
    const { sectionId, quizId } = useParams();
    const [results, setResult] = useState(null);

    const [calculatingResults, setCalculatingResults] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const token = user?.data?.accessToken;
    const [studentData, setStudentData] = useState(null);
    const [quiz, setQuiz] = useState(null);
    const [quizData, setQuizData] = useState(null);
    const [allQuestions, setAllQuestions] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Set loading state to true

            // Fetch student data
            try {
                if (token) {
                    const studentResponse = await studentAction.getStudentData(token);
                    setStudentData(studentResponse);
                }
            } catch (error) {
                console.error('Error fetching student data:', error);
            }

            // Fetch quiz data
            const quizDataPayload = { sectionId, quizId };
            try {
                if (token) {
                    const quizResponse = await quizService.getQuiz(token, quizDataPayload);
                    setQuiz(quizResponse);
                }
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }

            // Fetch all questions
            try {
                if (token && quizId) {
                    const questionsResponse = await quizService.getAllQuestions(token, quizId);
                    setAllQuestions(questionsResponse);
                }
            } catch (error) {
                console.error('Error fetching all questions:', error);
            }

            setIsLoading(false); // Set loading to false after all fetches
        };

        fetchData();
    }, [token, sectionId, quizId]); // Dependencies to refetch when they change

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
    const recordAnswer = async (answerId, questionId) => {

        try {

            const corectAnswer = await quizService.getQuizAnswer(token, { quizId: quizId, studentId: studentData?.data?.id });

            const resultId = corectAnswer?.id;

            const quizData = {
                answerId,
                questionId,
                resultId: resultId
            };
            await quizService.startQuizTrack(token, quizData)
        } catch (error) {
            console.error('Error recording answer:', error);
        }
    };


    // Function to calculate quiz result
    const calculateScore = async () => {

        setCalculatingResults(true);
        const corectAnswer = await quizService.getQuizAnswer(token, { quizId: quizId, studentId: studentData?.data?.id });

        const resultId = corectAnswer?.id;

        const quizData = {
            quizId: quizId,
            studentId: studentData?.data?.id,
            resultId
        };

        try {
            const response = await quizService.calculateScore(token, quizData);
            const result = response?.data;
           await setResult(result);
           
            navigate(`/marketing/student/quiz/result/${results.score}/${results.quiz.noOfQuestions}/${results.quiz.passMark}`);

        } catch (error) {
            toast.error('Error calculating result!')
            console.error('Error calculating result:', error);
        }
       setCalculatingResults(false);
    };

    // Handler for finish button click
    const handleFinishQuiz = () => {

        calculateScore(); // Call calculateScore function
        // Additional logic to navigate or perform other actions after finishing the quiz
    };

    return (
        <ProfileLayout dashboardData={dashboardData}>
            {calculatingResults?(
                <Card className="mb-4">
                    <Card.Body>
                        <h3>Calculating Results ...</h3>
                    </Card.Body>
                </Card>
            ):(
                <>
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
                            <QuizTimer hours={0} minutes={5} seconds={55} results={results} />
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
                </>
            )}
           
        </ProfileLayout>
    );
};

export default QuizStart;

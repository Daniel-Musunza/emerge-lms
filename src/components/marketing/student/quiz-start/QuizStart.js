// import node module libraries
import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'react-bootstrap';

// import sub/custom components
import Question from 'components/marketing/common/quiz/Question';
import QuizProgress from './QuizProgress';
import QuizPagination from './QuizPagination';
import QuizTimer from './QuizTimer';

// import profile layout wrapper
import ProfileLayout from '../ProfileLayout';
import Spinner from 'components/Spinner';
// import data files
import { QuizData } from 'data/marketing/quiz/QuizData';
import quizService from '../../../dashboard/features/quiz/quizService';
import studentAction from 'store/studentAction';

// import media files
import CourseReact from 'assets/images/course/course-react.jpg';

const QuizStart = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(1);
	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = QuizData.slice(indexOfFirstRecord, indexOfLastRecord);
	const nPages = Math.ceil(QuizData.length / recordsPerPage);

	const {sectionId, quizId} = useParams();
	
	const { user } = useSelector(
		(state) => state.auth
	);
	const token = user?.data?.accessToken;
	
	const { data: studentData } = useQuery(
		['studentData', token], // Query key
		() => studentAction.getStudentData(token) // Fetch function
	  );
	

	const quizData = {
		sectionId,
		quizId
	}

	const { data: quiz, isLoading } = useQuery(
		['quiz', token], // Query key
		() => quizService.getQuiz(token, quizData) // Fetch function
	);

	console.log(quiz)
	const dashboardData = {
		avatar: `${studentData?.data?.profilePicture}`,
		name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
		linkname: 'Account Settings',
		link: '/marketing/student/student-edit-profile/'
	};

	if(isLoading) {
		<Spinner />
	}

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
								<img src={CourseReact} alt="" className="rounded img-4by3-lg" />
							</Link>
							{/* quiz content */}
							<div className="ms-3">
								<h3 className="mb-0">
									<Link to="#" className="text-inherit">

										React Basic Quiz{' '}
									</Link>
								</h3>
							</div>
						</div>
						{/* Timer */}
						<QuizTimer hours={0} minutes={5} seconds={55} />
					</div>

					{/* Progress */}
					<QuizProgress
						currentQuestion={currentRecords[0].id}
						totalQuestion={QuizData.length}
					/>

					{/* Question(s) */}
					<div className="mt-5">
						<span>Question {currentRecords[0].id}</span>
						<Question item={currentRecords[0]} />
					</div>
				</Card.Body>
			</Card>

			{/* Quiz Pagination */}
			<QuizPagination
				nPages={nPages}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</ProfileLayout>
	);
};

export default QuizStart;

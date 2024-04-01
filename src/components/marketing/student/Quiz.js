// import node module libraries
import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'react-bootstrap';
import quizService from '../../dashboard/features/quiz/quizService'
import studentAction from 'store/studentAction';
// import profile layout wrapper
import ProfileLayout from './ProfileLayout';

// import media files
import SurveyImg from 'assets/images/svg/survey-img.svg';

const Quiz = () => {
	const sectionId = useParams();
	const { user } = useSelector(
		(state) => state.auth
	);

	const token = user?.data?.accessToken;
	const { data: studentData } = useQuery(
		['studentData', token], // Query key
		() => studentAction.getStudentData(token) // Fetch function
	  );

	

	const { data: quiz, isLoading } = useQuery(
		['quiz', token], // Query key
		() => quizService.getFullQuiz(token, sectionId) // Fetch function
	);

	console.log(quiz)
const quizId = quiz?.id || "noQuizId"

	const dashboardData = {
		avatar: `${studentData?.data?.profilePicture}`,
		name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
		linkname: 'Account Settings',
		link: '/marketing/student/student-edit-profile/'
	};

	return (
		<ProfileLayout dashboardData={dashboardData}>
			<Card className="border-0">
				<Card.Body className="p-10">
					<div className="text-center">
						<img src={SurveyImg} alt="" className="img-fluid" />
						<div className="px-lg-18">
							<h1>Welcome to Quiz </h1>
							<p className="mb-0">
								Engage live or asynchronously with quiz and poll questions that
								participants complete at their own pace.
							</p>
							<Link
								to={`/marketing/student/quiz/start/${sectionId.sectionId}/${quizId}`}
								className="btn btn-primary mt-4"
							>
								Start Your Quiz
							</Link>
						</div>
					</div>
				</Card.Body>
			</Card>
		</ProfileLayout>
	);
};

export default Quiz;

// import node module libraries
import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'react-bootstrap';
import studentAction from 'store/studentAction';
// import custom components
import ApexCharts from 'components/elements/charts/ApexCharts';

// import profile layout wrapper
import ProfileLayout from './ProfileLayout';

const QuizResult = () => {
 const {rawscore, noOfQuestions, passMark} = useParams();
	const { user } = useSelector(
		(state) => state.auth
	);

	const token = user?.data?.accessToken;
const studentData = JSON.parse(localStorage.getItem('studentData'));

	
	let score = parseFloat((rawscore / noOfQuestions * 100).toFixed(2));

	const QuizResultChartSeries = [score];
	const QuizResultChartOptions = {
		colors: ['#38a169'],
		plotOptions: {
			radialBar: {
				hollow: { margin: -2, size: `${passMark}%`, background: '#d1f5ea' },
				dataLabels: {
					name: { show: true, fontSize: '18px', fontWeight: 600, offsetY: 7 },
					value: { show: false }
				}
			}
		},
		labels: [score + '%']
	};

	const dashboardData = {
		avatar: `${studentData?.data?.profilePicture}`,
		name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
		linkname: 'Account Settings',
		link: '/marketing/student/student-edit-profile/'
	};

	return (
		<ProfileLayout dashboardData={dashboardData}>
			<Card>
				<Card.Body className="p-10 text-center">
					<div className="mb-4 ">
						{score > passMark ? (
							<>
								<h2>🎉 Congratulations. You passed!</h2>
								<p className="mb-0 px-lg-14">
									You are successfully completed the quiz. Now you click on finish
									and back to your quiz page.
								</p>
							</>
						) : (
							<>
								<h2>You failed the quiz!</h2>
								<p className="mb-0 px-lg-14">
									please go through the contents again and try the quiz later.
								</p>
							</>
						)}

					</div>
					<div className="d-flex justify-content-center">
						<div className="resultChart">
							<ApexCharts
								options={QuizResultChartOptions}
								series={QuizResultChartSeries}
								type="radialBar"
								height={150}
							/>
						</div>
					</div>
					<div className="mt-3">
						<span>
							Your Score:{' '}
							<span className="text-dark">{score}% ({score} points)</span>
						</span>
						<br />
						<span className="mt-2 d-block">
							Passing Score: <span className="text-dark">{passMark}%</span>
						</span>
					</div>
					<div className="mt-5">
						<Link to="/marketing/student/dashboard/" className="btn btn-primary">
							Finish
						</Link>
						<Link to="#" className="btn btn-outline-secondary ms-2">
							Share <i className="fe fe-external-link"></i>
						</Link>
					</div>
				</Card.Body>
			</Card>
		</ProfileLayout>
	);
};

export default QuizResult;

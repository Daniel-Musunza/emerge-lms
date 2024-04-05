// import node module libraries
import React, { useState, useEffect, Fragment } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'react-bootstrap';

// import custom components
import ApexCharts from 'components/elements/charts/ApexCharts';

// import profile layout wrapper
import ProfileLayout from './ProfileLayout';

const QuizResult = () => {

	const { user } = useSelector(
		(state) => state.auth
	);

	const token = user?.data?.accessToken;
	const { data: studentData } = useQuery(
		['studentData', token], // Query key
		() => studentAction.getStudentData(token) // Fetch function
	);

	let score = 85.83;
	const QuizResultChartSeries = [score];
	const QuizResultChartOptions = {
		colors: ['#38a169'],
		plotOptions: {
			radialBar: {
				hollow: { margin: -2, size: '50%', background: '#d1f5ea' },
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
						<h2>🎉 Congratulations. You passed!</h2>
						<p className="mb-0 px-lg-14">
							You are successfully completed the quiz. Now you click on finish
							and back to your quiz page.
						</p>
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
							<span className="text-dark">85.83% (85.83 points)</span>
						</span>
						<br />
						<span className="mt-2 d-block">
							Passing Score: <span className="text-dark">80%</span>
						</span>
					</div>
					<div className="mt-5">
						<Link to="#" className="btn btn-primary">
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

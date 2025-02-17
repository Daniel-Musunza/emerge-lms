// import node module libraries
import React, { useState, useEffect, Fragment} from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Table, Badge } from 'react-bootstrap';

// import profile layout wrapper
import ProfileLayout from './ProfileLayout';


const QuizAttempt = () => {
	const { user } = useSelector(
		(state) => state.auth
	);

	const  QuizAttemptsData = [];
	const token = user?.data?.accessToken;
const studentData = JSON.parse(localStorage.getItem('studentData'));

	const dashboardData = {
		avatar: `${studentData?.data?.profilePicture}`,
		name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
		linkname: 'Account Settings',
		link: '/marketing/student/student-edit-profile/'
	};
	const ResultBadge = ({ result }) => {
		let bgValue = '';
		switch (result) {
			case 'Fail':
				bgValue = 'danger-soft';
				break;
			case 'Pending':
				bgValue = 'warning-soft';
				break;
			case 'Pass':
				bgValue = 'success-soft';
				break;
			default:
				break;
		}
		return <Badge bg={bgValue}>{result}</Badge>;
	};
	return (
		<ProfileLayout dashboardData={dashboardData}>
			<Card>
				<Card.Header className="card-header">
					<div className="mb-3 mb-lg-0">
						<h3 className="mb-1">My Quiz Attempt</h3>
						<p className="mb-0">You can find all of your order Invoices.</p>
					</div>
				</Card.Header>
				<Table
					responsive
					hover
					className="text-nowrap text-lg-wrap table-centered"
				>
					<thead className="table-light">
						<tr>
							<th>Quiz Info</th>
							<th>Questions</th>
							<th>Correct</th>
							<th>Incorrect</th>
							<th>Marks</th>
							<th>Result</th>
						</tr>
					</thead>
					<tbody>
						{QuizAttemptsData.map((item, index) => {
							return (
								<tr key={index}>
									<td>
										<div>
											<Link to="#">
												<h5 className="mb-1">{item.quizTitle}</h5>
											</Link>
											<small>{item.attemptDateTime}</small>
										</div>
									</td>
									<td>{item.questions}</td>
									<td>{item.correct}</td>
									<td>{item.incorrect}</td>
									<td>{item.marks}</td>
									<td>
										<ResultBadge result={item.result} />
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</Card>
		</ProfileLayout>
	);
};

export default QuizAttempt;

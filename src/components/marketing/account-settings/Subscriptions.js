// import node module libraries
import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from 'react-query';

import { Card, Badge, Form, Row, Col } from 'react-bootstrap';

// import profile layout wrapper
import ProfileLayout from 'components/marketing/student/ProfileLayout';
import courseService from '../../dashboard/features/courses/courseService';

const Subscriptions = () => {
	const [AutoRenewalState, setAutoRenewalState] = useState(true);
	const { user } = useSelector(
		(state) => state.auth
	);

	const token = user?.data?.accessToken;
const studentData = JSON.parse(localStorage.getItem('studentData'));
	const dashboardData = {
		avatar: `${studentData?.data?.profilePicture}`,
		name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
		linkname: 'Account Settings',
		link: '/marketing/student/student-edit-profile/'
	};
	const studentId = studentData?.data?.id;

	const { data: paidCourses, isLoading: paidCoursesLoading } = useQuery(
		['paidCourses', token, studentId],
		() => courseService.getPaidCourses(token, studentId)
	);
	return (
		<ProfileLayout dashboardData={dashboardData}>
			<Card className="border-0">
				<Card.Header className="d-lg-flex justify-content-between align-items-center">
					<div className="mb-3 mb-lg-0">
						<h3 className="mb-0">My Subscriptions</h3>
						<p className="mb-0">
							Here is list of Courses that you have subscribed.
						</p>
					</div>
					{/* <div>
						<Link
							to="/marketing/pages/pricing/"
							className="btn btn-success btn-sm"
						>
							Upgrade Now — Go Pro $39.00
						</Link>
					</div> */}
				</Card.Header>
				<Card.Body>
					{paidCourses?.data?.courseManager?.map((sub, index) =>
						<div className="border-bottom pt-0 pb-5" key={index}>
							<Row className="mb-4">
								<Col lg={8} md={9} sm={7} className="mb-2 mb-lg-0">
									<span className="d-block">
										<span className="h4">{sub?.course.name}</span>{' '}
										<Badge bg="success" className="ms-2">
											Active
										</Badge>
									</span>
									<p className="mb-0 fs-6">Subscription ID: {sub.id}</p>
								</Col>
								<Col lg={4} md={3} sm={5} className="mb-2 mb-lg-0">
									{/* Custom Switch */}
									<span>Auto Renewal</span>
									<Form>
										<Form.Check
											name="radios"
											type="checkbox"
											className=" form-switch"
											checked={AutoRenewalState}
											onChange={() =>
												setAutoRenewalState(
													(AutoRenewalState) => !AutoRenewalState
												)
											}
										/>
									</Form>
								</Col>
								
							</Row>
							{/* Pricing data */}
							<Row>
								<Col lg={4} md={4} sm={6} className="mb-2 mb-lg-0">
									<span className="fs-6">Started On</span>
									<h6 className="mb-0">
										{sub.course.updatedAt ?
											new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(sub.course.updatedAt))
											:
											"N/A"
										}
									</h6>
								</Col>

								<Col lg={4} md={4} sm={6} className="mb-2 mb-lg-0">
									<span className="fs-6">Price</span>
									<h6 className="mb-0">{sub.course.price}</h6>
								</Col>
								<Col lg={4} md={4} sm={6} className="mb-2 mb-lg-0">
									<span className="fs-6">Access</span>
									<h6 className="mb-0">Access All Courses</h6>
								</Col>
								
							</Row>
						</div>
					)}

					{/* <div className="pt-5">
						<Row className="mb-4">
							<Col className="mb-2 mb-lg-0">
								<span className="d-block">
									<span className="h4">Free Plan</span>{' '}
									<Badge bg="danger" className="ms-2">
										Expired
									</Badge>
								</span>
								<p className="mb-0 fs-6">Subscription ID: #100010001</p>
							</Col>
							<Col xs="auto">
								<Link to="#" className="btn btn-light btn-sm disabled">
									Disabled
								</Link>
							</Col>
						</Row>
						<Row>
							<Col lg={3} md={3} sm={6} className="mb-2 mb-lg-0">
								<span className="fs-6">Started On</span>
								<h6 className="mb-0">Sept 1, 2020</h6>
							</Col>
							<Col lg={3} md={3} sm={6} className="mb-2 mb-lg-0">
								<span className="fs-6">Price</span>
								<h6 className="mb-0">Free - Trial a Month</h6>
							</Col>
							<Col lg={3} md={3} sm={6} className="mb-2 mb-lg-0">
								<span className="fs-6">Access</span>
								<h6 className="mb-0">Access All Courses</h6>
							</Col>
							<Col lg={3} md={3} sm={6} className="mb-2 mb-lg-0">
								<span className="fs-6">Billing Date</span>
								<h6 className="mb-0">Next Billing on Oct 1, 2020</h6>
							</Col>
						</Row>
					</div> */}
				</Card.Body>
			</Card>
		</ProfileLayout>
	);
};

export default Subscriptions;

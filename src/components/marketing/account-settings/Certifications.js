// import node module libraries
import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { Card, ListGroup, Row, Col, Form } from 'react-bootstrap';

// import dashboard layout
import ProfileLayout from 'components/marketing/student/ProfileLayout';
import courseService from '../../dashboard/features/courses/courseService';

const Certifications = () => {
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

	const [certificates, setCertificates] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
  
	useEffect(() => {
	  const fetchCertificates = async () => {
		if (token && studentId) {
		  try {
			setIsLoading(true);
			const response = await courseService.getCertificates(studentId, token);
			console.log(response)
			setCertificates(response || []);
		  } catch (error) {
			console.error('Error fetching certificates:', error);
		  } finally {
			setIsLoading(false);
		  }
		}
	  };
	  fetchCertificates();
	}, [studentId, token]);
  

	return (
		<ProfileLayout dashboardData={dashboardData}>
			<Card className="border-0">
				<Card.Header>
					<div className="mb-3 mb-lg-0">
						<h3 className="mb-0">My Certifications</h3>
						<p className="mb-0">
							Certifications are earned upon completing a course.
						</p>
					</div>
				</Card.Header>

				<Card.Body>
					{/* List group */}
					{certificates?.data?.length > 0 ? (
						<ListGroup variant="flush" className="mb-4">
							{certificates?.data.map((c, index) => (
								<ListGroup.Item key={index} className="px-0 pt-0 pb-4">
									<Row>
										<Col>
											<Form.Check name="group1" type="radio" id="inline-radio-1">
												<Form.Check.Input
													type="radio"
													name="address"
													defaultChecked
													className="me-1"
												/>
												<Form.Check.Label>
													<span className="h4">Course #{index + 1}</span>
													<span className="d-block">
														{ c.manager.course.name}
													</span>
												</Form.Check.Label>
											</Form.Check>
										</Col>
										<Col xs="auto">
											<a href={c.certificate} className="btn btn-outline-secondary btn-sm" target="_blank" rel="noopener noreferrer">
												View Certificate
											</a>

										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup>
					) : (
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<h3 className="mb-0">No Certifications yet</h3>
						</div>
					)}
				</Card.Body>
			</Card>
		</ProfileLayout>
	);
};

export default Certifications;

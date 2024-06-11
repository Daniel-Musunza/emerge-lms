// import node module libraries
import React, { useState, useEffect, Fragment } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'

import { Card, ListGroup, Row, Col, Form } from 'react-bootstrap';

// import dashboard layout
import ProfileLayout from 'components/marketing/student/ProfileLayout';

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
					{/* <ListGroup variant="flush" className="mb-4">
						<ListGroup.Item className="px-0 pt-0 pb-4">
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
											<span className="h4">Course #1</span>
											<span className="d-block">
												1901 Thornridge Cir. Shiloh, Hawaii 81063
											</span>
										</Form.Check.Label>
									</Form.Check>
								</Col>
								<Col xs="auto">
									<a href="#" className="btn btn-outline-secondary btn-sm">
										Download
									</a>
								</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item className="px-0 py-4 border-bottom">
							<Row>
								<Col>
									<Form.Check name="group1" type="radio" id="inline-radio-2">
										<Form.Check.Input
											type="radio"
											name="address"
											className="me-1"
										/>
										<Form.Check.Label>
											<span className="h4">Course #2</span>
											<span className="d-block">
												1901 Thornridge Cir. Shiloh, Hawaii 81063
											</span>
										</Form.Check.Label>
									</Form.Check>
								</Col>
								<Col xs="auto">
								<a href="#" className="btn btn-outline-secondary btn-sm">
										Download
									</a>
								</Col>
							</Row>
						</ListGroup.Item>
					</ListGroup> */}
					<div style={{display: 'flex', justifyContent: 'center'}}>
					<h3 className="mb-0">No Certifications yet</h3>
					</div>
				</Card.Body>
			</Card>
		</ProfileLayout>
	);
};

export default Certifications;

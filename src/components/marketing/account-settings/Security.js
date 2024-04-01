// import node module libraries
import React, { useState, useEffect } from 'react';
import {
	Col,
	Row,
	Form,
	Card,
	OverlayTrigger,
	Tooltip,
	Button
} from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// import custom components
import PasswordStrengthMeter from 'components/elements/passwordstrength/PasswordStrengthMeter';

// import profile layout wrapper
import ProfileLayout from 'components/marketing/student/ProfileLayout';
import Spinner from '../../Spinner';
import { fetchStudentData } from 'store/studentSlices';
import { useDispatch, useSelector } from 'react-redux';

const Security = () => {
	const location = useLocation();

	const [password, setPassword] = useState('');
	const [confirmpassword, setConfirmPassword] = useState('');
	const [currentpassword, setCurrentPassword] = useState('');
	const navigate = useNavigate();
	let userStore = localStorage.getItem('user');

	const dispatch = useDispatch();

	const { studentData } = useSelector((state) => state.students);

	useEffect(() => {
		if (!userStore) {
			navigate('/authentication/sign-in');
		}
		dispatch(fetchStudentData());
	}, [dispatch,userStore, navigate]);

	const dashboardData = {
		avatar: `${studentData?.data?.profilePicture}`,
		name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
		linkname: 'Create New Course',
		link: '/marketing/instructor/add-new-course/'
	};
	// if(isLoading){
	// 	return <Spinner />
	// }
	return (
			<ProfileLayout dashboardData={dashboardData}>
			<Card className="border-0">
				<Card.Header>
					<div className="mb-3 mb-lg-0">
						<h3 className="mb-0">Security</h3>
						<p className="mb-0">
							Edit your account settings and change your password here.
						</p>
					</div>
				</Card.Header>
				<Card.Body>
					<h4 className="mb-0">Email Address</h4>
					<p>
						Your current email address is{' '}
						<span className="text-success">stellaflores@gmail.com</span>
					</p>
					<Form>
						<Row>
							<Col lg={6} md={12} sm={12} className="mb-3">
								<Form.Group>
									<Form.Label htmlFor="email">New email address</Form.Label>
									<Form.Control type="email" id="email" required />
								</Form.Group>
								<Button type="submit" className="btn btn-primary mt-2">
									Update Details
								</Button>
							</Col>
						</Row>
					</Form>
					<hr className="my-5" />
					<div>
						<h4 className="mb-0">Change Password</h4>
						<p>
							We will email you a confirmation when changing your password, so
							please expect that email after submitting.
						</p>
						{/* Form */}
						<Form>
							<Row>
								<Col lg={6} md={12} sm={12}>
									{/* Current password */}

									<Form.Group className="mb-3">
										<Form.Label htmlFor="currentpassword">
											Current Password
										</Form.Label>
										<Form.Control
											type="password"
											id="currentpassword"
											value={currentpassword}
											onChange={(e) => setCurrentPassword(e.target.value)}
											required
										/>
									</Form.Group>

									{/* New password */}
									<Form.Group className="mb-3">
										<Form.Label htmlFor="newpassword">New Password</Form.Label>
										<Form.Control
											type="password"
											id="newpassword"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
										/>
									</Form.Group>

									<Row className="align-items-center g-0">
										<Col sm={6}>
											<span
												data-bs-toggle="tooltip"
												data-placement="right"
												title=""
											>
												Password strength
												<OverlayTrigger
													key="top"
													placement="top"
													overlay={
														<Tooltip id="tooltip-top">
															Test it by typing a password in the field below.
															To reach full strength, use at least 6 characters,
															a capital letter and a digit, e.g. 'Test01'
														</Tooltip>
													}
												>
													<i className="fas fa-question-circle ms-1"></i>
												</OverlayTrigger>
											</span>
										</Col>
									</Row>
									<PasswordStrengthMeter password={password} />

									{/* Confirm new password */}
									<Form.Group className="mb-3">
										<Form.Label htmlFor="confirmpassword">
											Confirm New Password
										</Form.Label>
										<Form.Control
											type="password"
											id="confirmpassword"
											value={confirmpassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											required
										/>
									</Form.Group>
									{/* Button */}
									<Button type="submit" className="btn btn-primary">
										Save Password
									</Button>
									<Col xs={6}></Col>
								</Col>
								<Col lg={12} md={12} sm={12} className="mt-4">
									<p className="mb-0">
										Can't remember your current password?{' '}
										<Link to="#">Reset your password via email</Link>
									</p>
								</Col>
							</Row>
						</Form>
					</div>
				</Card.Body>
			</Card>
		
		</ProfileLayout>

	);
};

export default Security;

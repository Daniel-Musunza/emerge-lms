// import node module libraries
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Fragment } from 'react';

import { forgotpassword } from '../features/auth/authSlice';
import { Col, Row, Card, Form, Button, Image } from 'react-bootstrap';

// import media files
import Logo from 'assets/images/brand/logo/logo-icon.png';

const ForgetPassword = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');

	const handleForgotPassword = async (e) => {
		e.preventDefault();

		const formData = {
			email: email
		};

		dispatch(forgotpassword(formData));
		navigate(`/authentication/sign-in/${email}`);
	};

	return (
		<Fragment>
			<Row className="align-items-center justify-content-center g-0 min-vh-100">
				<Col lg={5} md={5} className="py-8 py-xl-0">
					<Card>
						<Card.Body className="p-6">
							<div className="mb-4 top-form">
								<Link to="/">
									<Image src={Logo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="mb-4" alt=""
									/>
								</Link>
								<h1 className="mb-1 fw-bold">Forgot Password</h1>
								<span>Fill the form to reset your password.</span>
							</div>
							{/* Form */}
							<Form onSubmit={handleForgotPassword}>
								<Row>
									<Col lg={12} md={12} className="mb-3">
										{/*  email */}
										<Form.Label>Email</Form.Label>
										<Form.Control
											type="email"
											id="email"
											placeholder="Enter your email"
											required
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Col>
									<Col lg={12} md={12} className="mb-3 d-grid gap-2">
										{/* Button */}
										<Button variant="primary" type="submit">
											Send Reset Link
										</Button>
									</Col>
								</Row>
								<span>
									Return to <Link to="/authentication/sign-in">Sign in</Link>
								</span>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default ForgetPassword;

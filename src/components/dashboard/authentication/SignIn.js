// import node module libraries
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Fragment } from 'react';

import { login, reset } from '../features/auth/authSlice';
import {
	Col,
	Row,
	Card,
	Form,
	Button,
	Image,
	InputGroup
} from 'react-bootstrap';

// import media files
import Logo from 'assets/images/brand/logo/logo-icon.png';
import Spinner from '../../Spinner';
const SignIn = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);
	const { email } = useParams();
	const [newEmail, setEmail] = useState(email);
	// const [role, setSelectedRole] = useState('');
	const [password, setPassword] = useState('');
	const [visiblePassword, setVisiblePassword] = useState(false);


	const handleLogin = async (e) => {
		e.preventDefault();

		const formData = {
			email: newEmail,
			password: password
		};
		try {
			await dispatch(login(formData));
			toast.success("Success...");
			navigate('/marketing/student/dashboard/');
		
		} catch (error) {
			console.log(error);
			toast.error("Failed!! confirm your email or password");
		}
	};

	if (isLoading) {
		return <Spinner />;
	}
	
	return (
		<Fragment>
			<Row className="align-items-center justify-content-center g-0 min-vh-100">
				<Col lg={5} md={5} className="py-8 py-xl-0">
					<Card>
						<Card.Body className="p-6">
							<div className="mb-4 top-form">
								<Link to="/">
									<Image
										src={Logo}
										className="mb-4 align-items-center"
										alt=""
										style={{ width: '100px', height: 'auto',  objectFit: 'cover', borderRadius: '50%' }}
									/>
								</Link>
								<h1 className="mb-1 fw-bold">Sign in</h1>
								{/* <span>
									Don’t have an account?{' '}
									<Link to="/authentication/sign-up" className="ms-1">
										Sign up
									</Link>
								</span> */}
							</div>
							{/* Form */}
							<Form onSubmit={handleLogin}>
								<Row>
									{/* <Col lg={12} md={12} className="mb-3">
										<Form.Label>Select Role</Form.Label>
										<select className="form-control" id="role"
												name="role"
												onChange={(e) => setSelectedRole(e.target.value)}
											>
												<option value="" selected style={{fontSize: '15px'}}>...Select Role</option>
												<option value="admin"  style={{fontSize: '15px'}}>Admin</option>
												<option value="mod" style={{fontSize: '15px'}}>Moderator</option>
												<option value="student" style={{fontSize: '15px'}}>Tutor</option>
										</select>
									</Col> */}
									<Col lg={12} md={12} className="mb-3">
										{/* Username or email */}
										<Form.Label>Email </Form.Label>
										<Form.Control
											type="email"
											id="email"
											placeholder="Email address here"
											required
											value={newEmail}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Col>
									<Col lg={12} md={12} className="mb-3">
										{/* Password */}
										<Form.Label>Password </Form.Label>
										<InputGroup>
											<Form.Control
												id="password"
												placeholder="**************"
												required
												type={visiblePassword ? 'text' : 'password'}
												value={password}
												onChange={(e) => setPassword(e.target.value)}
											/>
											<InputGroup.Text>
												<span
													className="material-icons"
													onClick={() => setVisiblePassword(!visiblePassword)}
												>
													{visiblePassword ? 'visibility_off' : 'visibility'}
												</span>
											</InputGroup.Text>
										</InputGroup>
									</Col>
									<Col lg={12} md={12} className="mb-3">
										{/* Checkbox */}
										<div className="d-md-flex justify-content-between align-items-center">
											<Form.Group
												className="mb-3 mb-md-0"
												controlId="formBasicCheckbox"
											>
												<Form.Check type="checkbox" label="Remember me" />
											</Form.Group>
											<Link to="/authentication/forget-password">
												Forgot your password?
											</Link>
										</div>
									</Col>
									<Col lg={12} md={12} className="mb-3">
										{/* Checkbox */}
										<div className="d-md-flex justify-content-between align-items-center">
											<Form.Group
												className="mb-3 mb-md-0"
												controlId="formBasicCheckbox"
											>
												You don't have an Account ?
											</Form.Group>
											<Link to="/authentication/sign-up">
												Sign Up
											</Link>
										</div>
									</Col>
									<Col lg={12} md={12} className="mb-0 d-grid gap-2">
										{/* Button */}
										<Button variant="primary" type="submit">
											Sign in
										</Button>
									</Col>
								</Row>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default SignIn;

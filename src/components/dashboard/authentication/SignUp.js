// import node module libraries
import React, { useState, useEffect,Fragment} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch, useHistory } from 'react-redux';
import { toast } from 'react-toastify';

import { register, reset } from '../features/auth/authSlice';
import { Col, Row, Card, Form, Button, Image } from 'react-bootstrap';

// import media files
import Logo from 'assets/images/brand/logo/logo-icon.png';
import Spinner from '../../Spinner';
const SignUp = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');



	const handleRegister = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const formData = {
				firstName: first_name,
				lastName: last_name,
				email: email,
				password: password
			};

			const response = await dispatch(register(formData));
			if (response.payload && response.payload.data) {
				const responseData = response.payload.data;

					toast('Success... We have just sent you an email. Please verify your account and proceed to login.', {
						containerClass: 'larger-toast-container'
					});

					setTimeout(function () {
						navigate(`/authentication/sign-in/${responseData.email}`);
					}, 10000); // 10 seconds delay (10000 milliseconds)
			
			} else {
				if (response.payload.status === 409) {
					toast.error("Email is already registered. Please use a different email address.",
					{
						containerClass: 'larger-toast-container'
					});
				} else {
					toast.error(responseData.message || "Registration failed");
				}
			}

		} else {
			toast.error("Passwords Don't match");
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
							<div className="mb-4">
								<Link to="/">
									<Image
										src={Logo}
										className="mb-4"
										alt=""
										style={{ width: '200px', height: 'auto' }}
									/>
								</Link>
								<h1 className="mb-1 fw-bold">Register </h1>

							</div>
							{/* Form */}
							<Form onSubmit={(e) => handleRegister(e)}>
								<Row>
									<Col lg={6} md={6} className="mb-3">
										{/* User Name */}
										<Form.Label>First Name</Form.Label>
										<Form.Control
											type="text"
											id="username"
											placeholder="First Name"
											required
											value={first_name}
											onChange={(e) => setFirstName(e.target.value)}
										/>
									</Col>
									<Col lg={6} md={6} className="mb-3">
										{/* User Name */}
										<Form.Label>Last Name</Form.Label>
										<Form.Control
											type="text"
											id="username"
											placeholder="Last Name"
											required
											value={last_name}
											onChange={(e) => setLastName(e.target.value)}
										/>
									</Col>
									<Col lg={12} md={12} className="mb-3">
										{/* Email */}
										<Form.Label>Email</Form.Label>
										<Form.Control
											type="email"
											id="email"
											placeholder="Email address here"
											required
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Col>

									<Col lg={6} md={6} className="mb-3">
										{/* User Name */}
										<Form.Label>Password</Form.Label>
										<Form.Control
											type="password"
											id="password"
											placeholder="Password"
											required
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</Col>
									<Col lg={6} md={6} className="mb-3">
										{/* User Name */}
										<Form.Label>Confirm Password</Form.Label>
										<Form.Control
											type="password"
											id="confirmpassword"
											placeholder="Confirm Password"
											required
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
										/>
									</Col>
									<Col lg={12} md={12} className="mb-3">
										{/* Checkbox */}
										<div className="d-md-flex justify-content-between align-items-center">
											<Form.Group
												className="mb-3 mb-md-0"
												controlId="formBasicCheckbox"
											>
												You have an Account?
											</Form.Group>
											<Link to="/authentication/sign-in">
												Sign In
											</Link>
										</div>
									</Col>
									<Col lg={12} md={12} className="mb-0 d-grid gap-2">
										{/* Button */}
										<Button variant="primary" type="submit">
											Register
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

export default SignUp;

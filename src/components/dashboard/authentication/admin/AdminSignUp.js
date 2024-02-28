// import node module libraries
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch, useHistory } from 'react-redux';
import { toast } from 'react-toastify';
import { Fragment } from 'react';

import { register, reset } from '../../features/auth/authSlice';
import { Col, Row, Card, Form, Button, Image, Alert } from 'react-bootstrap';

// import media files
import Logo from 'assets/images/brand/logo/logo-icon.png';
import Spinner from '../../../Spinner';
const AdminSignUp = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [role, setSelectedRole] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		if (isError) {
			//toast.error(message);
		}
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const handleRegister = async (e) => {
		e.preventDefault();

		const formData = {
			first_name: first_name,
			last_name: last_name,
			email: email,
			role: role,
			password: password
		};

		console.log(formData);

		await dispatch(register(formData));
		console.log(location.state);
		const previousPath = location.state ? location.state.from.pathname : '/';
		console.log(previousPath);

		// Redirect back to the previous page
		window.location.href = previousPath;
		showSuccessNotification('Success...');
	};

	if (isLoading) {
		return <Spinner />;
	}
	return (
		<Fragment>
			<Row className="align-items-center justify-content-center">
				<Col lg={8} md={8} sm={8} className="py-8 py-xl-0">
					<Card>
						<Card.Body className="p-6">
							<div className="mb-4">
								<h1 className="mb-1 fw-bold">Register User</h1>
								<span>
									<Link to="/" className="ms-1">
										To Dashboard
									</Link>
								</span>
							</div>
							{/* Form */}
							<Form onSubmit={handleRegister}>
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
									<Col lg={12} md={12} className="mb-3">
										{/* User Name */}
										<Form.Label>Select Role</Form.Label>
										<select
											className="form-control"
											id="role"
											name="role"
											onChange={(e) => setSelectedRole(e.target.value)}
										>
											<option value="" selected style={{ fontSize: '15px' }}>
												...Select Role
											</option>
											<option value="admin" style={{ fontSize: '15px' }}>
												Admin
											</option>
											<option value="mod" style={{ fontSize: '15px' }}>
												Moderator
											</option>
											<option value="student" style={{ fontSize: '15px' }}>
												Tutor
											</option>
										</select>
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
const showSuccessNotification = (message) => {
	// Implement your notification method here
	// This could be a custom notification component, a third-party library, etc.
	<Alert variant="success">{message}</Alert>;
};

export default AdminSignUp;

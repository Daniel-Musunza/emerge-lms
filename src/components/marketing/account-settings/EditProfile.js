// import node module libraries
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { Card, Form, Row, Col, Button, Image } from 'react-bootstrap';

// import custom components
import { FormSelect } from 'components/elements/form-select/FormSelect';
import { FlatPickr } from 'components/elements/flat-pickr/FlatPickr';

// import media files
import Avatar3 from 'assets/images/avatar/avatar-3.jpg';

// import profile layout wrapper
import ProfileLayout from '../student/ProfileLayout';
import { countries as countriesList } from 'countries-list';

const mycountries = Object.values(countriesList);

import { fetchStudentData } from 'store/studentSlices';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../Spinner';

const EditProfile = () => {
	const pathInfo = useLocation();
	const navigate = useNavigate();
	let userStore = localStorage.getItem('user');
	const account = pathInfo.pathname.substring(21, 11);

	const dispatch = useDispatch();

	const { isLoading2, studentData } = useSelector((state) => state.students);
	const [firstName, setFirstName] = useState(studentData?.data?.firstName || '');
	const [lastName, setLastName] = useState(studentData?.data?.lastName || '');
	const [contactNumber, setContactNumber] = useState(studentData?.data?.contactNumber || '');
	const [addressLine1, setAddressLine1] = useState(studentData?.data?.addressLine1 || '');
	const [addressLine2, setAddressLine2] = useState(studentData?.data?.addressLine2 || '');
	const [country, setCountry] = useState(studentData?.data?.country || '');
	const [birthday, setBirthday] = useState(studentData?.data?.birthday || '');

	useEffect(() => {
		if (!userStore) {
			navigate('/authentication/sign-in');
		}
		dispatch(fetchStudentData());
	}, [dispatch, userStore, navigate]);

	const dashboardData = {
		avatar: `${studentData?.data?.profilePicture}`,
		name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
		linkname: 'Account Settings',
		link: '/marketing/student/student-edit-profile/'
	};


	if (isLoading2) {
		return <Spinner />
	}

	return (

		<ProfileLayout dashboardData={dashboardData}>
			{account === 'instructor'}
			<Card className="border-0">
				<Card.Header>
					<div className="mb-3 mb-lg-0">
						<h3 className="mb-0">Profile Details</h3>
						<p className="mb-0">
							You have full control to manage your own account setting.
						</p>
					</div>
				</Card.Header>
				<Card.Body>
					<div className="d-lg-flex align-items-center justify-content-between">
						<div className="d-flex align-items-center mb-4 mb-lg-0">
							<Image
								src={dashboardData.Avatar3}
								id="img-uploaded"
								className="avatar-xl rounded-circle"
								alt=""
							/>
							<div className="ms-3">
								<h4 className="mb-0">{dashboardData.name}</h4>
								<p className="mb-0">
									PNG or JPG no bigger than 800px wide and tall.
								</p>
							</div>
						</div>
						<div>
							<Button variant="outline-secondary" size="sm">
								Update
							</Button>{' '}
							<Button variant="outline-danger" size="sm">
								Delete
							</Button>
						</div>
					</div>
					<hr className="my-5" />
					<div>
						<h4 className="mb-0">Personal Details</h4>
						<p className="mb-4">Edit your personal information and address.</p>
						{/* Form */}
						<Form>
							<Row>
								{/* First name */}
								<Col md={6} sm={12} className="mb-3">
									<Form.Group className="mb-3" controlId="formFirstName">
										<Form.Label>First Name</Form.Label>
										<Form.Control
											type="text"
											placeholder="First Name"
											required
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
										/>
									</Form.Group>
								</Col>

								{/* Last name */}
								<Col md={6} sm={12} className="mb-3">
									<Form.Group className="mb-3" controlId="formLastName">
										<Form.Label>Last Name</Form.Label>
										<Form.Control
											type="text"
											placeholder="Last Name"
											required
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
										/>
									</Form.Group>
								</Col>

								{/* Phone */}
								<Col md={6} sm={12} className="mb-3">
									<Form.Group className="mb-3" controlId="formPhone">
										<Form.Label>Phone</Form.Label>
										<Form.Control type="text" placeholder="Phone" required
											value={contactNumber}
											onChange={(e) => setContactNumber(e.target.value)}
										/>
									</Form.Group>
								</Col>

								{/* Birthday */}
								<Col md={6} sm={12} className="mb-3">
									<Form.Group className="mb-3" controlId="formBirthday">
										<Form.Label>Birthday</Form.Label>
										<Form.Control
											as={FlatPickr}
											placeholder="Date of Birth"
											value={birthday}
											onChange={(e) => setBirthday(e.target.value)}
										/>
									</Form.Group>
								</Col>

								{/* Address Line 1 */}
								<Col md={6} sm={12} className="mb-3">
									<Form.Group className="mb-3" controlId="formBirthday">
										<Form.Label>Address Line 1</Form.Label>
										<Form.Control
											type="text"
											placeholder="Address Line 1"
											value={addressLine1}
											onChange={(e) => setAddressLine1(e.target.value)}
										/>
									</Form.Group>
								</Col>

								{/* Address Line 2 */}
								<Col md={6} sm={12} className="mb-3">
									<Form.Group className="mb-3" controlId="formBirthday">
										<Form.Label>Address Line 2</Form.Label>
										<Form.Control
											type="text"
											placeholder="Address Line 2"
											value={addressLine2}
											onChange={(e) => setAddressLine2(e.target.value)}
										/>
									</Form.Group>
								</Col>

								{/* State */}
								{/* <Col md={6} sm={12} className="mb-3">
									<Form.Group className="mb-3" controlId="formState">
										<Form.Label>State</Form.Label>
										<FormSelect value={state}
											onChange={(e) => setState(e.target.value)} >
												<option value=""></option>
											</FormSelect>
									</Form.Group>
								</Col> */}

								{/* Country */}
								<Col md={6} sm={12} className="mb-3">
									<Form.Group className="mb-3" controlId="formState">
										<Form.Label>Country</Form.Label>
										<select value={country}
											onChange={(e) => setCountry(e.target.value)}>
											<option value="" selected></option>
											{mycountries.map((country) => (
												<option key={country.name} value={country.name}>
													{country.name}
												</option>
											))}
										</select>
									</Form.Group>
								</Col>

								{/* Button */}
								<Col sm={12} md={12}>
									<Button variant="primary" type="submit">
										Update Profile
									</Button>
								</Col>
							</Row>
						</Form>
					</div>
				</Card.Body>
			</Card>
		</ProfileLayout>
	);
};

export default EditProfile;

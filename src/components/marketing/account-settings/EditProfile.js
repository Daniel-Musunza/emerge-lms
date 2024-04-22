// import node module libraries
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Card, Form, Row, Col, Button, Image } from 'react-bootstrap';
import { isError, useQuery } from 'react-query';
// import custom components
import { FormSelect } from 'components/elements/form-select/FormSelect';
import { FlatPickr } from 'components/elements/flat-pickr/FlatPickr';

import axios from 'axios';
// import media files
import {
	updateUser
} from '../../dashboard/features/auth/authSlice';
import { baseUrl } from '../../../api/base';
import { toast } from 'react-toastify';

// import profile layout wrapper
import ProfileLayout from '../student/ProfileLayout';
import { countries as countriesList } from 'countries-list';

const mycountries = Object.values(countriesList);

import studentAction from 'store/studentAction';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../Spinner';

const EditProfile = () => {
	const pathInfo = useLocation();
	const navigate = useNavigate();
	const { user, isLoading, isSuccess, isError } = useSelector(
		(state) => state.auth
	);
	const account = pathInfo.pathname.substring(21, 11);

	const dispatch = useDispatch();
	const token = user?.data?.accessToken;

	let { data: studentData } = useQuery(
		['studentData', token],
		() => studentAction.getStudentData(token)
	);

	const [firstName, setFirstName] = useState(studentData?.data?.firstName || '');
	const [lastName, setLastName] = useState(studentData?.data?.lastName || '');
	const [contactNumber, setContactNumber] = useState(studentData?.data?.phone || '');
	const [addressLine1, setAddressLine1] = useState(studentData?.data?.address || '');
	const [addressLine2, setAddressLine2] = useState(studentData?.data?.addressLine2 || '');
	const [country, setCountry] = useState(studentData?.data?.country || '');
	const [birthday, setBirthday] = useState(studentData?.data?.birthDate ? new Date(studentData?.data?.birthDate).toISOString() : '');

	const [photo, setPhoto] = useState({
		image: null,
		new: false
	});

	useEffect(() => {
		if (!user) {
			navigate('/authentication/sign-in');
		}


	}, [user, navigate]);



	const dashboardData = {
		avatar: `${studentData?.data?.profilePicture}`,
		name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
		linkname: 'Account Settings',
		link: '/marketing/student/student-edit-profile/'
	};


	const handleSubmit = async (e) => {
		e.preventDefault();

		// Prepare form data
		const formData = {
			address: addressLine1,
			birthDate: birthday, // Use the timestamp instead of the string
			country: country,
			firstName: firstName,
			lastName: lastName,
			phone: contactNumber
		};

		
			if (photo.image) {

				// Set up request headers with authorization token
				const config = {
					headers: {
						Authorization: `Bearer ${token}`
					}
				};

				// Prepare image data as FormData
				const imageData = new FormData();
				imageData.append('file', photo.image);

				// Upload image and get returned filename
				const response = await axios.post(`${baseUrl}files-upload`, imageData, config);
				const url = response?.data.data.url;
			
				// Update user profile with uploaded image URL
				await dispatch(updateUser({ ...formData, profilePicture: url }));


			} else {
				// If no photo, update user profile without image
				await dispatch(updateUser(formData));
			}
			// Display success message

			if (isSuccess) {
				toast.success("Profile Updated Successfully...");
			}else if (isError){
				toast.error("Failed to update profile")
			}
			// Fetch updated student data
			studentData = useQuery(
				['studentData', token],
				() => studentAction.getStudentData(token)
			);
		
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (

		<ProfileLayout dashboardData={dashboardData}>
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
								src={
									photo.new
										? URL.createObjectURL(photo.image)
										: studentData?.data?.profilePicture
								}
								id="img-uploaded"
								className="avatar-xl rounded-circle"
								alt="no image"
								onClick={() => document.getElementById('upload').click()}
								style={{ cursor: 'pointer' }}
							/>
							<input
								id="upload"
								name="photo"
								type="file"
								style={{ display: 'none' }}
								onChange={(e) => {
									setPhoto({
										...photo,
										image: e.target.files[0],
										new: true
									});
								}}
							/>
							<div className="ms-3">
								<h4 className="mb-0">Your profile picture</h4>
								<p className="mb-0">Click on the picture to change.</p>
							</div>
						</div>
					</div>

					<hr className="my-5" />
					<div>
						<h4 className="mb-0">Personal Details</h4>
						<p className="mb-4">Edit your personal information and address.</p>
						{/* Form */}
						<Form onSubmit={handleSubmit}>
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
											type="date"
											placeholder="Date of Birth"
											value={birthday ? birthday.slice(0, 10) : ''}
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
										<Form.Select value={country}
											onChange={(e) => setCountry(e.target.value)} className='form-group'>
											<option value="" selected></option>
											{mycountries.map((country) => (
												<option key={country.name} value={country.name}>
													{country.name}
												</option>
											))}
										</Form.Select>
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

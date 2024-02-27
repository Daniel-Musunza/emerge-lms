
// import node module libraries
import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import { createCourse, fetchCourses} from '../../../../dashboard/features/courses/courseSlice';
import { fetchStudentData } from '../../../../../store/studentSlices';
import { Col, Row, Tab, Card, Nav, Breadcrumb, Form, Button } from 'react-bootstrap';
// import sub custom components


import Spinner from '../../../../Spinner';
import ProfileLayout from 'components/marketing/instructor/ProfileLayout';

const AddNewCourse = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { isLoading2, studentData } = useSelector((state) => state.students);

	useEffect(() => {
		dispatch(fetchStudentData());
	}, [dispatch]);

	const dashboardData = {
		avatar: `${studentData?.data?.profilePicture}`,
		name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
		linkname: 'Create New Course',
		link: '/marketing/instructor/add-new-course/'
	};
	const { user } = useSelector(
		(state) => state.auth
	);
	const { courses, isLoading, isError, message } = useSelector(
		(state) => state.courses
	);

	const [name, setCourseName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [category, setCategory] = useState('');


	const modalStyles = {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'Center',
		backgroundColor: '#fff',
		boaderRadius: '5px',
		padding: '20px'

	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = {
			name: name,
			description: description,
			price: 0,
			category: category,
		};
	

		console.log(formData);

		await dispatch(createCourse(formData));
		alert("Course added Successfully...")
	};

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		dispatch(fetchCourses());
	}, [isError, message, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}
	
	return (
		<ProfileLayout dashboardData={dashboardData}>
		<Fragment>
			
			<div style={modalStyles} >
			<br/>
			<h2>Add Course</h2>
			<br></br>
				<Form onSubmit={handleSubmit}>
					<Row>
						<Col lg={12} md={12} className="mb-3">
							{/* User Name */}
							<Form.Label>Course Name</Form.Label>
							<Form.Control
								type="text"
								id="name"
								placeholder="Course Name"
								required
								value={name}
								onChange={(e) => setCourseName(e.target.value)}
							/>
						</Col>
						<Col lg={12} md={12} className="mb-3">
							{/* User Name */}
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								id="description"
								placeholder="Description"
								required
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</Col>
						<Col lg={12} md={12} className="mb-3">
							{/* User Name */}
							<Form.Label>Category</Form.Label>
							<Form.Control
								type="text"
								id="category"
								placeholder="Category"
								required
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							/>
						</Col>
						<Col lg={12} md={12} className="mb-3">
							{/* User Name */}
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								id="price"
								placeholder="Price"
								required
								value={price}
								min="0"
								onChange={(e) => setPrice(e.target.value)}
							/>
						</Col>
						<Col lg={12} md={12} className="mb-0 d-grid gap-2">
							{/* Button */}
							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Col>
					</Row>
				</Form>
			</div>


		</Fragment>
		</ProfileLayout>
	);
};

export default AddNewCourse;

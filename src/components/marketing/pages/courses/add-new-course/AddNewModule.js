
// import node module libraries
import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'

import { fetchStudentData } from '../../../../../store/studentSlices';
import { createCourseModule, fetchCourseModules } from '../../../../dashboard/features/courseModules/courseModuleSlice'
import { Col, Row, Tab, Card, Nav, Breadcrumb, Form, Button, Table } from 'react-bootstrap';
// import sub custom components


import Spinner from '../../../../Spinner';
import ProfileLayout from 'components/marketing/instructor/ProfileLayout';

const AddNewModule = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isLoading2, studentData } = useSelector((state) => state.students);


	const dashboardData = {
		avatar: `${studentData?.data?.profilePicture}`,
		name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
		linkname: 'Create New Course',
		link: '/marketing/instructor/add-new-course/'
	};
	const { id } = useParams();
	const { user } = useSelector(
		(state) => state.auth
	);
	const { courseModules, isLoading, isError, message } = useSelector(
		(state) => state.courseModules
	);

	console.log(courseModules?.data);
	const [title, setTitle] = useState('');


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
			courseContentId: id,
			title: title
		};


		console.log(formData);

		await dispatch(createCourseModule(formData));
		alert("Course Module added Successfully...")
	};



	useEffect(() => {
		if (isError) {
			//toast.error(message);
		}
		dispatch(fetchStudentData());
		dispatch(fetchCourseModules(id));
	}, [isError, message, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<ProfileLayout dashboardData={dashboardData}>
			<Fragment>
				{/* add course module */}
				<div style={modalStyles} >
					<br />
					<h2>Add Course Module</h2>
					<br></br>
					<Form onSubmit={handleSubmit}>
						<Row>
							<Col lg={12} md={12} className="mb-3">
								{/* User Name */}
								<Form.Label>Module Title</Form.Label>
								<Form.Control
									type="text"
									id="name"
									placeholder="Module Title"
									required
									value={title}
									onChange={(e) => setTitle(e.target.value)}
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

				{/* list of course modules */}
				<Table
					hover
					responsive
					className="text-nowrap table-centered"
				>
					<thead>
						<tr>
							<th> Module Number</th>
							<th>Module Title</th>
							<th></th>
						</tr>
					</thead>
					<tbody>

						{courseModules?.data?.sections
							.map((module) =>(
									<tr key={module.id} >
										<td>{module.number}</td>
										<td>{module.title}</td>
										<td>
											<Link
												to={`/marketing/instructor/add-new-content/${module.id}`}
												className={`btn btn-primary btn-sm d-none d-md-block`}
											>
												Add Module Content
											</Link>
										</td>
									</tr>)
							)}
					</tbody>
				</Table>
			</Fragment>
		</ProfileLayout>
	);
};

export default AddNewModule;

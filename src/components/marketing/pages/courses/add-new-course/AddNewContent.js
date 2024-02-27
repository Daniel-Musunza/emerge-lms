
// import node module libraries
import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'

import { fetchStudentData } from '../../../../../store/studentSlices';
import { createCourseContent } from '../../../../dashboard/features/courseContents/courseContentSlice'
import { Col, Row, Tab, Card, Nav, Breadcrumb, Form, Button, Table } from 'react-bootstrap';
// import sub custom components


import Spinner from '../../../../Spinner';
import ProfileLayout from 'components/marketing/instructor/ProfileLayout';
import { DropFiles } from 'components/elements/dropfiles/DropFiles';

const AddNewContent = () => {
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
	const { isLoading, isError, message } = useSelector((state) => state.courseContents);

	const [description, setDescription] = useState('');
	const [number, setNumber] = useState('');
	const [title, setTitle] = useState('');
	const [videoUrl, setVideoUrl] = useState('');
	const [contentFile, setContentFile] = useState(null);


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

		const formData = new FormData();
		formData.append('courseSectionId', id);
		formData.append('description', description);
		formData.append('number', number);
		formData.append('title', title);
		formData.append('videoUrl', videoUrl);
		formData.append('file', contentFile);



		console.log(formData);

		await dispatch(createCourseContent(formData));
		alert("Course Content added Successfully...")
	};



	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		dispatch(fetchStudentData());
	}, [isError, message, dispatch]);

	if (isLoading) {
		// return <Spinner />;
	}

	return (
		<ProfileLayout dashboardData={dashboardData}>
			<Fragment>
				{/* add course module */}
				<div style={modalStyles} >

					<Row>
						<Col xl={9} lg={8} md={12} sm={12}>
							<Card>
								<Card.Header>
									<h4 className="mb-0">Create Course Content</h4>
								</Card.Header>
								<Card.Body>
									{/*  Form  */}
									<Form className="mt-4">
										<Row>
											<Col md={9} sm={12}>

												<Form.Group className="mb-3">
													<Form.Label htmlFor="postTitle">Content Number</Form.Label>
													<Form.Control
														type="number"
														placeholder="Content Number"
														id="number"
														value={number}
														onChange={(e) => setNumber(e.target.value)}
													/>

												</Form.Group>
												{/* Category */}
												<Form.Group className="mb-3">
													<Form.Label htmlFor="postTitle">Content Title</Form.Label>
													<Form.Control
														type="text"
														placeholder="Post Title"
														id="postTitle"
														value={title}
														onChange={(e) => setTitle(e.target.value)}
													/>
													<Form.Text className="text-muted">
														Keep your post titles under 60 characters. Write heading
														that describe the topic content. Contextualize for Your
														Audience.
													</Form.Text>
												</Form.Group>
											</Col>
										</Row>
									</Form>


									<Form
										action="#"
										className="dropzone mt-4 p-4 border-dashed text-center"

									>
										<DropFiles
											name="contentFile"
											id="contentFile"
											onChange={(e) => setContentFile(e.target.files[0])} />
									</Form>

									{/*  Form  */}
									<Form className="mt-4">
										<Row>
											<Col md={9} sm={12}>
												{/* Excerpt */}
												<Form.Group className="mb-3">
													<Form.Label htmlFor="Excerpt">Content Description</Form.Label>
													<Form.Control
														type="text"
														placeholder="Content Description"
														id="description"
														style={{ height: '100px' }}
														value={description}
														onChange={(e) => setDescription(e.target.value)}
													/>
													<Form.Text className="text-muted">
														Keep your Description under 60 characters. Write heading
														that describe the topic content. Contextualize for Your
														Audience.
													</Form.Text>
												</Form.Group>
												{/* Title  */}
												<Form.Group className="mb-3">
													<Form.Label htmlFor="postPrice">Video URL</Form.Label>
													<Form.Control
														type="text"
														placeholder="Video Url"
														id="postVideo"
														value={videoUrl}
														onChange={(e) => setVideoUrl(e.target.value)}
													/>
												</Form.Group>



											</Col>

											<Col lg={12} md={12} sm={12}>

												<Form.Group className="mb-3">
													<Button variant="primary" className="m-1" onClick={handleSubmit}>
														Publish
													</Button>
													<Button variant="outline-secondary">Save to Draft</Button>
												</Form.Group>
											</Col>
										</Row>
									</Form>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</div>


			</Fragment>
		</ProfileLayout>
	);
};

export default AddNewContent;

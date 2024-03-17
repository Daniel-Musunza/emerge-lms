
import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { Col, Row, Container, Card, Dropdown } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// import custom components
import GKTippy from 'components/elements/tooltips/GKTippy';
import GKYouTube from 'components/marketing/common/video/GKYouTube';
import GKAccordionDefault from 'components/marketing/common/accordions/GKAccordionDefault';
import NavbarDefault from 'layouts/marketing/navbars/NavbarDefault';
import courseModuleService from '../../../../dashboard/features/courseModules/courseModuleService';

import {
	bookmarkCourse
} from '../../../../dashboard/features/courses/courseSlice';
import { fetchStudentData } from 'store/studentSlices';

import Spinner from '../../../../Spinner';

// import data
// import { CourseIndex } from 'data/marketing/CourseIndexData';

// The forwardRef is important!!





export const CourseResume = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id, courseId } = useParams();
	const { user } = useSelector(
		(state) => state.auth
	);

	const { studentData } = useSelector((state) => state.students);

	const token = user.data.accessToken;
	const { data: courseModules, isLoading } = useQuery(
		['courseModules', id, token], // Include id and token in the query key
		() => courseModuleService.getcourseModules(id, token) // Pass a function that returns the data
	  );
	

	const { courseContents } = useSelector(
		(state) => state.courseContents
	);

	const [selectedContent, setSelectedContent] = useState(null);

	const [YouTubeURL, setYouTubeURL] = useState('');


	const extractVideoId = (url) => {
		// Regular expression to match the YouTube video ID
		const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/;
		const match = url.match(regex);

		if (match && match[1]) {
			return match[1];
		} else {
			return null;
		}
	};

	const selectContent = async (content, e) => {
		e.preventDefault();

		const newURL = await extractVideoId(content.video);

		setSelectedContent(content);

		if (newURL) {
			setYouTubeURL(newURL);
		}

	};

	const AddToBookmark = async (e) => {
		e.preventDefault();
		try {
			const bookmarkData = {
				courseId: courseId,
				studentId: studentData?.data?.id
			}
			console.log(bookmarkData)
			await dispatch(bookmarkCourse(bookmarkData));
			toast("Course Added to Bookmark");
		} catch (err) {
			toast("Failed to Bookmark");
		}
	};

	useEffect(() => {
		dispatch(fetchStudentData());
		if (!user) {
			navigate('/authentication/sign-in');
		}



	// 	dispatch(fetchCourseModules(id));

	}, [dispatch]);


	const dashboardData = {
		avatar: `${studentData?.data?.profilePicture}`,
		name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
		linkname: 'Account Settings',
		link: '/marketing/student/student-edit-profile/'
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (

		<Fragment>
			<NavbarDefault dashboardData={dashboardData} />
			<main>
				<section className="mt-6 course-container">
					<Container fluid>
						<Row>
							<Col sm={12} md={12} lg={12}>
								{/*  Tab content  */}
								<div className="content">
									{/*  Video */}
									<div className="d-flex align-items-center justify-content-between mb-4 ">
										<div>
											<h3 className=" mb-0  text-truncate-line-2 small-screen-t-pdf">
												{selectedContent ? (
													<>
														{selectedContent.title} , {selectedContent.description}
													</>
												) : (
													<>
														Section Title
													</>
												)}

											</h3>
										</div>
										{selectedContent?.resources[0] && (
											<div>

												<a href={`${selectedContent.resources[0]}`} target="_blank" rel="noopener noreferrer">
													<h3 style={{ color: 'blue', paddingLeft: '10px' }} className='small-screen-t-pdf view-pdf'>View Notes</h3>
												</a>

											</div>
										)}

									</div>
									<div
										className="embed-responsive position-relative w-100 d-block overflow-hidden p-0"
										style={{ height: '500px' }}
									>
										<GKYouTube videoId={YouTubeURL} />
									</div>
								</div>
							</Col>
						</Row>
					</Container>
				</section>
				{/*  Card */}
				<section className="card course-sidebar " id="courseAccordion">
					<SimpleBar style={{ maxHeight: '93vh' }}>
						<Card>
							<Card.Header>

								<section className="bg-primary" style={{ padding: '10px', margin: '10px', width: 'fit-content', borderRadius: '5px' }}>
									<Container>

										<Row className="align-items-center">
											<Col xl={7} lg={7} md={12} sm={12}>
												<div>
													<div className="d-flex align-items-center">
														<GKTippy content="Add to Bookmarks" >
															<div
																className="bookmark text-white text-decoration-none"
																onClick={AddToBookmark}
															>
																<i className="fe fe-bookmark text-white-50 me-2"></i>
																Bookmark
															</div>
														</GKTippy>
													</div>
												</div>
											</Col>
										</Row>
									</Container>
								</section>
								<h4 className="mb-0">Table of Content</h4>
							</Card.Header>
							{/* Course Index Accordion */}
							<GKAccordionDefault
								accordionItems={courseModules}
								courseContents={courseContents}
								selectContent={selectContent}
							/>
						</Card>
					</SimpleBar>
				</section>

			</main>
		</Fragment>

	);
};

export default CourseResume;
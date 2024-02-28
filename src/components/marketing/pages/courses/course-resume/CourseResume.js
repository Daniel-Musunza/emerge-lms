
import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { Col, Row, Container, Card, Dropdown } from 'react-bootstrap';
import { MoreVertical } from 'react-feather';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// import MDI icons
import Icon from '@mdi/react';
import { mdiFacebook, mdiTwitter, mdiLinkedin, mdiContentCopy } from '@mdi/js';

// import custom components
import GKYouTube from 'components/marketing/common/video/GKYouTube';
import GKAccordionDefault from 'components/marketing/common/accordions/GKAccordionDefault';
import NavbarDefault from 'layouts/marketing/navbars/NavbarDefault';
import { fetchCourseModules } from '../../../../dashboard/features/courseModules/courseModuleSlice';



import Spinner from '../../../../Spinner';
// import data
// import { CourseIndex } from 'data/marketing/CourseIndexData';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
	<Link
		to="#"
		ref={ref}
		onClick={(e) => {
			e.preventDefault();
			onClick(e);
		}}
	>
		{children}
	</Link>
));

const ActionMenu = () => {
	return (
		<Dropdown>
			<Dropdown.Toggle as={CustomToggle}>
				<MoreVertical size="15px" className="text-secondary" />
			</Dropdown.Toggle>
			<Dropdown.Menu align="end">
				<Dropdown.Header>SHARE</Dropdown.Header>
				<Dropdown.Item eventKey="1">
					<Icon path={mdiFacebook} size={0.8} className="text-secondary" />{' '}
					Facebook
				</Dropdown.Item>
				<Dropdown.Item eventKey="2">
					<Icon path={mdiTwitter} size={0.8} className="text-secondary" />{' '}
					Twitter
				</Dropdown.Item>
				<Dropdown.Item eventKey="3">
					<Icon path={mdiLinkedin} size={0.8} className="text-secondary" />{' '}
					Linked In
				</Dropdown.Item>
				<Dropdown.Item eventKey="4">
					<Icon path={mdiContentCopy} size={0.8} className="text-secondary" />
					Copy Link
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};



export const CourseResume = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();
	const { user } = useSelector(
		(state) => state.auth
	);
	const { studentData } = useSelector((state) => state.students);
	const { courseModules, isLoading, isError, message } = useSelector(
		(state) => state.courseModules
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

	useEffect(() => {
		// if (isError) {
		// 	toast.error(message);
		// }
		if (!user) {
			navigate('/authentication/sign-in');
		}


		dispatch(fetchCourseModules(id));

	}, [isError, message, dispatch]);


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
													<h3 style={{color: 'blue', width: '100px', paddingLeft: '10px'}} className='small-screen-t-pdf'>View Notes</h3>
												</a>

											</div>
										)}
										<div className="d-flex justify-content-between">
											<Dropdown className="video-info-icon me-2">
												<Dropdown.Toggle
													bsPrefix=" "
													as="a"
													href="#"
													variant="secondary"
													id="dropdown-basic"
												>
													<i className="fe fe-help-circle text-secondary"></i>
												</Dropdown.Toggle>
												<Dropdown.Menu
													className="p-3"
													style={{ width: '300px' }}
												>
													<span>
														Lorem ipsum dolor sit amet consectetur adipisicing
														elit. cupiditate consequatur rerum eius ad ut
														officiis
													</span>
												</Dropdown.Menu>
											</Dropdown>
											<ActionMenu />
										</div>
									</div>
									<div
										className="embed-responsive position-relative w-100 d-block overflow-hidden p-0"
										style={{ height: '600px' }}
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

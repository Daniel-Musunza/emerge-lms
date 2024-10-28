import React, { Fragment, useEffect, useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { Col, Row, Nav, Tab, Card, Container, Navbar, useAccordionButton, AccordionContext } from 'react-bootstrap';
import CourseCard from 'components/marketing/pages/courses/CourseCard';
import ProfileCover from 'components/marketing/common/headers/ProfileCover';
import studentAction from 'store/studentAction';
import { useSelector, useDispatch } from 'react-redux';
import courseService from '../../dashboard/features/courses/courseService';
import Spinner from '../../Spinner';
import StatRightBadge from '../common/stats/StatRightBadge';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FooterWithLinks from 'layouts/marketing/footers/FooterWithLinks';
import { logout } from '../../dashboard/features/auth/authSlice';

const StudentDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [generalProgress, setGeneralProgress] = useState(null);
    const [courses, setCourses] = useState(null);
    const [coursesLoading, setCoursesLoading] = useState(true);
    const [bookmarkedCourses, setBookmarkedCourses] = useState(null);

    const { user } = useSelector(state => state.auth);
    const token = user?.data?.accessToken;
    const studentData = JSON.parse(localStorage.getItem('studentData'));
    const studentId = studentData?.data?.id;

    // Fetch courses data
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await courseService.getCourses();
                setCourses(response.data.courses);
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            } finally {
                setCoursesLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // Fetch bookmarked courses data
    useEffect(() => {
        if (token && studentId) {
            const fetchBookmarkedCourses = async () => {
                try {
                    const response = await courseService.getBookmarkedCourses(token, studentId);
                    setBookmarkedCourses(response.data);
                } catch (error) {
                    console.error('Failed to fetch bookmarked courses:', error);
                }
            };

            fetchBookmarkedCourses();
        }
    }, [token, studentId]);

    let bookmarkedIDs = bookmarkedCourses?.map(course => course.course.id);

    const getProgress = () => {
        if (generalProgress > 80) {
            return { text: "Excellent, keep going!", value: generalProgress };
        } else if (generalProgress < 10) {
            return { text: "Good start!", value: generalProgress };
        } else if (generalProgress > 50) {
            return { text: "You're making good progress!", value: generalProgress };
        } else {
            return { text: "Keep up the effort!", value: generalProgress };
        }
    };

    // Calculate progress for bookmarked courses
    useEffect(() => {
        if (bookmarkedIDs?.length > 0) {
            const fetchProgress = async () => {
                let totalProgress = 0;

                try {
                    const coursePercentages = await Promise.all(
                        bookmarkedIDs.map(async (courseId) => {
                            const courseData = { courseId, studentId };
                            const { data: courseAnalytics } = await courseService.getCoursePercentage(token, courseData);
                            return parseFloat(courseAnalytics.courseTotalPercentage);
                        })
                    );

                    totalProgress = coursePercentages.reduce((acc, curr) => acc + curr, 0);
                    const avProgress = totalProgress / bookmarkedIDs.length;
                    setGeneralProgress(avProgress);
                } catch (error) {
                    console.error('Failed to fetch course progress:', error);
                }
            };

            fetchProgress();
        }
    }, [bookmarkedIDs, studentId, token]);


    const SignOut = async () => {
        await dispatch(logout());
        navigate('/');
    };

    const dashboardData = {
        avatar: `${studentData?.data?.profilePicture}`,
        name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
        contact: `${studentData?.data?.contactNumber}`,
        linkname: 'Account Settings',
        link: '/marketing/student/student-edit-profile/',
        verified: false,
        outlinebutton: false,
        level: 'Beginner'
    };

    if (coursesLoading) {
        return <Spinner />;
    }

    return (
        <Fragment>
            <section className="pt-5 pb-5">
                <Container>
                    {/* User info */}
                    <ProfileCover dashboardData={dashboardData} />
                    <Row className="mt-0 links2" >
                        <Col lg={3} md={4} sm={12}>
                            <Navbar
                                expand="lg"
                                className="navbar navbar-expand-md navbar-light shadow-sm mb-4 mb-lg-0 sidenav"
                            >
                                <Link
                                    className="d-xl-none d-lg-none d-md-none text-inherit fw-bold fs-5 float-start py-1"
                                    to="#"
                                >
                                    Menu
                                </Link>
                                <Navbar.Toggle
                                    aria-controls="basic-navbar-nav"
                                    className="p-0 focus-none border-0"
                                    label="Responsive Menu"
                                >
                                    <span
                                        className="navbar-toggler d-md-none icon-shape icon-sm rounded bg-primary p-0 text-white float-end"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#sidenav"
                                        aria-controls="sidenav"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation"
                                    >
                                        <span className="fe fe-menu"></span>
                                    </span>
                                </Navbar.Toggle>

                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto flex-column" as="ul" activeKey="0">
                                        <Nav.Item
                                            as="li"
                                            className={`${dashboardData.link === location.pathname ? 'active' : ''
                                                }`}
                                        >
                                            <Link
                                                to={dashboardData.link}
                                                className='nav-link'
                                            >
                                                <i className={`fe fe-settings nav-icon`}></i>
                                                Account Settings

                                            </Link>
                                        </Nav.Item>
                                        <Nav.Item
                                            as="li"
                                            onClick={SignOut}
                                        >
                                            <Link
                                                to=""
                                                className='nav-link'
                                            >
                                                <i className={`fe fe-power nav-icon`}></i>
                                                Logout

                                            </Link>
                                        </Nav.Item>
                                    </Nav>

                                </Navbar.Collapse>
                            </Navbar>
                        </Col>

                    </Row>
                    <Row className="mt-4"  >
                        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
                            <StatRightBadge
                                title="Courses Subscribed"
                                value={courses?.filter((item) => bookmarkedIDs?.includes(item.id)).length}
                                badgeValue="learning"
                                colorVariant="warning"
                            />
                        </Col>
                        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
                            <StatRightBadge
                                title="General Learning progress"
                                subtitle="progress percentage"
                                value={`${getProgress().value !== null && getProgress().value !== undefined ? getProgress().text : 'No progress'}`}
                                badgeValue={`${getProgress().value !== null && getProgress().value !== undefined ? getProgress().value : 0}%`}
                                colorVariant="success"
                            />

                        </Col>
                        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
                            <StatRightBadge
                                title="Certifications"
                                subtitle="Recent certification"
                                value="0"
                                badgeValue="none"
                                colorVariant="info"
                            />
                        </Col>

                    </Row>
                    {/* Content */}
                    <Row className="mt-0 mt-md-4">
                        <Col lg={12} md={12} sm={12}>
                            <Row className="mb-6">
                                <Col md={12}>
                                    <Tab.Container defaultActiveKey="subscribed">
                                        <Card className="bg-transparent shadow-none ">
                                            <Card.Header className="border-0 p-0 bg-transparent">
                                                <Nav className="nav-lb-tab">
                                                    <Nav.Item className="ms-0">
                                                        <Nav.Link
                                                            eventKey="subscribed"
                                                            className="mb-sm-3 mb-md-0"
                                                        >
                                                            Subscribed {courses?.filter((item) => bookmarkedIDs?.includes(item.id)).length}
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item className="ms-0">
                                                        <Nav.Link
                                                            eventKey="all"
                                                            className="mb-sm-3 mb-md-0"
                                                        >
                                                            All Courses {courses?.length}
                                                        </Nav.Link>
                                                    </Nav.Item>


                                                </Nav>
                                            </Card.Header>
                                            <Card.Body className="p-0">
                                                <Tab.Content>
                                                    <Tab.Pane
                                                        eventKey="all"
                                                        className="pb-4 p-4 ps-0 pe-0"
                                                    >
                                                        {/* bookmarked started */}
                                                        <Row>
                                                            {courses?.map((item, index) => (
                                                                    <Col lg={3} md={6} sm={12} key={index}>
                                                                        <CourseCard item={item} />
                                                                    </Col>
                                                                ))}

                                                        </Row>
                                                        {/* end of bookmarked */}
                                                    </Tab.Pane>
                                                    <Tab.Pane
                                                        eventKey="subscribed"
                                                        className="pb-4 p-4 ps-0 pe-0"
                                                    >
                                                        {/* bookmarked started */}
                                                        {bookmarkedIDs?.length > 0 ? (
                                                            <Row>
                                                                {courses?.filter((item) => bookmarkedIDs?.includes(item.id))
                                                                .map((item, index) => (
                                                                        <Col lg={3} md={6} sm={12} key={index}>
                                                                            <CourseCard item={item} />
                                                                        </Col>
                                                                    ))}

                                                            </Row>
                                                        ) : (

                                                            <p style={{ textAlign: 'center' }}>you have not started any course
                                                                <Nav.Link
                                                                    eventKey="all"
                                                                    className="mb-sm-3 mb-md-0"
                                                                >
                                                                    start one
                                                                </Nav.Link></p>

                                                        )}
                                                        {/* end of bookmarked */}
                                                    </Tab.Pane>

                                                </Tab.Content>
                                            </Card.Body>
                                        </Card>
                                    </Tab.Container>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
            <FooterWithLinks />
        </Fragment>
    );
};

export default StudentDashboard;

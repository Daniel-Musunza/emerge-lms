import React, { Fragment, useContext, memo } from 'react';
import { Col, Row, Nav, Tab, Card, Container, Navbar } from 'react-bootstrap';
import CourseCard from 'components/marketing/pages/courses/CourseCard';
import ProfileCover from 'components/marketing/common/headers/ProfileCover';
import StatRightBadge from '../common/stats/StatRightBadge';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FooterWithLinks from 'layouts/marketing/footers/FooterWithLinks';
import { useCourseContext } from '../../courseContext';

const StudentDashboard = memo(() => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const {
        generalProgress,
        courses,
        coursesLoading,
        bookmarkedCourses,
        getProgress,
        signOut,
        studentData,
        bookmarkedIDs
    } = useCourseContext();

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

    return (
        <Fragment>
            <section className="pt-5 pb-5">
                <Container>
                    <ProfileCover dashboardData={dashboardData} />
                    <Row className="mt-0 links2">
                        <Col lg={3} md={4} sm={12}>
                            <Navbar expand="lg" className="navbar-light shadow-sm mb-4 mb-lg-0 sidenav">
                                <Link
                                    className="d-xl-none d-lg-none d-md-none text-inherit fw-bold fs-5 float-start py-1"
                                    to="#"
                                >
                                    Menu
                                </Link>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" className="p-0 border-0">
                                    <span className="navbar-toggler d-md-none icon-shape icon-sm rounded bg-primary p-0 text-white float-end">
                                        <span className="fe fe-menu"></span>
                                    </span>
                                </Navbar.Toggle>

                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto flex-column" as="ul">
                                        <Nav.Item as="li" className={dashboardData.link === location.pathname ? 'active' : ''}>
                                            <Link to={dashboardData.link} className='nav-link'>
                                                <i className="fe fe-settings nav-icon"></i> Account Settings
                                            </Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Link to="#" onClick={signOut} className='nav-link'>
                                                <i className="fe fe-power nav-icon"></i> Logout
                                            </Link>
                                        </Nav.Item>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
                            <StatRightBadge
                                title="Courses Subscribed"
                                value={courses?.filter((item) => bookmarkedIDs?.includes(item.id)).length || 0}
                                badgeValue="learning"
                                colorVariant="warning"
                            />
                        </Col>
                        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
                            <StatRightBadge
                                title="General Learning Progress"
                                subtitle="Progress Percentage"
                                value={getProgress().text || 'No progress'}
                                badgeValue={`${getProgress().value || 0}%`}
                                colorVariant="success"
                            />
                        </Col>
                        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
                            <StatRightBadge
                                title="Certifications"
                                subtitle="Recent Certification"
                                value="0"
                                badgeValue="none"
                                colorVariant="info"
                            />
                        </Col>
                    </Row>
                    <Row className="mt-0 mt-md-4">
                        <Col lg={12}>
                            <Tab.Container defaultActiveKey="subscribed">
                                <Card className="bg-transparent shadow-none">
                                    <Card.Header className="border-0 p-0 bg-transparent">
                                        <Nav className="nav-lb-tab">
                                            <Nav.Item className="ms-0">
                                                <Nav.Link eventKey="subscribed" className="mb-sm-3 mb-md-0">
                                                    Subscribed {courses?.filter((item) => bookmarkedIDs?.includes(item.id)).length || 0}
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className="ms-0">
                                                <Nav.Link eventKey="all" className="mb-sm-3 mb-md-0">
                                                    All Courses {courses?.length || 0}
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Card.Header>
                                    <Card.Body className="p-0">
                                        <Tab.Content>
                                            <Tab.Pane eventKey="all" className="pb-4 p-4 ps-0 pe-0">
                                                <Row>
                                                    {courses?.map((item, index) => (
                                                        <Col lg={3} md={6} sm={12} key={index}>
                                                            <CourseCard item={item} />
                                                        </Col>
                                                    ))}
                                                </Row>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="subscribed" className="pb-4 p-4 ps-0 pe-0">
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
                                                    <p style={{ textAlign: 'center' }}>
                                                        You have not started any course.
                                                        <Nav.Link eventKey="all" className="mb-sm-3 mb-md-0">
                                                            Start one
                                                        </Nav.Link>
                                                    </p>
                                                )}
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Card.Body>
                                </Card>
                            </Tab.Container>
                        </Col>
                    </Row>
                </Container>
            </section>
            <FooterWithLinks />
        </Fragment>
    );
});

export default StudentDashboard;

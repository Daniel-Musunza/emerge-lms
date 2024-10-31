// import node module libraries
import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'

import { Card, ListGroup, Row, Col, Form, Nav, Tab } from 'react-bootstrap';

// import dashboard layout
import ProfileLayout from 'components/marketing/student/ProfileLayout';
import assignmentService from 'components/dashboard/features/assignments/assignmentService';

const Assignments = () => {
    const { user } = useSelector(
        (state) => state.auth
    );
    let { id, course } = useParams();
    const token = user?.data?.accessToken;
    const studentData = JSON.parse(localStorage.getItem('studentData'));
    const dashboardData = {
        avatar: `${studentData?.data?.profilePicture}`,
        name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
        linkname: 'Account Settings',
        link: '/marketing/student/student-edit-profile/'
    };

    const [assignments, setAssignments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchAssignments = async () => {
        if (token && id) {
          try {
            setIsLoading(true);
            const response = await assignmentService.getCourseAssignments(token, id);
            setAssignments(response || []);
          } catch (error) {
            console.error('Error fetching assignments:', error);
          } finally {
            setIsLoading(false);
          }
        }
      };
      fetchAssignments();
    }, [token, id]);

    return (
        <ProfileLayout dashboardData={dashboardData}>
            <Card className="border-0">
                <Card.Header>
                    <div className="mb-3 mb-lg-0">
                        <h3 className="mb-0">{course} Assignments</h3>
                        <p className="mb-0">
                            Assignments are enabled anytime.
                        </p>
                    </div>
                </Card.Header>

                <Card.Body>

                    <Tab.Container defaultActiveKey="individual">
                        <Card className="bg-transparent shadow-none ">
                            <Card.Header className="border-0 p-0 bg-transparent">
                                <Nav className="nav-lb-tab">
                                    <Nav.Item>
                                        <Nav.Link
                                            eventKey="individual"
                                            className="mb-sm-3 mb-md-0"
                                        >
                                            {assignments?.data?.filter((x) => x.type === "individual").length}  Individual Assignments
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="ms-0">
                                        <Nav.Link
                                            eventKey="group"
                                            className="mb-sm-3 mb-md-0"
                                        >
                                            {assignments?.data?.filter((x) => x.type === "group").length}  Group Assignments
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body className="p-0">
                                <Tab.Content>
                                    <Tab.Pane
                                        eventKey="individual"
                                        className="pb-4 p-4 ps-0 pe-0"
                                    >
                                        {assignments?.data?.filter((x) => x.type === "individual").length > 0 ? (
                                            <ListGroup variant="flush" className="mb-4">
                                                {assignments?.data?.filter((x) => x.type === "individual").map((x) => {
                                                    return (
                                                        <ListGroup.Item className="px-0 pt-0 pb-4" key={x.id}>
                                                            <Row>
                                                                <Col>
                                                                    <Form.Check name="group1" type="radio" id={`inline-radio-${x.id}`}>
                                                                        <Form.Check.Input
                                                                            type="radio"
                                                                            name="address"
                                                                            defaultChecked
                                                                            className="me-1"
                                                                        />
                                                                        <Form.Check.Label>
                                                                            <span className="h4">{x.title}</span>
                                                                            <span className="d-block">
                                                                                {x.description}
                                                                            </span>
                                                                        </Form.Check.Label>
                                                                    </Form.Check>
                                                                </Col>
                                                                <Col xs="auto">
                                                                    <Link to={`/marketing/assignments/single/${x.id}/${x.title}`} className="btn btn-outline-secondary btn-sm  w-100 mb-4">
                                                                        View More
                                                                    </Link>
                                                                    <br></br>
                                                                    <Link to={`/marketing/assignments/results/${x.id}`} className="btn btn-outline-secondary btn-sm  w-100 text-white bg-dark">
                                                                        View Results
                                                                    </Link>

                                                                </Col>
                                                            </Row>
                                                        </ListGroup.Item>
                                                    );
                                                })}
                                            </ListGroup>

                                        ) : (
                                            <div className="px-0 pt-0 pb-4 flex align-center justify-center">
                                                {isLoading ? (
                                                    <h2>Loading ...</h2>
                                                ) : (
                                                    <h2>No assignments available</h2>
                                                )}

                                            </div>
                                        )}
                                    </Tab.Pane>
                                    <Tab.Pane
                                        eventKey="group"
                                        className="pb-4 p-4 ps-0 pe-0"
                                    >
                                        {assignments?.data?.filter((x) => x.type === "group").length > 0 ? (
                                            <ListGroup variant="flush" className="mb-4">
                                                {assignments?.data?.filter((x) => x.type === "group").map((x) => {
                                                    return (
                                                        <ListGroup.Item className="p-4" key={x.id}>
                                                            <Row>
                                                                <Col>
                                                                    <Form.Check name="group1" type="radio" id={`inline-radio-${x.id}`}>
                                                                        <Form.Check.Input
                                                                            type="radio"
                                                                            name="address"
                                                                            defaultChecked
                                                                            className="me-1"
                                                                        />
                                                                        <Form.Check.Label>
                                                                            <span className="h4">{x.title}</span>
                                                                            <span className="d-block">
                                                                                {x.description}
                                                                            </span>
                                                                        </Form.Check.Label>
                                                                    </Form.Check>
                                                                </Col>
                                                                <Col xs="auto">
                                                                    <Link to={`/marketing/assignments/single/${x.id}/${x.title}`} className="btn btn-outline-secondary btn-sm  w-100 mb-4">
                                                                        View More
                                                                    </Link>
                                                                    <br></br>
                                                                    <Link to={`/marketing/assignments/results/${x.id}`} className="btn btn-outline-secondary btn-sm  w-100 text-white bg-dark">
                                                                        View Results
                                                                    </Link>

                                                                </Col>
                                                            </Row>
                                                        </ListGroup.Item>
                                                    );
                                                })}
                                            </ListGroup>

                                        ) : (
                                            <div className="px-0 pt-0 pb-4 flex align-center justify-center">
                                                {isLoading ? (
                                                    <h2>Loading ...</h2>
                                                ) : (
                                                    <h2>No assignments available</h2>
                                                )}

                                            </div>
                                        )}
                                    </Tab.Pane>

                                </Tab.Content>
                            </Card.Body>
                        </Card>
                    </Tab.Container>
                </Card.Body>
            </Card>
        </ProfileLayout>
    );
};

export default Assignments;

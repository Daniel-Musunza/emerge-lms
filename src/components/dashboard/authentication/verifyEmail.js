import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Fragment } from 'react';
import { Col, Row, Card, Form, Button, Image } from 'react-bootstrap';
import Logo from 'assets/images/brand/logo/logo-icon.png';

const VerifyEmail = () => {


    const { email } = useParams();


    return (
        <Fragment>
            <Row className="align-items-center justify-content-center g-0 min-vh-100">
                <Col lg={5} md={5} className="py-8 py-xl-0">
                    <Card>
                        <Card.Body className="p-6">
                            <div className="mb-4">
                                <Link to="/">
                                    <Image src={Logo} className="mb-4" alt="" style={{ width: '200px', height: 'auto' }} />
                                </Link>
                                <h1 className="mb-1 fw-bold">Verify Email</h1>
                            </div>
                            <Form >

                                <Row>
                                    <Col lg={12} md={12} className="mb-3 d-grid gap-2">
                                        <p>Congratulations! Your action was successful. We've just sent an email to {email}. Please verify your account and proceed to login.</p>
                                    </Col>
                                </Row>
                                <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                                    {/* Button */}
                                    <Link to={`/authentication/sign-in/${email}`}>
                                        <Button variant="primary" >
                                            Proceed
                                        </Button>
                                    </Link>

                                </Col>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default VerifyEmail;

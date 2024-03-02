import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Col, Row, Card, Form, Button, Image} from 'react-bootstrap';
import Logo from 'assets/images/brand/logo/logo-icon.png';
import Spinner from '../../Spinner';

import { verifyEmail } from '../features/auth/authSlice';

const VerifyEmail = () => {

    const dispatch = useDispatch();

    const { isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const { code } = useParams();


    const handleVerification = async (e) => {
        e.preventDefault();

        await dispatch(verifyEmail({confirmationCode: code}));

    };

    useEffect(() => {
        if (isSuccess) {
            toast("Verification Complete");
            window.close(); // Close the window upon successful verification
        }
        if (isError) {
            // Handle error cases
            toast.error("Verification failed");
        }
	}, [isError, isSuccess]);
    if (isLoading) {
        return <Spinner />;
    }

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
                                        <h2>Verification code: <span style={{  fontWeight: '700px', color: 'blue' }} className='v-code'>{code}</span>.</h2>
                                    </Col>
                                </Row>
                                <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                                    {/* Button */}
                                    <Button variant="primary"  onClick={(e) => handleVerification(e)}>
                                        Verify
                                    </Button>

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

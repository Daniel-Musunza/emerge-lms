// import node module libraries
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container, Form, Card } from 'react-bootstrap';

import AppStore from 'assets/images/svg/appstore.svg';
import PlayStore from 'assets/images/svg/playstore.svg';

import NavbarMegaMenu from 'layouts/marketing/navbars/mega-menu/NavbarMegaMenu';
import FooterWithLinks from 'layouts/marketing/footers/FooterWithLinks';

const GetApp = () => {

    return (
        <Fragment>
            <NavbarMegaMenu />
            <section className="py-lg-13 py-8 bg-primary">
                <Container>
                    {/* Page header */}
                    <Row className="align-items-center">

                        <div className="d-flex">
                            <h2>Ready to access a world of knowledge and innovation at your fingertips? Download the app here.</h2>
                            <Link to="#">
                                <img src={AppStore} alt="" className="img-fluid" />
                            </Link>
                            <Link to="#" className="ms-2">
                                <img src={PlayStore} alt="" className="img-fluid" />
                            </Link>
                        </div>
                    </Row>
                </Container>
            </section>

            {/* Content */}
            <section className="mt-n8 pb-8">
                <Container>
                    <Row >
                        <Col lg={3.5} md={12} sm={12} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', margin: '10px' }}>
                            <p> Designed for convenience and accessibility, our app provides seamless access to a range of courses, empowering you to engage in transformative learning experiences anytime, anywhere. Whether you're on the go or at home, the app ensures that you can stay connected to your educational journey and continue your pursuit of excellence and prosperity.</p>
                        </Col>
                        <Col lg={3.5} md={12} sm={12} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', margin: '10px' }}>
                            <p>To get started with the app, simply download it from the App Store or Google Play Store for your mobile device, or visit our website to download the desktop version. Once installed, you'll have instant access to comprehensive library of courses, interactive learning modules, and collaborative tools, all optimized for intuitive navigation and seamless user experience. Whether you prefer to learn on your smartphone, tablet, or computer, the app provides a user-friendly interface and robust features to support your learning goals and aspirations.</p>
                        </Col>
                        <Col lg={3.5} md={12} sm={12} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', margin: '10px' }}>
                            <p>Download the app now and embark on an exhilarating journey of discovery, inspiration and limitless possibilities!</p>
                        </Col>
                        {/* <Col lg={4} md={12} sm={12}>
							<PricingCard content={starter} pricingMode={Pricing} />
						</Col>
						<Col lg={4} md={12} sm={12}>
							<PricingCard content={individual} pricingMode={Pricing} />
						</Col>
						<Col lg={4} md={12} sm={12}>
							<PricingCard content={team} pricingMode={Pricing} />
						</Col> */}
                    </Row>
                </Container>
            </section>

            {/* Client logo */}
            {/* <LogosTopHeading2
				title="Loved by over 5 million users from companies like"
				logos={LogoList1}
			/> */}
            <FooterWithLinks />
        </Fragment>
    );
};

export default GetApp;

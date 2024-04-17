// import node module libraries
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container, Form, Card } from 'react-bootstrap';

// import hooks
import useToggle from 'hooks/useToggle';


import AppStore from 'assets/images/svg/appstore.svg';
import PlayStore from 'assets/images/svg/playstore.svg';

import NavbarMegaMenu from 'layouts/marketing/navbars/mega-menu/NavbarMegaMenu';
import FooterWithLinks from 'layouts/marketing/footers/FooterWithLinks';
import CTAInstructor from 'assets/images/png/cta-instructor-1.png';
import Dollor from 'assets/images/svg/dollor.svg';
import Graph from 'assets/images/svg/graph.svg';

const BecomeAnInstructor = () => {

    return (
        <Fragment>
            <NavbarMegaMenu />
            <section className="py-lg-14 pb-8 bg-white">
			<Container className="bg-primary rounded-3">
				<Row className="align-items-center">
					<Col lg={6} xs={12} className="d-none d-lg-block">
						<div className="d-flex justify-content-center ">
							<div className="position-relative">
								<img src={CTAInstructor} alt="" className="img-fluid mt-n13" />
								<div className="ms-n12 position-absolute bottom-0 start-0 mb-6">
									<img src={Dollor} alt="" />
								</div>
								<div className="me-n4 position-absolute top-0 end-0">
									<img src={Graph} alt="" />
								</div>
							</div>
						</div>
					</Col>
					<Col lg={5} xs={12}>
						<div className="text-white p-5 p-lg-0">
							<h2 className="h1 text-white">Become an instructor today</h2>
							<p className="mb-0">
								Becoming an instructor is undoubtedly one of the most exciting opportunities to share your expertise, inspire learners, and contribute to the growth and development of the local eco-system
							</p>
						

							<br />
							<Link to="#" className="btn btn-white mt-4">
								Start Teaching Today
							</Link>
						</div>
					</Col>
				</Row>
			</Container>
		</section>

            {/* Content */}
            <section className="mt-n8 pb-8">
                <Container>
                    <Row >
                        <Col lg={3.5} md={12} sm={12} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', margin: '10px' }}>
                        <p>As an instructor, you'll have the chance to design and deliver engaging and impactful courses that empower individuals with the knowledge and skills needed to thrive in today’s dynamic economy. Whether you're an experienced educator, industry professional, or subject matter expert, we welcome and value passionate individuals who are committed to making a difference through education.</p>
                        </Col>
                        <Col lg={3.5} md={12} sm={12} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', margin: '10px' }}>
                        <br/><p>	To become an instructor, simply submit your application along with your resume, a brief bio highlighting your qualifications and experience, and a proposal outlining the course or courses you'd like to teach. Our team will review your application and, if successful, provide you with the necessary resources and support to develop and deliver high-quality course content. Whether you're interested in teaching entrepreneurship, design, or tech, you have a platform to share your expertise and inspire learners from around the world.</p>
                        </Col>
                        <Col lg={3.5} md={12} sm={12} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', margin: '10px' }}>
                        <br/><p>	As an instructor, you'll join a diverse and supportive community of educators dedicated to excellence in teaching and learning. You'll have access to state-of-the-art solutions, which features intuitive course creation tools, interactive multimedia capabilities, and robust analytics to track learner progress and engagement. Additionally, you'll receive ongoing support and professional development opportunities to enhance your instructional skills, expand your reach, and maximize the impact of your courses.</p>
                        </Col>
                        <Col lg={3.5} md={12} sm={12} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', margin: '10px' }}>
                        <p>	Why not join us today and help shape the future of education through life changing learning experiences?
									</p>
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

export default BecomeAnInstructor;

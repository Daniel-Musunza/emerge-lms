// import node module libraries
import { Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import custom components
import SectionHeadingLeft3 from 'components/marketing/common/section-headings/SectionHeadingLeft3';

const GeeksCulture = () => {
	const title = 'Culture that drives business results';
	const subtitle = 'Daruurs Culture';
	const description = `We recognize the importance of investing in our team members' growth and development. That is why we offer opportunities for continuous learning and professional advancement, including access to training programs, workshops, and networking events. Whether you're a seasoned professional or just starting your career, we provide you with a platform to expand your horizons, build valuable skills, and make positive impact locally and beyond. `;

	return (
		<section className="py-14 bg-light">
			<Container>
				<Row>
					<Col xl={{ offset: 1, span: 10 }} xs={12}>
						<SectionHeadingLeft3
							title={title}
							description={description}
							subtitle={subtitle}
							className="display-4"
						/>

						<div className="mt-8">
							<Row>
								<Col lg={6} md={6} xs={12}>
									<div className="mb-6 pe-xl-12">
										<h3 className="mb-3 fw-bold">Benefits</h3>
										<p className="mb-0 fs-4 ">
											Our benefits are designed to ensure that you are
											energized, focused, and thriving, from comprehensive
											mental health programs.
										</p>
									</div>
								</Col>
								<Col lg={6} md={6} xs={12}>
									<div className="mb-6 pe-xl-12">
										<h3 className="mb-3 fw-bold">Growth</h3>
										<p className="mb-0 fs-4 ">
											Areas of Responsibility empower you to take on big{' '}
											<Link to="#">responsibilities</Link> across the
											organization that will challenge you in new ways.
										</p>
									</div>
								</Col>
								<Col lg={6} md={6} xs={12}>
									<div className="mb-6 pe-xl-12">
										<h3 className="mb-3 fw-bold">Values</h3>
										<p className="mb-0 fs-4 ">
											Our values are at the core of{' '}
											<Link to="#">who we are</Link>. They guide us on how we
											show up & work together in order to be our best achieve
											our mission.
										</p>
									</div>
								</Col>
								<Col lg={6} md={6} xs={12}>
									<div className="mb-6 pe-xl-12">
										<h3 className="mb-3 fw-bold">Development</h3>
										<p className="mb-0  fs-4 ">
											You’ll have access to Conscious Leadership training,
											success guides, anti-bias & harassment training, & free
											executive coaching.{' '}
										</p>
									</div>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default GeeksCulture;

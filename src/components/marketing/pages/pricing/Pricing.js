// import node module libraries
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container, Form, Card } from 'react-bootstrap';

// import hooks
import useToggle from 'hooks/useToggle';

// import custom components
import LogosTopHeading2 from 'components/marketing/common/clientlogos/LogosTopHeading2';

// import sub components
import PricingCard from './PricingCard';

// import data files
import {
	starter,
	individual,
	team
} from 'data/marketing/pricing/PricingPlansData';
import LogoList1 from 'data/marketing/clientlogos/LogoList1';
import FAQsData from 'data/marketing/pricing/FAQsData';
import NavbarMegaMenu from 'layouts/marketing/navbars/mega-menu/NavbarMegaMenu';
import FooterWithLinks from 'layouts/marketing/footers/FooterWithLinks';

const Pricing = () => {
	const [Pricing, togglePricing] = useToggle(true);

	return (
		<Fragment>
			<NavbarMegaMenu />
			<section className="py-lg-13 py-8 bg-primary">
				<Container>
					{/* Page header */}
					<Row className="align-items-center">
						<Col xl={{ span: 8, offset: 2 }} lg={12} md={12} sm={12}>
							<div className="text-center mb-6 px-md-8">
								<h1 className="text-white display-3 fw-bold">
									Simple pricing that scales with your business
								</h1>
								<p className="text-white lead mb-4">
									Reference giving information on its origins, as well as a
									random Lipsum generator.
								</p>
								{/* Switch Toggle */}
								<div
									id="pricing-switch"
									className="d-flex justify-content-center align-items-center"
								>
									<span className="text-white me-2">Monthly</span>
									<Form>
										<Form.Check
											name="radios"
											type="checkbox"
											className="form-switch form-switch-price"
											id="pricingSwitch"
											checked={Pricing}
											onChange={togglePricing}
										/>
									</Form>
									<span className="text-white ms-2">Yearly</span>
								</div>
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
							<p>We believe in making quality education accessible to all, which is why our course pricing is designed with affordability and value in mind. Our courses are competitively priced to ensure that even aspiring and steadfast visionaries and professionals in hard to reach and marginalised areas can access top-notch education without breaking the bank.
							</p>
						</Col>
						<Col lg={3.5} md={12} sm={12} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', margin: '10px' }}>
							<p>With transparent pricing structures and no hidden fees, you can enrol in courses confidently, knowing that you're getting exceptional value for your investment.
							</p>
						</Col>
						<Col lg={3.5} md={12} sm={12} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', margin: '10px' }}>
							<p>Furthermore, we offer flexible payment options and discounts for bulk enrolments, making it easier for organizations, educational institutions, and community groups to empower their members with relevant skills and knowledge. We are committed to fostering economic growth and community resilience in remote, arid and undeveloped regions, and our fair and accessible pricing reflects this dedication to inclusivity and opportunity for all.
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

export default Pricing;

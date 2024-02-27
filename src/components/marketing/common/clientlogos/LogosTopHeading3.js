/**********************************
Component : Logo with Top Heading 3
***********************************

Availalble Parameters

logos        : Required, list of the logos in JSON format
title        : Optional, title to show logo section title
limit        : Optional, default -1 i.e. show all logo, if you want to limit N number of logos you can specific with thisparameter

*/

// import node module libraries
import PropTypes from 'prop-types';
import { Container, Row, Col, Image } from 'react-bootstrap';

const LogosTopHeading3 = ({ logos, title, limit }) => {
	const Heading = () => {
		if (title) {
			return (
				<Col xl={12} md={12} xs={12}>
					<div className="text-center mb-6">
						<span className="text-uppercase text-gray-400 ls-md fw-semibold">{title}</span>
					</div>
				</Col>
			);
		} else {
			return '';
		}
	};

	const LogoImage = ({ logo }) => {
		return (
			<Col>
				<div className="text-center mb-3">
					<Image src={logo} alt="" className="img-fluid" />
				</div>
			</Col>
		);
	};

	const LogosList = () => {
		if (limit > 0) {
			return logos
				.slice(0, limit)
				.map((logo, index) => <LogoImage key={index} logo={logo.logoimage} />);
		} else {
			return logos.map((logo, index) => (
				<LogoImage key={index} logo={logo.logoimage} />
			));
		}
	};

	return (
		<section className="py-lg-6 py-6">
			{/* 
<section className="py-lg-6 py-6">
      <Container className="text-center">
        <Row>
          <Col xl={12} md={12} xs={12}>
            <div className="text-center mb-6">
              <span className="text-uppercase text-gray-400 ls-md fw-semibold">Trusted by over 12,500 great teams</span>
            </div>
          </Col>
          <Col xl={{ offset: 1, span: 10 }} >
            <div className="table-responsive-lg">
              <div className=" row row-cols-lg-5 row-cols-md-3 row-cols-2 g-4 flex-nowrap">
                <div className="col">
                  <div className="text-center mb-3">
                    <img src="../../assets/images/brand/gray-logo-airbnb.svg" alt="airbnb" className="img-fluid"/>
                  </div>
                </div>
                <div className="col">
                  <div className="text-center mb-3">
                    <img src="../../assets/images/brand/gray-logo-digitalocean.svg" alt="digitalocean" className="img-fluid"/>
                  </div>
                </div>
                <div className="col">
                  <div className="text-center mb-3">
                    <img src="../../assets/images/brand/gray-logo-discord.svg" alt="discord" className="img-fluid"/>
                  </div>
                </div>
                <div className="col">
                  <div className="text-center mb-3">
                    <img src="../../assets/images/brand/gray-logo-intercom.svg" alt="intercom" className="img-fluid"/>
                  </div>
                </div>
                <div className="col">
                  <div className="text-center mb-3">
                    <img src="../../assets/images/brand/gray-logo-netflix.svg" alt="netflix" className="img-fluid"/>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
	 */}
			<Container>
				<Row>
					<Heading />
					<Col xl={{ offset: 1, span: 10 }} >
						<div className="table-responsive-lg">
							<Row className="row-cols-lg-5 row-cols-md-3 row-cols-2 g-4 flex-nowrap">
								<LogosList />
							</Row>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

LogosTopHeading3.propTypes = {
	logos: PropTypes.array,
	title: PropTypes.string,
	limit: PropTypes.number
};

LogosTopHeading3.defaultProps = {
	limit: -1
};

export default LogosTopHeading3;

// import node module libraries
import { Col, Row, Card } from 'react-bootstrap';

const Version_02_02_00 = () => {
	const NewSass = [
		'/src/assets/scss/theme/vendor/bs-stepper/_bs-stepper.scss'
	];
	const UpdatedSass = [
		'/src/assets/scss/theme/_theme.scss',
		'/src/assets/scss/theme/components/_table.scss',
		'/src/assets/scss/theme/vendor/slick-slider/_slick.scss',
		'/src/assets/scss/theme/components/_course-layout.scss'
	];
	const NewMediaFiles = [
		'/src/assets/images/ecommerce/*.*',
		'/src/assets/images/education/*.*',
		'/src/assets/images/portfolio/*.*',
		'/src/data/marketing/svg/graphics-1.svg',
		'/src/data/marketing/svg/graphics-2.svg',
	];
	const NewReactFiles = [
		'/src/components/dashboard/ecommerce/*.*',
		'/src/components/dashboard/tables/*.*',
		'/src/components/dashboard/common/ecommerce/*.*',

		'/src/components/marketing/cards/SkillCourseCard.js',
		'/src/components/marketing/cards/WebinarCard.js',
		'/src/components/marketing/common/clientlogos/LogosTopHeading3.js',
		'/src/components/marketing/common/portfolio/PortfolioItem.js',
		'/src/components/marketing/common/ratings/RatingsBiIcon.js',
		'/src/components/marketing/landings/landing-education/*.*',
		'/src/components/marketing/pages/portfolio/*.*',

		'/src/components/elements/advance-table/TanstackTable.js',
		'/src/components/elements/data-table/*.*',
		'/src/components/elements/stepper/GKStepper3.js',

		'/src/context/providers/CartProvider.js',
		'/src/hooks/useCartOperations.js',
		'/src/reducers/CartReducer.js'
	];
	const UpdatedReactFiles = [
		'/src/AppConfig.js',
		'/src/context/Context.js',
		'/src/layouts/AllRoutes.js',
		'/src/layouts/dashboard/HeaderDefault.js',
		'/src/layouts/marketing/navbars/NavbarLanding.js',
		'/src/routes/marketing/NavbarDefault.js',
		'/src/routes/dashboard/DashboardRoutes.js',
		'/src/routes/dashboard/NavbarTopRoutes.js',
		'/src/components/elements/advance-table/GlobalFilter.js',
		'/src/components/elements/advance-table/Checkbox.js',
		'/src/components/elements/advance-table/Pagination.js',
		'/src/components/marketing/common/clientlogos/LogosTopHeading.js',
		'/src/elements/lightbox/GKLightbox.js',
	];

	const NewDataFiles = [
		'/src/data/marketing/portfolio/*.*',
		'/src/data/marketing/landing-education/*.*',
		'/src/data/dashboard/customers/*.*',
		'/src/data/dashboard/ecommerce/*.*',
		'/src/data/dashboard/tables/*.*',
		'/src/data/dashboard/maps/*.*',
	];
	return (
		<Row>
			<Col lg={7} md={12} sm={12}>
				<Card>
					<Card.Body>
						<Row className="g-0">
							<Col lg={3} md={4} sm={12}>
								<div id="initial">
									<h5 className="mb-3 fwsemi--bold">
										<code>v2.2.0</code> - November 29, 2023
									</h5>
								</div>
							</Col>
							<Col lg={9} md={8} sm={12}>
								<div>
									<h4 className="mb-1 fw-semi-bold">EmergeLMS React Update </h4>
									<ul>
										<li>Required packages are Updated</li>
										<li>Fixed a few bugs</li>
										<li>
											Added below new packages<br />
											<code>@tanstack/react-table</code> ( removed <code>react-table</code> )<br />
											<code>react-moment</code><br />
											<code>react-data-table-component</code> <br />
											<code>styled-components</code>(as a required dev-dependency for react-data-table-component)<br />
										</li>
									</ul>
								</div>
								<div className="mb-3">
									<h4>New Components / Layout / Hook / React Files:</h4>
									<ul>
										{NewReactFiles.map((item, index) => {
											return (
												<li key={index}>
													<code>{item}</code>
												</li>
											);
										})}
									</ul>
								</div>

								<div className="mb-3">
									<h4>New SCSS Files:</h4>
									<ul>
										{NewSass.map((item, index) => {
											return (
												<li key={index}>
													<code>{item}</code>
												</li>
											);
										})}
									</ul>
								</div>


								<div className="mb-3">
									<h4>New Data Files:</h4>
									<ul>
										{NewDataFiles.map((item, index) => {
											return (
												<li key={index}>
													<code>{item}</code>
												</li>
											);
										})}
									</ul>
								</div>

								<div className="mb-3">
									<h4>New Media Files:</h4>
									<ul>
										{NewMediaFiles.map((item, index) => {
											return (
												<li key={index}>
													<code>{item}</code>
												</li>
											);
										})}
									</ul>
								</div>

								<div className="mb-3">
									<h4>Updated React Files:</h4>
									<ul>
										{UpdatedReactFiles.map((item, index) => {
											return (
												<li key={index}>
													<code>{item}</code>
												</li>
											);
										})}
									</ul>
									(Note: Updated all react pages in which react-table was used by replacing @tanstack/react-table )
								</div>

								<div className="mb-3">
									<h4>Updated SCSS Files:</h4>
									<ul>
										{UpdatedSass.map((item, index) => {
											return (
												<li key={index}>
													<code>{item}</code>
												</li>
											);
										})}
									</ul>
								</div>


							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default Version_02_02_00;

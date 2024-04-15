// import node module libraries
import { Col, Row, Container, Image } from 'react-bootstrap';

// import custom components
import SectionHeadingLeft3 from 'components/marketing/common/section-headings/SectionHeadingLeft3';

// import media files
import EmployeePicture from 'assets/images/career/employee-pic.jpg';

const TeamMemberAtGeeks = () => {
	const title = 'Our employees are our most valuable assets';
	const subtitle = 'A team member at Daruur';
	const description = `Join a vibrant family of like-minded professionals who are committed to creating positive change. From instructional design and course development to marketing and community engagement, there are various roles available allowing you to leverage your skills and talents to make a difference. Additionally, our community fosters a supportive and collaborative work environment where creativity and innovation are encouraged and rewarded enabling you to not only thrive but also pivot your career and grow professionally.`;

	return (
		<section className="pt-lg-14 pb-lg-18 pb-8 bg-white">
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
							<Row className="align-items-center">
								<Col lg={6} md={12} sm={12}>
									<div>
										<p className="h2 fw-normal mb-6 lh-lg">
											"Working for Daruur has been nothing short of an
											incredible experience. I am continuously motivated to
											bring my best self to work with Daruur’s core values as
											inspiration - what a special place to grow and thrive!"
										</p>
										<h3 className="mb-1">Tiffany Moore</h3>
										<p className="mb-0">Software Engineer</p>
									</div>
								</Col>
								<Col lg={{ offset: 1, span: 5 }} md={12} sm={12}>
									<div className="mt-6 mt-lg-0">
										<Image
											src={EmployeePicture}
											alt=""
											className="img-fluid w-100 rounded-3"
										/>
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

export default TeamMemberAtGeeks;

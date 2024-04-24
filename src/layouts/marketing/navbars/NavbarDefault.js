// import node module libraries
import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image, Navbar, Nav, Container, Form } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

// import sub layout components
import NavDropdownMain from 'layouts/marketing/navbars/NavDropdownMain';
import QuickMenu from 'layouts/QuickMenu';
import DocumentMenu from 'layouts/marketing/navbars/DocumentMenu';
import DarkLightMode from 'layouts/DarkLightMode';

// import media files
import Logo from 'assets/images/brand/logo/logo.png';

// import data files
import NavbarDefaultRoutes from 'routes/marketing/NavbarDefault';

const NavbarDefault = ({ headerstyle, login, dashboardData }) => {

	const isDesktop = useMediaQuery({
		query: '(min-width: 1224px)'
	});

	const isLaptop = useMediaQuery({
		query: '(min-width: 1024px)'
	});

	const [expandedMenu, setExpandedMenu] = useState(false);

	return (
		<Fragment>
			<Navbar
				onToggle={(collapsed) => setExpandedMenu(collapsed)}
				expanded={expandedMenu}
				expand="lg"
				className="navbar p-2 navbar-default py-2 mt-5"
			>
				<Container fluid className="px-0 ps-2">

					<div className="d-flex align-items-center">
						<div className="me-2 position-relative d-flex justify-content-end align-items-end mt-n5">
							
							<Image
								src={dashboardData.avatar}
								className="avatar-xl rounded-circle border border-4 border-white position-relative"
								alt=""
							/>

							{dashboardData?.verified ? (
								<Link
									to="#"
									className="position-absolute top-0 end-0"
									data-bs-toggle="tooltip"
									data-placement="top"
									title=""
									data-original-title="Verified"
								>
									<Image src={CheckedMark} alt="" height="30" width="30" />
								</Link>
							) : (
								''
							)}

						</div>
						<div className="lh-1">
							<h2 className="mb-0">
								{dashboardData.name}{' '}
							</h2>
							<p className="mb-0 d-block">student</p>
						</div>
						<div className="links2">
								<Link
									to={dashboardData.link}
									style={{ fontSize: '12px', margin: '2px'  }}
								>
									{dashboardData.linkname}

								</Link>
								<Link
									to="/marketing/student/dashboard/"
									style={{ fontSize: '12px', margin: '2px' }}
								>
									Courses

								</Link>
							</div>
					</div>

					<Navbar.Collapse id="basic-navbar-nav">

						<Nav className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">

							<span className={`ms-auto mt-1  ${login ? 'd-none' : ''}`}>
								<Nav.Link
									as={Link}
									to="/marketing/student/dashboard/"
									bsPrefix="btn"
									className="btn btn-white shadow-sm me-2"
								>
									Courses
								</Nav.Link>
								<Nav.Link
									as={Link}
									to="/marketing/student/student-edit-profile/"
									bsPrefix="btn"
									className="btn btn-primary shadow-sm"
								>
									Account Settings
								</Nav.Link>
							</span>

							<span
								className={`${login
										? isDesktop || isLaptop
											? 'd-flex'
											: 'd-none'
										: 'd-none'
									}`}
							>
								<QuickMenu />
							</span>
						</Nav>
						{/* end of right side quick / shortcut menu  */}
					</Navbar.Collapse>

				</Container>
			</Navbar>
		</Fragment>
	);
};

// Specifies the default values for props
NavbarDefault.defaultProps = {
	headerstyle: 'navbar-default',
	login: false
};

// Typechecking With PropTypes
NavbarDefault.propTypes = {
	headerstyle: PropTypes.string,
	login: PropTypes.bool
};

export default NavbarDefault;

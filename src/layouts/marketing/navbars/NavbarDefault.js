// import node module libraries
import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Navbar, Nav, Container, Form, Row, Col } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import QuickMenu from 'layouts/QuickMenu';

const NavbarDefault = ({ headerstyle, login, dashboardData }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isDesktop = useMediaQuery({
		query: '(min-width: 1224px)'
	});

	const isLaptop = useMediaQuery({
		query: '(min-width: 1024px)'
	});

	const [expandedMenu, setExpandedMenu] = useState(false);

	const SignOut = async () => {
		await dispatch(logout());
		navigate('/');
	};

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
						{/* <div className="links2">
							<Link
								to={dashboardData.link}
								style={{ fontSize: '10px', margin: '2px', position: 'relative', marginRight: '10px' }}
							>
								<button style={{ backgroundColor: '#6343D8', color: '#fff', border: '1px #6343D8', borderRadius: '5px' }}>{dashboardData.linkname}</button>



							</Link>
							<Link
								to="/marketing/student/dashboard/"
								style={{ fontSize: '10px', margin: '2px', position: 'relative', marginRight: '10px' }}
							>

								<button style={{ backgroundColor: '#6343D8', color: '#fff', border: '1px #6343D8', borderRadius: '5px' }}>Courses</button>

							</Link>
						</div> */}
					</div>
					<Row className="links2" style={{ width: '100%' }} >
						<Col lg={3} md={4} sm={12}>
							<Navbar
								expand="lg"
								className="navbar navbar-expand-md navbar-light shadow-sm mb-4 mb-lg-0 sidenav"
							>
								<Link
									className="d-xl-none d-lg-none d-md-none text-inherit fw-bold fs-5 float-start py-1"
									to="#"
								>
									Menu
								</Link>
								<Navbar.Toggle
									aria-controls="basic-navbar-nav"
									className="p-0 focus-none border-0"
									label="Responsive Menu"
								>
									<span
										className="navbar-toggler d-md-none icon-shape icon-sm rounded bg-primary p-0 text-white float-end"
										data-bs-toggle="collapse"
										data-bs-target="#sidenav"
										aria-controls="sidenav"
										aria-expanded="false"
										aria-label="Toggle navigation"
									>
										<span className="fe fe-menu"></span>
									</span>
								</Navbar.Toggle>

								<Navbar.Collapse id="basic-navbar-nav">
									<Nav className="me-auto flex-column" as="ul" activeKey="0">
										<Nav.Item
											as="li"
											className={`${dashboardData.link === location.pathname ? 'active' : ''
												}`}
										>
											<Link
												to="/marketing/student/dashboard/"
												className='nav-link'
											>
												<i className={`fe fe-book nav-icon`}></i>
												Dashboard

											</Link>
										</Nav.Item>
										<Nav.Item
											as="li"
											className={`${dashboardData.link === location.pathname ? 'active' : ''
												}`}
										>
											<Link
												to={dashboardData.link}
												className='nav-link'
											>
												<i className={`fe fe-settings nav-icon`}></i>
												Account Settings

											</Link>
										</Nav.Item>
										<Nav.Item
											as="li"
											onClick={SignOut}
										>
											<Link
												to=""
												className='nav-link'
											>
												<i className={`fe fe-power nav-icon`}></i>
												Logout

											</Link>
										</Nav.Item>
									</Nav>

								</Navbar.Collapse>
							</Navbar>
						</Col>

					</Row>
					<Navbar.Collapse id="basic-navbar-nav">

						<Nav className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">

							<span className={`ms-auto mt-1  ${login ? 'd-none' : ''}`}>
								<Nav.Link
									as={Link}
									to="/marketing/student/dashboard/"
									bsPrefix="btn"
									className="btn btn-white shadow-sm me-2  btn-sm "
								>
									Courses
								</Nav.Link>
								<Nav.Link
									as={Link}
									to="/marketing/student/student-edit-profile/"
									bsPrefix="btn"
									className="btn btn-primary  btn-sm  shadow-sm me-2"
								>
									Account Settings
								</Nav.Link>
								<Nav.Item
									as="li"
									onClick={SignOut}
									className="btn btn-primary  btn-sm  shadow-sm"
								>
										<i className={`fe fe-power nav-icon`} style={{ marginRight: '10px' }}></i>
										sign out
								</Nav.Item>
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

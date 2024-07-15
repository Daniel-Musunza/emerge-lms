// import node module libraries
import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import sub components
import NavMegaDropdown from './NavMegaDropdown';
import MegaMenu from './MegaMenu';
import DarkLightMode from 'layouts/DarkLightMode';

// import media files
import Logo from 'assets/images/brand/logo/logo.png';
import Logo2 from 'assets/images/brand/logo/emerge-logo.png';
// import data files


import { logout } from '../../../../components/dashboard/features/auth/authSlice';

const NavbarMegaMenu = () => {
	const [expandedMenu, setExpandedMenu] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let user = localStorage.getItem('user');

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
				className="navbar-default"
			>
				<Container fluid className="px-0 ps-2">
					<div className="d-flex">
						<Navbar.Brand as={Link} to="/" >
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<Image src={Logo2} alt="Logo2" style={{ width: '100px', height: 'auto' }} />
								<Image src={Logo} alt="Logo" style={{ width: '60px', height: '80px', marginLeft: '10px' }} />
							</div>
						</Navbar.Brand>
					</div>
					<Navbar.Toggle aria-controls="basic-navbar-nav">
						<span className="icon-bar top-bar mt-0"></span>
						<span className="icon-bar middle-bar"></span>
						<span className="icon-bar bottom-bar"></span>
					</Navbar.Toggle>
					<Navbar.Collapse id="basic-navbar-nav">
						
						{/* Right side quick / shortcut menu  */}
						<div className="ms-auto mt-3 mt-lg-0">
							<div className="d-flex align-items-center">
								<DarkLightMode />
								{user ? (
									<Button
										as="li"
										onClick={SignOut}
										style={{ cursor: 'pointer' }}
									>
										<div className="nav-link" >
											<i className={`fe fe-power nav-icon`} style={{marginRight: '10px'}}></i>
											Log Out
										</div>
									</Button>
								) : (
									<>
										<Link to="/authentication/sign-in" className="btn btn-outline-dark ms-3">
											Sign in
										</Link>
										<Link to="/authentication/sign-up" className="btn btn-dark ms-1">
											Sign up
										</Link>
									</>
								)}

							</div>
						</div>
						{/* end of right side quick / shortcut menu  */}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</Fragment>
	);
};

// Specifies the default values for props
NavbarMegaMenu.defaultProps = {
	headerstyle: 'navbar-default',
	login: false
};

// Typechecking With PropTypes
NavbarMegaMenu.propTypes = {
	headerstyle: PropTypes.string,
	login: PropTypes.bool
};

export default NavbarMegaMenu;

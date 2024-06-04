// import node module libraries
import { Fragment } from 'react';
import { Menu} from 'react-feather';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Form } from 'react-bootstrap';

// import sub components
import QuickMenu from 'layouts/QuickMenu';

const HeaderDefault = (props) => {
	return (
		<Fragment>
			<Navbar expanded="lg" className="navbar-default">
				<div className="d-flex justify-content-between w-100">
					<div className="d-flex align-items-center">
						<Link
							id="nav-toggle"
							to="#"
							onClick={() => props.data.SidebarToggleMenu(!props.data.showMenu)}
						>
							<Menu size="18px" />
						</Link>
						<div className="ms-lg-3 d-none d-md-none d-lg-block">
							{/* <!-- Form --> */}
							<Form className="d-flex align-items-center">
								<span className="position-absolute ps-3 search-icon">
									<i className="fe fe-search"></i>
								</span>
								<Form.Control type="search" className="form-control ps-6" placeholder="Search Entire Dashboard" />
							</Form>
						</div>
					</div>
					<Nav className="navbar-nav navbar-right-wrap ms-auto d-flex align-items-center nav-top-wrap">
						<QuickMenu />
					</Nav>
				</div>
			</Navbar>
		</Fragment>
	);
};

export default HeaderDefault;

// import node module libraries
import { Link } from 'react-router-dom';
import { Col, Row, Image } from 'react-bootstrap';

// import media files
import Logo from 'assets/images/brand/logo/logo.png';

const NavbarBrandOnly = () => {
	return (
		<Row>
			<Col xl={{ offset: 1, span: 2 }} lg={12} md={12}>
				<div className="mt-4">
					<Link to="/">
						<Image
							src={Logo}
							alt=""
							className="logo-inverse"
							style={{ width: '100px', height: 'auto' }}
						/>
					</Link>
				</div>
			</Col>
		</Row>
	);
};
export default NavbarBrandOnly;

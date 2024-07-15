// import node module libraries
import { Fragment } from 'react';


import CareerAtGeeks from './CareerAtGeeks';
import TeamMemberAtGeeks from './TeamMemberAtGeeks';
import GeeksCulture from './GeeksCulture';
import CTAButton from 'components/marketing/common/call-to-action/CTAButton';
import NavbarMegaMenu from 'layouts/marketing/navbars/mega-menu/NavbarMegaMenu';
import FooterWithLinks from 'layouts/marketing/footers/FooterWithLinks';

const Career = () => {
	const title = 'Join the Daruur team & shape the future of design';
	const description = `You are welcome to join us in our mission to empower and inspire current and future transformers and industry leaders and drive the sustainable development agenda.`;
	const btntext = 'View opportunities';
	const btnlink = '#';

	return (
		<Fragment>
				<NavbarMegaMenu />
			{/* collage gallery */}
			{/* <Collage /> */}

			{/* career at geeks */}
			<CareerAtGeeks />

			{/* team member at geeks */}
			<TeamMemberAtGeeks />

			{/* geeks culture */}
			<GeeksCulture />

			{/* hero call to action */}
			<CTAButton
				title={title}
				description={description}
				btntext={btntext}
				btnlink={btnlink}
			/>
			
			<FooterWithLinks />
		</Fragment>
	);
};

export default Career;

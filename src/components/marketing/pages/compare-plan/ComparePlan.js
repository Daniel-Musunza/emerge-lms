// import node module libraries
import { Fragment } from 'react';

// import sub components
import PricingPlans from './PricingPlans';
import ComparePlansTable from './ComparePlansTable';
import FAQs from './FAQs';
import DeveloperEmergeLMS from './DeveloperEmergeLMSData';

const ComparePlan = () => {
	return (
		<Fragment>
			{/* pricing plans  */}
			<PricingPlans />

			{/* compare plan & additional features */}
			<ComparePlansTable />

			{/* FAQs section */}
			<FAQs />

			{/* developer Daruur */}
			<DeveloperEmergeLMS />
		</Fragment>
	);
};

export default ComparePlan;

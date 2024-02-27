// import node module libraries
import { Fragment } from 'react';
import { Button, Card } from 'react-bootstrap';

const GKStepper3 = (props) => {
	const { currentStep, steps } = props;
	return (
		<Fragment>
			<div id="stepperForm" className="bs-stepper">
				<Card>
					<Card.Header>
						{/* Stepper Button */}
						<div className="bs-stepper-header p-0 bg-transparent" role="tablist">
							{steps.map((step) => {
								return (
									<Fragment key={step.id}>
										<div className={`step ${step.id === currentStep ? 'active' : ''}`}>
											<Button bsPrefix="step-trigger d-block bg-transparent border-0">
												<span className={`bs-stepper-circle p-2 me-2 ${steps.length === step.id ? '' : 'step-line'} `} >
													{step.id}
												</span>
												<span className="bs-stepper-label">{step.title}</span>
											</Button>
										</div>
										{steps.length === step.id ? '' : <div className="bs-stepper-line"></div>}
									</Fragment>
								);
							})}
						</div>
					</Card.Header>
					<Card.Body>
						{/* Stepper content */}
						{steps[currentStep - 1].content}
					</Card.Body>
				</Card>
			</div>
		</Fragment>
	);
};

export default GKStepper3;





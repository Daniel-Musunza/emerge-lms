// import node module libraries
import React, {useContext, Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	Accordion,
	useAccordionButton,
	AccordionContext,
	ListGroup
} from 'react-bootstrap';

import Icon from '@mdi/react';
import { mdiPlay } from '@mdi/js';

import { fetchCourseContents } from '../../../dashboard/features/courseContents/courseContentSlice';

const GKAccordionDefault = ({ accordionItems, itemClass, selectContent}) => {
	const ContextAwareToggle = ({ children, eventKey, callback }) => {
		const { activeEventKey } = useContext(AccordionContext);

		const decoratedOnClick = useAccordionButton(
			eventKey,
			() => callback && callback(eventKey)
		);

		const isCurrentEventKey = activeEventKey === eventKey;

		return (
			<Fragment>
				<Link
					to="#"
					onClick={decoratedOnClick}
					aria-expanded={isCurrentEventKey}
					className="d-flex align-items-center text-inherit text-decoration-none h4 mb-0"
					data-bs-toggle="collapse"
					aria-controls="courseTwo"
				>
					<div className="me-auto">{children.title}</div>
					<span className="chevron-arrow ms-4">
						<i className="fe fe-chevron-down fs-4"></i>
					</span>
				</Link>
			</Fragment>
		);
	};

	const dispatch = useDispatch();

	const { courseContents } = useSelector(
		(state) => state.courseContents
	);
	const [selectedItemId, setSelectedItemId] = useState(null);
	
	const handleModuleSelect = async(id, e) => {
		e.preventDefault();
		
		await dispatch(fetchCourseContents(id)); // Use `id` instead of `selectedItemId`
		setSelectedItemId(id); 
	};
	

	
	
	

	return (
		<Fragment >
			<Accordion >
				<ListGroup as="ul" variant="flush">
					{accordionItems?.data?.sections
						.map((item, index) => (

							<ListGroup.Item
								key={item.id}
								as="li"
								className={`${itemClass ? itemClass : ''}`}
								onClick={(e) => handleModuleSelect(item.id, e)}
								
							>
								<ContextAwareToggle >
									{item}
								</ContextAwareToggle>

							{selectedItemId === item.id &&(
									<Accordion className="test">
										<ListGroup className="py-4" as="ul">
											{courseContents
												.map((subitem, subindex) => (
													<ListGroup.Item
														key={subindex}
														as="li"
														disabled={subitem.locked}
														className="px-0 py-1 border-0"	
														style={{cursor: 'pointer'}}
													>
														<div
															className={`d-flex justify-content-between align-items-center text-inherit text-decoration-none`}
															onClick={(e) => selectContent(subitem, e)}
														>
															<div className="text-truncate ">
																<span className="icon-shape bg-light icon-sm rounded-circle me-2">
																	{subitem.locked ? (
																		<i className="fe fe-lock fs-4"></i>
																	) : (
																		<Icon path={mdiPlay} size={0.8} />
																	)}{' '}
																</span>
																<span className="fs-5">{subitem.title}</span>
															</div>
															<div className="text-truncate">
																<span>{subitem.description}</span>
															</div>
														</div>
													</ListGroup.Item>
												))}
										</ListGroup>
									</Accordion>
							)
							}
							</ListGroup.Item>


						))}

				</ListGroup>
			</Accordion>
		</Fragment>
	);
};

export default GKAccordionDefault;

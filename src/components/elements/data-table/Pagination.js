// import node module libraries
import { Row, Col, Button, ListGroup, Form } from 'react-bootstrap';

const Pagination = ({
	rowsPerPage,
	rowCount,
	onChangePage,
	onChangeRowsPerPage, // available but not used here
	currentPage
}) => {
	const rangeStart = currentPage === 1 ? 1 : ((currentPage - 1) * rowsPerPage) + 1;
	const rangeEnd = Math.min((currentPage) * rowsPerPage, rowCount);

	function toPages(pages) {
		const results = [];
		for (let i = 1; i <= pages; i++) {
			results.push(i);
		}
		return results;
	}
	function getNumberOfPages(rowCount, rowsPerPage) {
		return Math.ceil(rowCount / rowsPerPage);
	}

	const handleBackButtonClick = () => {
		onChangePage(currentPage - 1);
	};

	const handleNextButtonClick = () => {
		onChangePage(currentPage + 1);
	};

	const handlePageNumber = (e) => {
		onChangePage(Number(e.target.value));
	};

	const pages = getNumberOfPages(rowCount, rowsPerPage);
	const pageItems = toPages(pages);
	const nextDisabled = currentPage === pageItems.length;
	const previosDisabled = currentPage === 1;


	const RecordsPerPageDropDown = ({ paginationRowsPerPageOptions, onChangeRowsPerPage, rowsPerPage }) => {
		return (
			<div className='d-flex flex-row align-content-center'>
				<span className='me-2 mt-2'>Show{' '}</span>
				<Form.Select
					value={rowsPerPage}
					className='w-50'
					onChange={e => onChangeRowsPerPage(Number(e.target.value))}>
					{paginationRowsPerPageOptions.map((option, index) => (
						<option key={index} value={option}>
							{option}
						</option>
					))}
				</Form.Select>
				<span className='ms-2 mt-2'>entries.</span>
			</div>
		);
	};

	return (
		<Row className='mt-4'>
			<Col sm={12} md={5}>
				<div className='p-3 d-flex flex-row align-content-center' >
					<span className='me-3 mt-2'>
						Showing {rangeStart} to {rangeEnd} of {rowCount} entries
					</span>

					<span>
						<RecordsPerPageDropDown
							paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
							onChangeRowsPerPage={onChangeRowsPerPage}
							rowsPerPage={rowsPerPage}
						/>
					</span>
				</div>
			</Col>
			<Col sm={12} md={7} className='pe-5' >
				<div className='d-flex align-items-end flex-column'>
					<nav >
						<ListGroup
							as="ul"
							bsPrefix="pagination"
							className="d-flex flex-row mb-0"
						>
							<ListGroup.Item as="li" bsPrefix="page-item" className={previosDisabled ? 'disabled' : ''}>
								<Button
									onClick={handleBackButtonClick}
									disabled={previosDisabled}
									aria-disabled={previosDisabled}
									className="page-link mx-1 rounded"
								>
									<i className="fe fe-chevron-left"></i>
								</Button>
							</ListGroup.Item>
							{pageItems.map((page) => {
								const className =
									page === currentPage ? "page-item active" : "page-item";

								return (
									<ListGroup.Item as="li" bsPrefix="page-item" key={page} className={className}>
										<Button
											onClick={handlePageNumber}
											value={page}
											className="page-link mx-1 rounded"
										>
											{page}
										</Button>
									</ListGroup.Item >
								);
							})}
							<ListGroup.Item as="li" bsPrefix="page-item" className={nextDisabled ? 'disabled' : ''}>
								<Button
									onClick={handleNextButtonClick}
									disabled={nextDisabled}
									aria-disabled={nextDisabled}
									className="page-link mx-1 rounded"
								>
									<i className="fe fe-chevron-right"></i>
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</nav>
				</div>
			</Col>
		</Row>

	);
};

export default Pagination;
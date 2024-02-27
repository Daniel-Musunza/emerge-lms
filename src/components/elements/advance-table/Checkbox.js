// import node module libraries
import { useRef, useEffect } from 'react';
import { Form } from 'react-bootstrap';

const IndeterminateCheckbox = ({
	indeterminate,
	className = '',
	...rest
}) => {
	const ref = useRef(null)
	useEffect(() => {
		if (typeof indeterminate === 'boolean') {
			ref.current.indeterminate = !rest.checked && indeterminate
		}
	}, [ref, indeterminate])
	return (
		<Form.Check type="checkbox" ref={ref} {...rest} />
	)
}
export default IndeterminateCheckbox
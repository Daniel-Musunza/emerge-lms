// import node module libraries
import { useContext, useEffect } from 'react';

// import context file
import { CartContext } from 'context/Context';

// import required helper file
import { convertToCurrency } from 'helper/utils';

const useCartOperations = () => {
	const {
		CartState: { cartItems, cartSummary }
	} = useContext(CartContext);

	useEffect(() => {
		cartSummary.subTotal = getCartSubtotal(cartItems);
		getGrandTotal(cartItems);
	});

	// function to get cart subtotal
	const getCartSubtotal = (items) => {
		let subTotal = items.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
		cartSummary.subTotal = subTotal;
		return subTotal;
	};

	// function to get discount amount
	const getDiscountAmount = (items) => {
		return convertToCurrency(
			getCartSubtotal(items) * (cartSummary.discount / 100)
		);
	};

	// function to get grand total of cart
	const getGrandTotal = () => {
		let grandTotal = cartSummary.subTotal - cartSummary.discount;
		cartSummary.taxAmount = grandTotal * (cartSummary.tax / 100);
		grandTotal = grandTotal + cartSummary.taxAmount + cartSummary.shipping;
		return convertToCurrency(grandTotal);
	};

	return {
		getCartSubtotal,
		getDiscountAmount,
		getGrandTotal
	};
};

export default useCartOperations;

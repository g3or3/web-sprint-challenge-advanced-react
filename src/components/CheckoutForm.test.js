import React from "react";
import { render, screen } from "@testing-library/react";
import {
	checkIfInDocument,
	checkIfNotInDocument,
	typeInput,
	clickOnElem,
} from "../utils/testingUtils";
import CheckoutForm from "./CheckoutForm";
import App from "../App";

const testUser = {
	fName: "George",
	lName: "Vinueza",
	address: "123 Street",
	city: "Any City",
	state: "AA",
	zip: "12345",
};

const {
	getByText,
	getByLabelText,
	getByRole,
	getByTestId,
	queryByTestId,
} = screen;

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
	render(<CheckoutForm />);
	checkIfInDocument(getByText, /checkout form/i);
});

// had to render both app and checkoutform in order to ensure
// props were passed to checkout form successfully (cart and removeFromCart)
test("form shows success message on submit with form details", () => {
	const { fName, lName, address, city, state, zip } = testUser;

	render(
		<App>
			<CheckoutForm />
		</App>
	);

	// look up method followed by elems to click on
	clickOnElem(getByText, /cart/i, /checkout/i);

	// look up method followed by elems we're asserting are in the doc
	checkIfInDocument(
		getByLabelText,
		/first name:/i,
		/last name:/i,
		/address:/i,
		/city:/i,
		/state:/i,
		/zip:/i
	);

	// look up method followed by field, value
	typeInput(
		getByLabelText,
		/first name:/i,
		fName,
		/last name:/i,
		lName,
		/address:/i,
		address,
		/city:/i,
		city,
		/state:/i,
		state,
		/zip:/i,
		zip
	);

	// look up method followed by elems asserting are NOT in doc
	checkIfNotInDocument(queryByTestId, "successMessage");

	clickOnElem(getByRole, "button");

	checkIfInDocument(getByTestId, "successMessage");

	checkIfInDocument(
		getByText,
		`${fName} ${lName}`,
		`${address}`,
		`${city}, ${state} ${zip}`
	);
});

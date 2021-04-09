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

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
	render(<CheckoutForm />);
	checkIfInDocument(screen.getByText, /checkout form/i);
});

// had to render both app and checkout form in order to ensure props were passed to
// checkout form successfully
test("form shows success message on submit with form details", () => {
	const { fName, lName, address, city, state, zip } = testUser;

	render(
		<App>
			<CheckoutForm />
		</App>
	);

	clickOnElem(screen.getByText, /cart/i, /checkout/i); // look up method followed by elems to click on

	checkIfInDocument(
		screen.getByLabelText, // look up method followed by elems we're asserting are in the doc
		/first name:/i,
		/last name:/i,
		/address:/i,
		/city:/i,
		/state:/i,
		/zip:/i
	);

	typeInput(
		screen.getByLabelText, // look up method followed by field, value
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

	checkIfNotInDocument(screen.queryByTestId, "successMessage");

	clickOnElem(screen.getByRole, "button");

	checkIfInDocument(screen.getByTestId, "successMessage");

	checkIfInDocument(
		screen.getByText,
		`${fName} ${lName}`,
		`${address}`,
		`${city}, ${state} ${zip}`
	);
});

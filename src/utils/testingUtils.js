import userEvent from "@testing-library/user-event";

export const checkIfInDocument = (lookUpBy, ...rest) => {
	for (const idx in rest) {
		expect(lookUpBy(rest[idx])).toBeInTheDocument();
	}
};

export const checkIfNotInDocument = (lookUpBy, ...rest) => {
	for (const idx in rest) {
		expect(lookUpBy(rest[idx])).not.toBeInTheDocument();
	}
};

export const typeInput = (lookUpBy, ...rest) => {
	rest.forEach((elem, idx) => {
		if (idx % 2 === 0) userEvent.type(lookUpBy(elem), rest[idx + 1]);
	});
};

export const clickOnElem = (lookUpBy, ...rest) => {
	rest.forEach((elem) => {
		lookUpBy(elem).click();
	});
};

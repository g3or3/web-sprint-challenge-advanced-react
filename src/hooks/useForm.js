import { useState } from "react";

export const useForm = (initVal) => {
	const [values, setValues] = useState(initVal);
	const [showSuccessMessage, setShowSuccessMessage] = useState();
	const [confirmation, setConfirmation] = useState(initVal);

	const handleChanges = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setShowSuccessMessage(!showSuccessMessage);
		setConfirmation(values);
		setValues(initVal);
	};

	return [
		values,
		handleChanges,
		handleSubmit,
		showSuccessMessage,
		confirmation,
	];
};

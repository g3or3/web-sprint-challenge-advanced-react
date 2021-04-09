import { useState } from "react";

export const useCart = (initVal) => {
	const [cart, setCart] = useState(initVal);

	const addToCart = (plant) => {
		setCart([...cart, plant]);
	};

	const removeFromCart = (plant) => {
		plant === "all"
			? setCart([])
			: setCart(cart.filter((p) => p.id !== plant.id));
	};

	return [cart, addToCart, removeFromCart];
};

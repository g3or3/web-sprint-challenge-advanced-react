import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { useCart } from "./hooks/useCart";

import PlantList from "./components/PlantList";
import ShoppingCart from "./components/ShoppingCart";
import CheckoutForm from "./components/CheckoutForm";

import "./App.css";

function App() {
	const [cart, addToCart, removeFromCart] = useCart([]);

	return (
		<div>
			<Router>
				<nav className="container">
					<h1>
						React Plants{" "}
						<span role="img" aria-label="plant">
							🌿
						</span>
					</h1>
					<ul className="steps">
						<li>
							<NavLink exact to="/">
								Plants
							</NavLink>
						</li>
						<li>
							<NavLink to="/cart">
								Cart
								<span className="cart-badge">
									{cart.length > 0 && cart.length}
								</span>
							</NavLink>
						</li>
					</ul>
				</nav>
				<Route
					exact
					path="/"
					render={() => <PlantList addToCart={addToCart} />}
				/>
				<Route
					path="/cart"
					render={(props) => (
						<ShoppingCart
							{...props}
							cart={cart}
							removeFromCart={removeFromCart}
						/>
					)}
				/>
				<Route path="/checkout">
					<CheckoutForm cart={cart} removeFromCart={removeFromCart} />
				</Route>
			</Router>
		</div>
	);
}

export default App;

import React, { Component } from "react";
import axios from "axios";

export default class PlantList extends Component {
	_isMounted = false;
	// add state with a property called "plants" - initialize as an empty array
	state = {
		plants: [],
	};
	// when the component mounts:
	//   - fetch data from the server endpoint - http://localhost:3333/plants
	//   - set the returned plants array to this.state.plants

	/*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
	componentDidMount() {
		this._isMounted = true;

		axios.get("http://localhost:3333/plants").then((res) => {
			// prevent state updates when component unmounts
			if (this._isMounted)
				this.setState({
					plants: res.data,
				});
		});
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		return (
			<main className="plant-list">
				{this.state?.plants?.map((plant) => (
					<div
						className="plant-card"
						key={plant.id}
						data-testid="plant-card"
					>
						<img
							className="plant-image"
							src={plant.img}
							alt={plant.name}
						/>
						<div className="plant-details">
							<h2 className="plant-name">{plant.name}</h2>
							<p className="plant-scientific-name">
								{plant.scientificName}
							</p>
							<p>{plant.description}</p>
							<div className="plant-bottom-row">
								<p>${plant.price}</p>
								<p>
									<span role="img" aria-label="sunlight">
										☀️{" "}
									</span>
									{plant.light}
								</p>
								<p>
									<span role="img" aria-label="water">
										💦{" "}
									</span>
									{plant.watering}x/month
								</p>
							</div>
							<button
								className="plant-button"
								onClick={() => this.props.addToCart(plant)}
							>
								Add to cart
							</button>
						</div>
					</div>
				))}
			</main>
		);
	}
}

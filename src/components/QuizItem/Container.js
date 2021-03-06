import React from 'react';
import PropTypes from 'prop-types';


const Container = (Component) => (
	class extends React.Component {
		static propTypes = {
			birth_year: PropTypes.string,
			eye_color: PropTypes.string,
			closeHintModal: PropTypes.func, // Function that treats when a modal is closed.
			films: PropTypes.oneOfType([
				PropTypes.arrayOf(PropTypes.shape({
					title: PropTypes.string
				})),
				PropTypes.arrayOf(PropTypes.string),
			]),
			gender: PropTypes.string,
			hair_color: PropTypes.string,
			handleInputChange: PropTypes.func, // Function that sets the user answer for this answer.
			height: PropTypes.string,
			homeworld: PropTypes.oneOfType([
				PropTypes.shape({
					name: PropTypes.string
				}),
				PropTypes.string
			]),
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Necessary to verify the answers.
			imageUrl: PropTypes.string,
			isPlaceholder: PropTypes.bool,
			mass: PropTypes.string,
			openedModal: PropTypes.bool, // Open modal with hints.
			openHintModal: PropTypes.func, // Function that treats when a modal is opened.
			play: PropTypes.bool, // Is game playing
			playerGuess: PropTypes.string, // Player answer for that item.
			skin_color: PropTypes.string,
			species: PropTypes.oneOfType([
				PropTypes.arrayOf(PropTypes.shape({
					name: PropTypes.string
				})),
				PropTypes.arrayOf(PropTypes.string),
			]),
			starships: PropTypes.oneOfType([
				PropTypes.arrayOf(PropTypes.shape({
					name: PropTypes.string
				})),
				PropTypes.arrayOf(PropTypes.string),
			]),
			vehicles: PropTypes.oneOfType([
				PropTypes.arrayOf(PropTypes.shape({
					name: PropTypes.string
				})),
				PropTypes.arrayOf(PropTypes.string),
			])
		};

		static defaultProps = {
			openedModal: false,
		};

		constructor(props) {
			super(props);

			this.state = {};
		}

		render() {
			return (
				<Component
					{...this.props}
					{...this.state}
				/>
			)
		}
	}
)

export default Container;
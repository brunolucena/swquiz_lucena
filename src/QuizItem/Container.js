import React from 'react';
import PropTypes from 'prop-types';


const Container = (Component) => (
	class extends React.Component {
		static propTypes = {
			birthYear: PropTypes.string,
			closeHintModal: PropTypes.func.isRequired, // Function that treats when a modal is closed.
			eyeColor: PropTypes.string,
			films: PropTypes.arrayOf(PropTypes.string),
			gender: PropTypes.string,
			hairColor: PropTypes.string,
			height: PropTypes.string,
			homeworld: PropTypes.string,
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Necessary to verify the answers.
			imageUrl: PropTypes.string.isRequired,
			isPlaceholder: PropTypes.bool.isRequired,
			mass: PropTypes.string,
			openedModal: PropTypes.bool, // Open modal with hints.
			openHintModal: PropTypes.func.isRequired, // Function that treats when a modal is opened.
			skinColor: PropTypes.string,
			species: PropTypes.arrayOf(PropTypes.string),
			starships: PropTypes.arrayOf(PropTypes.string),
			vehicles: PropTypes.arrayOf(PropTypes.string)
		};

		static defaultProps = {
			openedModal: false,
		};

		constructor(props) {
			super(props);

			this.state = {
				playerNameGuess: ''
			};

			this.handleInputChange = this.handleInputChange.bind(this);
		}

		handleInputChange(e) {
			this.setState({
				[e.target.name]: e.target.value
			});
		}

		render() {
			return (
				<Component
					{...this.props}
					{...this.state}
					handleInputChange={this.handleInputChange}
				/>
			)
		}
	}
)

export default Container;
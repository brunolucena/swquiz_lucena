import React from 'react';
import PropTypes from 'prop-types';


const Container = (Component) => (
	class extends React.Component {
		static propTypes = {
			email: PropTypes.string, // Email of player if game already has been saved
			loading: PropTypes.bool, // Is result beeing
			name: PropTypes.string, // Name of player if game already has been saved
			saveGameData: PropTypes.func.isRequired, // Function to save game data
			score: PropTypes.number // Game score
		};

		constructor(props) {
			super(props);

			this.state = {
				emailInput: props.email,
				nameInput: props.name
			};

			this.handleInputChange = this.handleInputChange.bind(this);
		}

		handleInputChange(event) {
			event.preventDefault();

			this.setState({
				[event.target.name]: event.target.value
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
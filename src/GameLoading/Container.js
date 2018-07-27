import React from 'react';
import PropTypes from 'prop-types';


const Container = (Component) => (
	class extends React.Component {
		static propTypes = {
			isReadyToStart: PropTypes.bool.isRequired, // Game is ready to start
			startGame: PropTypes.func.isRequired // Function to start a game
		};

		constructor(props) {
			super(props);

			this.state = {
				timeLeft: 3
			};

			this.countdown = this.countdown.bind(this);
		}

		componentDidUpdate() {
			const { isReadyToStart } = this.props;

			if (isReadyToStart) {
				setTimeout(this.countdown, 1000);
			}
		}

		countdown() {
			const { timeLeft } = this.state;
			const { startGame } = this.props;

			if (timeLeft > 1) {
				this.setState({
					timeLeft: this.state.timeLeft - 1
				});
			} else {
				startGame();
			}
		}

		render() {
			return <Component {...this.props} {...this.state} />
		}
	}
)

export default Container;
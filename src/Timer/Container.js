import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


const Container = (Component) => (
	class extends React.Component {
		static propTypes = {
			dateTimeLimit: PropTypes.instanceOf(Date).isRequired, // DateTime limit to finish game
			isStarted: PropTypes.bool.isRequired, // Timer is started
			isVisible: PropTypes.bool, // Timer is visible
			timePlaceholder: PropTypes.number.isRequired // Display placeholder of how many time the player will have. In seconds
		};

		static defaultProps = {
			isVisible: true
		};

		constructor(props) {
			super(props);

			this.state = {
				timeWarning: false // Time warning
			};

			this.checkTimer = this.checkTimer.bind(this);
			this.interval = setInterval(this.checkTimer, 1000);
		}

		componentWillUnmount() {
			clearInterval(this.interval);
		}

		/**
		 * @description Check if timer is close to expire to alert player
		 */
		checkTimer() {
			const { dateTimeLimit } = this.props;

			const secondsRemaining = moment().diff(dateTimeLimit, 'seconds') * -1;
			const timeWarning = secondsRemaining < 30;

			this.setState({
				timeWarning
			})
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
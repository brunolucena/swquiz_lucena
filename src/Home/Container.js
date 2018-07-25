import React from 'react';
import { withRouter } from 'react-router-dom';

const Container = (Component) => (
	class extends React.Component {
		constructor(props) {
			super(props);

			this.state = {
				openedModalRanking: props.match.path == '/ranking'
			};

			this.pendingGameHash = this.getPendingGameHash();
		}

		getPendingGameHash() {
			let games = [];

			return games && games.length ? games.filter(g => !g.isFinished)[0].hash : ''
		}

		render() {
			return (
				<Component
					{...this.props}
					{...this.state}
					pendingGameHash={this.pendingGameHash}
				/>
			)
		}
	}
)

export default Container;
import React from 'react';

const Container = (Component) => (
	class extends React.Component {
		constructor(props) {
			super(props);

			this.state = {};

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
import React from 'react';

const Container = (Component) => (
	class extends React.Component {
		constructor(props) {
			super(props);

			this.state = {
				openedModalRanking: false
			};

			this.closeModalRanking = this.closeModalRanking.bind(this);
			this.openModalRanking = this.openModalRanking.bind(this);
			this.pendingGameHash = this.getPendingGameHash();
		}

		closeModalRanking() {
			this.setState({
				openedModalRanking: false
			});
		}

		getPendingGameHash() {
			let games = [];

			return games && games.length ? games.filter(g => !g.isFinished)[0].hash : ''
		}

		openModalRanking() {
			console.log('openModalRanking')
			this.setState({
				openedModalRanking: true
			});
		}

		render() {
			return (
				<Component
					{...this.props}
					{...this.state}
					closeModalRanking={this.closeModalRanking}
					openModalRanking={this.openModalRanking}
					pendingGameHash={this.pendingGameHash}
				/>
			)
		}
	}
)

export default Container;
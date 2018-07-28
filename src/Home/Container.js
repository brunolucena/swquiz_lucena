import React from 'react';

import { LocalStorageHelpers } from '../SWQuiz/Helpers';


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
			this.rankingData = LocalStorageHelpers.getFinishedGames();
		}

		closeModalRanking() {
			this.setState({
				openedModalRanking: false
			});
		}

		getPendingGameHash() {
			const { getLastPendingGame } = LocalStorageHelpers;

			let lastPendingGame = getLastPendingGame();

			return lastPendingGame ? lastPendingGame.hash : ''
		}

		openModalRanking() {
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
					rankingData={this.rankingData}
				/>
			)
		}
	}
)

export default Container;
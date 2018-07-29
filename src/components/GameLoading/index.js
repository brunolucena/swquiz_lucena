import React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';

import Container from './Container'
import styles from './styles.scss';


const GameLoading = (props) => {
	const { isReadyToStart, loadingMessage, timeLeft } = props;

	return (
		<div className={styles.gameLoadingWrapper}>
			{
				isReadyToStart ?
					<div className={styles.contador}>
						{timeLeft}
					</div>
				:
					[
						<CircularProgress key="circular-progress" style={{color: "#b9ab25"}}/>,
						<div key="info" className={styles.info}>
							{loadingMessage}
						</div>
					]
			}
		</div>
	);
}

GameLoading.propTypes = {
	isReadyToStart: PropTypes.bool.isRequired, // Game is ready to start
	startGame: PropTypes.func.isRequired // Function to start a game
};

export default Container(GameLoading);

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

import Container from './Container'
import styles from './styles.scss';


const GameResult = (props) => {
	const { email, handleInputChange, hasResult, formErrors, loading, loadingMessage,
			name, playerEmail, playerName, saveGameData, score } = props;

	return (
		<div className={styles.gameResultWrapper}>
			<div className={styles.top}>
				Quiz ended!
			</div>

			<div className={styles.gameData}>
				{
					loading ?
						<div className={styles.loading}>
							<CircularProgress key="circular-progress" style={{color: "#b9ab25"}}/>
							<div key="info" className={styles.info}>
								{loadingMessage}
							</div>
						</div>
					:
						<div>
							<div className={styles.score}>
								<span>{score}</span> points
							</div>

							{
								!hasResult ?
									<div>
										<div className={styles.text}>
											Fill the form below to save your score:
										</div>

										<div className={styles.inputsContainer}>
											<TextField
												{...(formErrors.name && {error: !!formErrors.name})}
												className={styles.textField}
												helperText={formErrors.name}
												label="Name"
												name="name"
												onChange={handleInputChange}
												value={name}
											/>
											<TextField
												{...(formErrors.email && {error: !!formErrors.email})}
												className={styles.textField}
												helperText={formErrors.email}
												label="Email"
												name="email"
												onChange={handleInputChange}
												value={email}
											/>
										</div>

										<button className={styles.button} onClick={saveGameData}>Save</button>
									</div>
								:
									<div className={styles.resultData}>
										<div>Name: {playerName}</div>
										<div>Email: {playerEmail}</div>
										<Link to="/ranking" className={styles.button}>Back</Link>
									</div>
							}

						</div>
				}
			</div>
		</div>
	);
}

GameResult.propTypes = {
	email: PropTypes.string, // Email input if data has not been saved yet
	handleInputChange: PropTypes.func.isRequired, // Function to change input text
	hasResult: PropTypes.bool.isRequired, // Game has a result
	loading: PropTypes.bool.isRequired, // Is result being loaded
	loadingMessage: PropTypes.string.isRequired, // Message to display while loading
	name: PropTypes.string, // Name input if data has not been saved yet
	playerEmail: PropTypes.string, // Player email if game has already been saved
	playerName: PropTypes.string, // Player name if game has already been saved
	saveGameData: PropTypes.func.isRequired, // Function to save game data
	score: PropTypes.number // Game score
}

export default withRouter(Container(GameResult));

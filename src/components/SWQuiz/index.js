import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';

import GameLoading from '../GameLoading';
import GameResult from '../GameResult';
import Logo from '../Logo';
import Pagination from '../Pagination';
import QuizItem from '../QuizItem';
import Timer from '../Timer';

import Container from './Container'
import styles from './styles.scss';


const SWQuiz = (props) => {
	const { answers, closeHintModal, dateTimeEnded, dateTimeLimit, dateTimeStart, email,
			goToNextPage, goToPreviousPage, handleItemGuessInputChange, hasNext, hasPrevious,
			isExpired, isGameFinished, isGameReady, itens, itensPerPage, loadCharacterInfo, name,
			openHintModal, play, saveGameData, score, startGame } = props;

	const array = Array(itensPerPage).fill(0);

	return (
		<div className={styles.swquizWrapper}>
			<div className={styles.top}>
				<Logo type='horizontal' size={100} />
				<Timer
					dateTimeLimit={dateTimeLimit}
					isStarted={!!dateTimeStart}
					isVisible={!isGameFinished}
					timePlaceholder={props.timeLimit}
				/>
			</div>

			<div className={styles.items}>
				{
					itens ?
						itens.map(item => {
							const answer = answers.find(a => a.url == item.url);

							const playerGuess = answer ? answer.text : '';
							const openedModal = answer ? answer.openedModal : false;

							return (
								<QuizItem
									{...item}
									closeHintModal={closeHintModal}
									handleInputChange={handleItemGuessInputChange}
									id={item.url}
									imageUrl={item.imageUrl}
									isPlaceholder={isGameFinished || !dateTimeStart}
									key={item.url}
									loadCharacterInfo={loadCharacterInfo}
									openedModal={openedModal}
									openHintModal={openHintModal}
									play={play}
									playerGuess={playerGuess}
								/>
							)
						})
					:
						array.map((number, i) => (
							<QuizItem
								key={i}
								isPlaceholder={true}
							/>
						))
				}
			</div>

			{
				!isGameFinished &&
					<Pagination
						goToNextPage={goToNextPage}
						goToPreviousPage={goToPreviousPage}
						hasNext={hasNext}
						hasPrevious={hasPrevious}
					/>
			}

			<Dialog open={!play} aria-labelledby="simple-dialog-title">
				<GameLoading isReadyToStart={isGameReady} startGame={startGame}/>
			</Dialog>

			<Dialog open={isExpired} aria-labelledby="simple-dialog-title">
				<GameResult
					hasResult={isGameFinished && score != null}
					loading={score == null}
					playerEmail={email}
					playerName={name}
					saveGameData={saveGameData}
					score={score}
				/>
			</Dialog>
		</div>
	);
}

SWQuiz.propTypes = {
	answers: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string, // Player answer
		url: PropTypes.string // Url of the actual char
	})), //
	closeHintModal: PropTypes.func, // Function to close hint modal
	dateTimeEnded: PropTypes.oneOfType([ // DateTime that the game was ended
		PropTypes.string,
		PropTypes.instanceOf(Date)
	]),
	dateTimeLimit: PropTypes.oneOfType([ // DateTime limit to finish the game
		PropTypes.string,
		PropTypes.instanceOf(Date)
	]),
	dateTimeStart: PropTypes.oneOfType([ // DateTime that the game was started
		PropTypes.string,
		PropTypes.instanceOf(Date)
	]),
	email: PropTypes.string, // Email of the player
	goToNextPage: PropTypes.func, // Function to go to next page
	goToPreviousPage: PropTypes.func, // Function to go to previous page
	handleItemGuessInputChange: PropTypes.func, // Function to change input text of player guess
	hasNext: PropTypes.bool, // Has next page
	hasPrevious: PropTypes.bool, // Has previous page
	isExpired: PropTypes.bool, // Is game expired
	isGameFinished: PropTypes.bool, // Is game finished
	isGameReady: PropTypes.bool, // Is game ready to start
	itens: PropTypes.arrayOf(PropTypes.object), // Char itens to display
	itensPerPage: PropTypes.number, // Maximum itens on each page. Used to display placeholders.
	loadCharacterInfo: PropTypes.func, // Function to load character info
	name: PropTypes.string, // Player name
	openHintModal: PropTypes.func, // Function to open modal
	play: PropTypes.bool, // Is game playing
	saveGameData: PropTypes.func, // Function to save game data
	score: PropTypes.number, // Player score
	startGame: PropTypes.func, // Function to start a game
}

export default withRouter(Container(SWQuiz));

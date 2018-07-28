import React from 'react';

import Dialog from '@material-ui/core/Dialog';

import GameLoading from '../GameLoading';
import Logo from '../Logo';
import Pagination from '../Pagination';
import QuizItem from '../QuizItem';
import Timer from '../Timer';

import Container from './Container'
import styles from './styles.scss';


const SWQuiz = (props) => {
	const { answers, closeHintModal, dateTimeEnded, dateTimeLimit, dateTimeStart,
			goToNextPage, goToPreviousPage, handleItemGuessInputChange, hasNext, hasPrevious,
			isGameFinished, isGameReady, itens, itensPerPage, openHintModal, startGame
	} = props;

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
									isPlaceholder={isGameFinished || !dateTimeStart}
									key={item.url}
									openedModal={openedModal}
									openHintModal={openHintModal}
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

			<Dialog open={!dateTimeStart} aria-labelledby="simple-dialog-title">
				<GameLoading isReadyToStart={isGameReady} startGame={startGame}/>
			</Dialog>
		</div>
	);
}

export default Container(SWQuiz);

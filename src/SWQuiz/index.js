import React from 'react';

import Logo from '../Logo';
import Pagination from '../Pagination';
import QuizItem from '../QuizItem';
import Timer from '../Timer';

import Container from './Container'
import styles from './styles.scss';


const SWQuiz = (props) => {
	const { closeHintModal, dateTimeEnded, dateTimeLimit, dateTimeStart, isGameFinished, itens, itensPerPage, openHintModal } = props;

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
						itens.map(item => (
							<QuizItem
								{...item}
								closeHintModal={closeHintModal}
								id={item.url}
								isPlaceholder={isGameFinished || !dateTimeStart}
								key={item.url}
								openHintModal={openHintModal}
							/>
						))
					:
						array.map((number, i) => (
							<QuizItem
								key={i}
								isPlaceholder={true}
							/>
						))
				}
			</div>

			<div className={styles.pagination}>
				<Pagination />
			</div>
		</div>
	);
}

export default Container(SWQuiz);

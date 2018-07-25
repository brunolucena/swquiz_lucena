import React from 'react';

import Logo from '../Logo';
import Pagination from '../Pagination';
import QuizItem from '../QuizItem';
import Timer from '../Timer';

import Container from './Container'
import styles from './styles.scss';


const SWQuiz = (props) => {
	const { closeHintModal, dateTimeStart, isGameFinished, itens, openHintModal } = props;
	return (
		<div className={styles.swquizWrapper}>
			<div className={styles.top}>
				<Logo type='horizontal' size={100} />
				<Timer
					dateTimeLimit={new Date(2018, 6, 25, 19, 30)}
					isStarted={true}
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
								imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/2000px-Star_Wars_Logo.svg.png"
								isPlaceholder={isGameFinished || !dateTimeStart}
								key={item.url}
								openHintModal={openHintModal}
							/>
						))
					:
						<div className={styles.emptyItens}>
							Empty itens
						</div>
				}
			</div>

			<div className={styles.pagination}>
				<Pagination />
			</div>
		</div>
	);
}

export default Container(SWQuiz);

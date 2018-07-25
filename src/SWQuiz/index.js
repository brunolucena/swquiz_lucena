import React from 'react';

import Logo from '../Logo';
import Pagination from '../Pagination';
import QuizItem from '../QuizItem';
import Timer from '../Timer';

import Container from './Container'
import styles from './styles.scss';


const SWQuiz = (props) => {
	const { itens } = props;

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
							<QuizItem />
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

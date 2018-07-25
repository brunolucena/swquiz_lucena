import React from 'react';

import Logo from '../Logo';
import Timer from '../Timer';

import Container from './Container'
import styles from './styles.scss';


const SWQuiz = (props) => {
	return (
		<div className={styles.swquizWrapper}>
			<div className={styles.top}>
				<Logo type='horizontal' size={100} />
				<Timer
					dateTimeLimit={new Date(2018, 7, 25, 2)}
					isStarted={props.dateTimeStart ? props.dateTimeStart : false}
					timePlaceholder={props.timeLimit}
				/>
			</div>

			<div className={styles.items}>

			</div>

			<div className={styles.pagination}>

			</div>
		</div>
	);
}

export default Container(SWQuiz);

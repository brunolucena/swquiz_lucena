import React from 'react';

import Container from './Container'
import styles from './styles.scss';


const QuizItem = (props) => {
	const { id } = props;

	return (
		<div className={styles.item}>
			QuizItem
		</div>
	);
}

export default Container(QuizItem);

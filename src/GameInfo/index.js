import React from 'react';

import Container from './Container'
import styles from './styles.scss';


const GameInfo = (props) => {
	return (
		<div className={styles.gameInfoWrapper}>
			GameInfo
		</div>
	);
}

export default Container(GameInfo);
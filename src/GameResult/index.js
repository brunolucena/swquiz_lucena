import React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';

import Container from './Container'
import styles from './styles.scss';


const GameResult = (props) => {
	return (
		<div className={styles.gameResultWrapper}>
			GameResult
		</div>
	);
}

export default Container(GameResult);

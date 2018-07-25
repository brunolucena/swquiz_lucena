import React from 'react';

import PropTypes from 'prop-types';

import Container from './Container'
import styles from './styles.scss';


const Logo = (props) => {
	return (
		<div className={styles.logoWrapper} style={{flexFlow: props.type == 'vertical' ? 'column' : 'row'}}>
			<i className={styles.logo} style={{backgroundImage: `url(${props.imageUrl})`}} />
			<h1 className={styles.title}>StarQuiz!</h1>
		</div>
	);
}

Logo.propTypes = {
	imageUrl: PropTypes.string.isRequired,
	type: PropTypes.string // horizontal or vertical
};

export default Container(Logo);

import React from 'react';

import PropTypes from 'prop-types';

import Container from './Container'
import styles from './styles.scss';


const Logo = (props) => {
	const logoWrapperStyles = {
		flexFlow: props.type == 'vertical' ? 'column' : 'row',
		transform: `scale(${props.size > 1 ? 1 : props.size < 0.1 ? 0.1 : props.size})`
	};

	const logoStyles = {
		backgroundImage: `url(${props.imageUrl})`
	};

	const titleStyles = {
		fontSize: props.type == 'vertical' ? '4rem' : '12rem',
		marginLeft: props.type == 'vertical' ? 'initial' : '2rem'
	}

	return (
		<div className={styles.logoWrapper} style={logoWrapperStyles}>
			<span className={styles.logo} style={logoStyles} />
			<span style={titleStyles}>StarQuiz!</span>
		</div>
	);
}

Logo.propTypes = {
	imageUrl: PropTypes.string.isRequired,
	size: PropTypes.number, // 0.1 to 1
	type: PropTypes.string // horizontal or vertical
};

export default Container(Logo);
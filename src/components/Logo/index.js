import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Container from './Container'
import styles from './styles.scss';


const Logo = (props) => {
	const logoWrapperStyles = {
		flexFlow: props.type == 'vertical' ? 'column' : 'row',
	};

	const logoStyles = {
		backgroundImage: `url(${props.imageUrl})`,
		backgroundSize: `${props.size}px`,
		height: `${props.size}px`,
		width: `${props.size}px`
	};

	const titleStyles = {
		fontSize: props.type == 'vertical' ? `${props.size / 2}px` : `${props.size}px`,
		marginLeft: props.type == 'vertical' ? 'initial' : '1rem'
	}

	return (
		<Link to="/" className={styles.logoWrapper} style={logoWrapperStyles}>
			<span className={styles.logo} style={logoStyles} />
			<span style={titleStyles}>StarQuiz!</span>
		</Link>
	);
}

Logo.propTypes = {
	imageUrl: PropTypes.string.isRequired,
	size: PropTypes.number, // 0.1 to 1
	type: PropTypes.string // horizontal or vertical
};

export default withRouter(Container(Logo));

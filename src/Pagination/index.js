import React from 'react';
import PropTypes from 'prop-types';

import { ChevronDoubleLeftIcon } from 'mdi-react';
import { ChevronDoubleRightIcon } from 'mdi-react';

import Container from './Container'
import styles from './styles.scss';


const Pagination = (props) => {
	const { goToNextPage, goToPreviousPage, hasNext, hasPrevious } = props;

	return (
		<div className={styles.paginationWrapper}>
			{
				hasPrevious &&
					<button className={styles.buttonLight} onClick={goToPreviousPage}><ChevronDoubleLeftIcon /> Previous</button>
			}
			{
				hasNext &&
					<button className={styles.buttonLight} onClick={goToNextPage}>Next <ChevronDoubleRightIcon /></button>
			}
		</div>
	);
}

Pagination.propTypes = {
	goToNextPage: PropTypes.func.isRequired, // Function to go to next page
	goToPreviousPage: PropTypes.func.isRequired, // Function to go to previous page
	hasNext: PropTypes.bool.isRequired, // Has next page
	hasPrevious: PropTypes.bool.isRequired // Has previous page
};

export default Container(Pagination);

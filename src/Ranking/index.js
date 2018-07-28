import React from 'react';
import PropTypes from 'prop-types';

import Container from './Container'
import styles from './styles.scss';


const Ranking = (props) => {
	const { games } = props;

	return (
		<div className={styles.rankingWrapper}>
			<div className={styles.title}>
				Ranking
			</div>

			<div className={styles.content}>
				{
					games.length ?
						games.map((game, i) => (
							<div className={styles.item}>
								<div className={styles.position}>
									{i + 1} - {game.name}
								</div>
								<div>
									Score: {game.score}
								</div>
							</div>
						))
					:
						'No games saved.'
				}
			</div>
		</div>
	);
}

Ranking.propTypes = {
	games: PropTypes.arrayOf(PropTypes.shape({ // Data to display at the ranking
		email: PropTypes.string,
		name: PropTypes.string,
		score: PropTypes.number
	})).isRequired
}

export default Container(Ranking);

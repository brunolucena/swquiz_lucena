import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { TrophyIcon } from 'mdi-react';

import Ranking from '../Ranking'

import Container from './Container'
import styles from './styles.scss';


const Home = (props) => {
	return (
		<section className={styles.homeWrapper}>
			<i className={styles.logo} />
			<h1 className={styles.title}>StarQuiz!</h1>

			<div className={styles.buttons}>
				<Link to="swquiz" className={styles.button}>JOGAR</Link>
				{
					props.pendingGameHash &&
						<Link to={`swquiz/${props.pendingGameHash}`} className={styles.button}>CONTINUAR</Link>
				}
			</div>

			<div className={styles.ranking}>
				<Link to="ranking" className={styles.buttonLight}>
					<TrophyIcon />
					<span className={styles.text}>RANKING</span>
				</Link>
			</div>

			<div className={styles.gameInfo}>
				Info
			</div>
		</section>
	);
}

Home.propTypes = {
	openedModalRankingg: PropTypes.bool, // Should open modal with Ranking
	pendingGameHash: PropTypes.string // Hash of pending game on localStorage
};

export default withRouter(Container(Home));

import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { TrophyIcon } from 'mdi-react';

import Dialog from '@material-ui/core/Dialog';

import Ranking from '../Ranking';

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
				<button onClick={props.openModalRanking} className={styles.buttonLight}>
					<TrophyIcon />
					<span className={styles.text}>RANKING</span>
				</button>
			</div>

			<Dialog open={props.openedModalRanking} onClose={props.closeModalRanking} aria-labelledby="simple-dialog-title">
				<Ranking data={props.rankingData} />
			</Dialog>

			<div className={styles.gameInfo}>
				Info
			</div>
		</section>
	);
}

Home.propTypes = {
	closeModalRanking: PropTypes.func.isRequired, // Function to close modal
	openedModalRanking: PropTypes.bool.isRequired, // Should open modal with Ranking
	openModalRanking: PropTypes.func.isRequired, // Function to open modal
	pendingGameHash: PropTypes.string, // Hash of pending game on localStorage
	rankingData: PropTypes.array // Array of swgame objects
};

export default withRouter(Container(Home));

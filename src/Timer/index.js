import React from 'react';
import Countdown from 'react-countdown-moment'
import PropTypes from 'prop-types';
import cx from 'classnames';
import moment from 'moment';
import { AlarmIcon } from 'mdi-react';

import Logo from '../Logo';

import Container from './Container'
import styles from './styles.scss';


const Timer = (props) => {
	const { dateTimeLimit, isStarted, isVisible, timePlaceholder, timeWarning } = props;

	const timerClasses = cx(styles.timer, {
		[styles.warning]: timeWarning
	});

	const pad = (num) => {
		return ("0" + num).slice(-2)
	}

	const hhmmss = (secs) => {
		let minutes = Math.floor(secs / 60);
		secs = secs % 60;

		let hours = Math.floor(minutes/60)
		minutes = minutes % 60;

		return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`
	}

	return (
		<div className={styles.timerContainer}>
			{
				isVisible &&
					<div id="timer" className={timerClasses}>
						<AlarmIcon className={styles.alarm} />
						<div className={styles.time}>
							{
								isStarted ?

									<Countdown endDate={moment(dateTimeLimit)} />
								:
									`${hhmmss(timePlaceholder)}`
							}
						</div>
					</div>
			}
		</div>
	)
}

Timer.propTypes = {
	dateTimeLimit: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.string
	]).isRequired, // DateTime limit to finish game
	isStarted: PropTypes.bool.isRequired, // Timer is started
	isVisible: PropTypes.bool, // Timer is visible
	timePlaceholder: PropTypes.number.isRequired // Display placeholder of how many time the player will have. In seconds
};

export default Container(Timer);

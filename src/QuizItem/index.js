import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';

import CharInfo from '../CharInfo';

import Container from './Container'
import styles from './styles.scss';


const QuizItem = (props) => {
	const { closeHintModal, handleInputChange, id, imageUrl, openedModal, openHintModal, playerNameGuess } = props;

	const imageStyles = {
		backgroundImage: `url(${imageUrl})`,
		backgroundSize: '100px',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		height: '100px',
		width: '100px'
	};

	return (
		<div className={styles.item}>
			<div className={styles.image} style={imageStyles}>
			</div>

			<div className={styles.buttons}>
				<TextField
					className={styles.textField}
					name="playerNameGuess"
					label="Character Name"
					value={playerNameGuess}
					onChange={handleInputChange}
				/>
				<button className={styles.button} onClick={() => { openHintModal(id) }}>
					Info...
				</button>

				<Dialog open={openedModal} onClose={() => { closeHintModal(id) }} aria-labelledby="simple-dialog-title">
					<CharInfo data={{...props}} />
				</Dialog>
			</div>
		</div>
	);
}

export default Container(QuizItem);

import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';

import CharInfo from '../CharInfo';

import Container from './Container'
import styles from './styles.scss';


const QuizItem = (props) => {
	const { closeHintModal, handleInputChange, id, isPlaceholder, imageUrl, openedModal, openHintModal, playerNameGuess } = props;

	const imageStyles = {
		backgroundColor: isPlaceholder ? '#b9b9b9' : 'initial',
		backgroundImage: isPlaceholder ? 'initial' : `url(${imageUrl})`,
		backgroundSize: '100px',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		height: '100px',
		width: '100px'
	};

	return (
		<div className={styles.item} style={{borderColor: isPlaceholder ? '#b9b9b9' : '#000'}}>
			<div className={styles.image} style={imageStyles}>
			</div>

			<div className={styles.buttons}>
				{
					!isPlaceholder ?
						[
							<TextField
								key="text-field"
								className={styles.textField}
								name="playerNameGuess"
								label="Character Name"
								value={playerNameGuess}
								onChange={(event) => { handleInputChange(event, id) }}
							/>,
							<button key="button" className={styles.button} onClick={() => { openHintModal(id) }}>
								Info...
							</button>,

							<Dialog key="dialog" open={openedModal} onClose={() => { closeHintModal(id) }} aria-labelledby="simple-dialog-title">
								<CharInfo {...props} />
							</Dialog>
						]
					:
						[
							<div key="placeholder-1" className={styles.placeholder}></div>,
							<div key="placeholder-2" className={`${styles.placeholder} ${styles.isButton}`}></div>
						]
				}
			</div>
		</div>
	);
}

export default Container(QuizItem);

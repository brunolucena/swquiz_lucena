import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';

import CharInfo from '../CharInfo';

import Container from './Container'
import styles from './styles.scss';


const QuizItem = (props) => {
	const { closeHintModal, handleInputChange, id, imageUrl, isPlaceholder, openedModal, openHintModal, play, playerGuess } = props;

	const imageStyles = {
		backgroundColor: isPlaceholder ? '#b9b9b9' : 'initial',
		backgroundImage: isPlaceholder ? 'initial' : `url(${imageUrl})`,
		backgroundSize: '150px',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		height: '150px',
		width: '150px'
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
								name="playerGuess"
								label="Resposta"
								value={playerGuess}
								onChange={(event) => { handleInputChange(event, id) }}
							/>,
							<button key="button" className={styles.buttonSmall} onClick={() => { openHintModal(id) }}>
								Dicas...
							</button>,

							<Dialog key="dialog" open={openedModal && play} onClose={() => { closeHintModal(id) }} aria-labelledby="simple-dialog-title">
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

QuizItem.propTypes = {
	closeHintModal: PropTypes.func, // Function to close a modal
	handleInputChange: PropTypes.func, // Function to change input text
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Necessary to verify the answers
	imageUrl: PropTypes.string, // Url of image
	isPlaceholder: PropTypes.bool, // Is item a placeholder
	openedModal: PropTypes.bool, // Open modal with hints.
	openHintModal: PropTypes.func, // Function to open modal
	play: PropTypes.bool, // Is game playing
	playerGuess: PropTypes.string, // Player answer for that item
}

export default Container(QuizItem);

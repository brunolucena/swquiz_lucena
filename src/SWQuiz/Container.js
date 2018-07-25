import React from 'react';
import PropTypes from 'prop-types';

/**
 * -SWQuiz is an instance of a Star Wars Quiz Game.
 * -The game is built over the API https://swapi.co/
 * -When the game starts loading, it awaits until at least two pages are fully loaded so the game
 * can start.
 * -When the game is ready, a countdown will apear so the player can prepare.
 * -A page is considered as fully loaded when all persons from that page are loaded and it's respective
 * data: image, homeworld, films, species, vehicles and starships.
 * -When the player goes to the next page, if there are more pages, then the next page is loaded.
 * -All of this assures that the player has quick access to each page and characters info as needed,
 * considering that the game is a tempo game.
 * -A game is considered as finished only when the player has saved his name and email. Otherwise, if the
 * time limit has reached, the player will always be prompted to put his data to consider tha game as finished.
 * -Every request to the API saves the content of it in the state and the page that was requested.
 * Ex: A request to '/people/?page=2' saves the content of the results and the number '2' at 'pagesLoadedFromAPI'.
 * -This is done so that the game can random the characters on each game, instead of showing always the same characters.
 * -The first API request is made only to get how many pages are available at the API, by using the data.results.length and
 * data.count to calculate how many pages are available. So, if the API receives more characters, the game will consider then.
 * -The first API request also saves it's result on pagesLoadedFromAPI, which can be be used later.
 * -Each page from the API is randomed selected and shown.
 */
const Container = (Component) => (
	class extends React.Component {
		static propTypes = {
			countdown: PropTypes.number, // Number in seconds of countdown before game begins
			hash: PropTypes.string, // Hash of a already started game. Can be empty
			itensPerPage: PropTypes.number, // How many items to display on each page
			pointsForFullAnswer: PropTypes.number, // Points for a correct answer without tips
			pointsForAnswerWithHints: PropTypes.number, // Points for a correct answer with tips
			timeLimit: PropTypes.number // Number in seconds of available time to answer the Quiz
		};

		static defaultProps = {
			countdown: 3,
			hash: '',
			itensPerPage: 10,
			pointsForFullAnswer: 10,
			pointsForAnswerWithHints: 5,
			timeLimit: 120
		};

		constructor(props) {
			super(props);

			this.state = {
				answers: [], // Answers given by the player.
				availableAPIPages: [], // Pages available on the API. Ex: [1, 2, 3, 4, 5, 6, 7, 8, 9].
				dateTimeEnded: null, // DateTime that the game was concluded.
				dateTimeLimit: null, // DateTime limit to finish the game (dateTimeStart + timeLimit).
				dateTimeStart: null, // DateTime when the game was started.
				email: '', // Player email.
				gamePages: {}, // Pages to show at the game. Each page is an attribute of the object and the value is an array that expect to have {props.itensPerPage} length.
				isGameFinished: false, // Game has been finished and player has put it's name and email.
				isGameReady: false, // Game is ready to start.
				name: '', // Player name.
				pagesLoadedFromAPI: [], // Pages that were loaded from the API. Ex: [1, 4, 7].
				score: 0 // Player final score.
			};
		}

		render() {
			return (
				<Component
					{...this.props}
					{...this.state}
				/>
			)
		}
	}
)

export default Container;
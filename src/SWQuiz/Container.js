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
				activePage: 1, // Page active.
				answers: [], // Answers given by the player.
				availableAPIPages: [], // Pages available on the API. Ex: [1, 2, 3, 4, 5, 6, 7, 8, 9].
				dateTimeEnded: '', // DateTime that the game was concluded.
				dateTimeLimit: '', // DateTime limit to finish the game (dateTimeStart + timeLimit).
				dateTimeStart: '', // DateTime when the game started.
				email: '', // Player email.
				gamePages: {
					1: {
						isReady: true,
						itens: [
							{
								"name": "Luke Skywalker",
								"height": "172",
								"mass": "77",
								"hair_color": "blond",
								"skin_color": "fair",
								"eye_color": "blue",
								"birth_year": "19BBY",
								"gender": "male",
								"homeworld": "https://swapi.co/api/planets/1/",
								"films": [
									"https://swapi.co/api/films/2/",
									"https://swapi.co/api/films/6/",
									"https://swapi.co/api/films/3/",
									"https://swapi.co/api/films/1/",
									"https://swapi.co/api/films/7/"
								],
								"species": [
									"https://swapi.co/api/species/1/"
								],
								"vehicles": [
									"https://swapi.co/api/vehicles/14/",
									"https://swapi.co/api/vehicles/30/"
								],
								"starships": [
									"https://swapi.co/api/starships/12/",
									"https://swapi.co/api/starships/22/"
								],
								"created": "2014-12-09T13:50:51.644000Z",
								"edited": "2014-12-20T21:17:56.891000Z",
								"url": "https://swapi.co/api/people/1/"
							},
							{
								"name": "C-3PO",
								"height": "167",
								"mass": "75",
								"hair_color": "n/a",
								"skin_color": "gold",
								"eye_color": "yellow",
								"birth_year": "112BBY",
								"gender": "n/a",
								"homeworld": "https://swapi.co/api/planets/1/",
								"films": [
									"https://swapi.co/api/films/2/",
									"https://swapi.co/api/films/5/",
									"https://swapi.co/api/films/4/",
									"https://swapi.co/api/films/6/",
									"https://swapi.co/api/films/3/",
									"https://swapi.co/api/films/1/"
								],
								"species": [
									"https://swapi.co/api/species/2/"
								],
								"vehicles": [],
								"starships": [],
								"created": "2014-12-10T15:10:51.357000Z",
								"edited": "2014-12-20T21:17:50.309000Z",
								"url": "https://swapi.co/api/people/2/"
							},
							{
								"name": "R2-D2",
								"height": "96",
								"mass": "32",
								"hair_color": "n/a",
								"skin_color": "white, blue",
								"eye_color": "red",
								"birth_year": "33BBY",
								"gender": "n/a",
								"homeworld": "https://swapi.co/api/planets/8/",
								"films": [
									"https://swapi.co/api/films/2/",
									"https://swapi.co/api/films/5/",
									"https://swapi.co/api/films/4/",
									"https://swapi.co/api/films/6/",
									"https://swapi.co/api/films/3/",
									"https://swapi.co/api/films/1/",
									"https://swapi.co/api/films/7/"
								],
								"species": [
									"https://swapi.co/api/species/2/"
								],
								"vehicles": [],
								"starships": [],
								"created": "2014-12-10T15:11:50.376000Z",
								"edited": "2014-12-20T21:17:50.311000Z",
								"url": "https://swapi.co/api/people/3/"
							},
							{
								"name": "Darth Vader",
								"height": "202",
								"mass": "136",
								"hair_color": "none",
								"skin_color": "white",
								"eye_color": "yellow",
								"birth_year": "41.9BBY",
								"gender": "male",
								"homeworld": "https://swapi.co/api/planets/1/",
								"films": [
									"https://swapi.co/api/films/2/",
									"https://swapi.co/api/films/6/",
									"https://swapi.co/api/films/3/",
									"https://swapi.co/api/films/1/"
								],
								"species": [
									"https://swapi.co/api/species/1/"
								],
								"vehicles": [],
								"starships": [
									"https://swapi.co/api/starships/13/"
								],
								"created": "2014-12-10T15:18:20.704000Z",
								"edited": "2014-12-20T21:17:50.313000Z",
								"url": "https://swapi.co/api/people/4/"
							},
							{
								"name": "Leia Organa",
								"height": "150",
								"mass": "49",
								"hair_color": "brown",
								"skin_color": "light",
								"eye_color": "brown",
								"birth_year": "19BBY",
								"gender": "female",
								"homeworld": "https://swapi.co/api/planets/2/",
								"films": [
									"https://swapi.co/api/films/2/",
									"https://swapi.co/api/films/6/",
									"https://swapi.co/api/films/3/",
									"https://swapi.co/api/films/1/",
									"https://swapi.co/api/films/7/"
								],
								"species": [
									"https://swapi.co/api/species/1/"
								],
								"vehicles": [
									"https://swapi.co/api/vehicles/30/"
								],
								"starships": [],
								"created": "2014-12-10T15:20:09.791000Z",
								"edited": "2014-12-20T21:17:50.315000Z",
								"url": "https://swapi.co/api/people/5/"
							},
							{
								"name": "Owen Lars",
								"height": "178",
								"mass": "120",
								"hair_color": "brown, grey",
								"skin_color": "light",
								"eye_color": "blue",
								"birth_year": "52BBY",
								"gender": "male",
								"homeworld": "https://swapi.co/api/planets/1/",
								"films": [
									"https://swapi.co/api/films/5/",
									"https://swapi.co/api/films/6/",
									"https://swapi.co/api/films/1/"
								],
								"species": [
									"https://swapi.co/api/species/1/"
								],
								"vehicles": [],
								"starships": [],
								"created": "2014-12-10T15:52:14.024000Z",
								"edited": "2014-12-20T21:17:50.317000Z",
								"url": "https://swapi.co/api/people/6/"
							},
							{
								"name": "Beru Whitesun lars",
								"height": "165",
								"mass": "75",
								"hair_color": "brown",
								"skin_color": "light",
								"eye_color": "blue",
								"birth_year": "47BBY",
								"gender": "female",
								"homeworld": "https://swapi.co/api/planets/1/",
								"films": [
									"https://swapi.co/api/films/5/",
									"https://swapi.co/api/films/6/",
									"https://swapi.co/api/films/1/"
								],
								"species": [
									"https://swapi.co/api/species/1/"
								],
								"vehicles": [],
								"starships": [],
								"created": "2014-12-10T15:53:41.121000Z",
								"edited": "2014-12-20T21:17:50.319000Z",
								"url": "https://swapi.co/api/people/7/"
							},
							{
								"name": "R5-D4",
								"height": "97",
								"mass": "32",
								"hair_color": "n/a",
								"skin_color": "white, red",
								"eye_color": "red",
								"birth_year": "unknown",
								"gender": "n/a",
								"homeworld": "https://swapi.co/api/planets/1/",
								"films": [
									"https://swapi.co/api/films/1/"
								],
								"species": [
									"https://swapi.co/api/species/2/"
								],
								"vehicles": [],
								"starships": [],
								"created": "2014-12-10T15:57:50.959000Z",
								"edited": "2014-12-20T21:17:50.321000Z",
								"url": "https://swapi.co/api/people/8/"
							},
							{
								"name": "Biggs Darklighter",
								"height": "183",
								"mass": "84",
								"hair_color": "black",
								"skin_color": "light",
								"eye_color": "brown",
								"birth_year": "24BBY",
								"gender": "male",
								"homeworld": "https://swapi.co/api/planets/1/",
								"films": [
									"https://swapi.co/api/films/1/"
								],
								"species": [
									"https://swapi.co/api/species/1/"
								],
								"vehicles": [],
								"starships": [
									"https://swapi.co/api/starships/12/"
								],
								"created": "2014-12-10T15:59:50.509000Z",
								"edited": "2014-12-20T21:17:50.323000Z",
								"url": "https://swapi.co/api/people/9/"
							},
							{
								"name": "Obi-Wan Kenobi",
								"height": "182",
								"mass": "77",
								"hair_color": "auburn, white",
								"skin_color": "fair",
								"eye_color": "blue-gray",
								"birth_year": "57BBY",
								"gender": "male",
								"homeworld": "https://swapi.co/api/planets/20/",
								"films": [
									"https://swapi.co/api/films/2/",
									"https://swapi.co/api/films/5/",
									"https://swapi.co/api/films/4/",
									"https://swapi.co/api/films/6/",
									"https://swapi.co/api/films/3/",
									"https://swapi.co/api/films/1/"
								],
								"species": [
									"https://swapi.co/api/species/1/"
								],
								"vehicles": [
									"https://swapi.co/api/vehicles/38/"
								],
								"starships": [
									"https://swapi.co/api/starships/48/",
									"https://swapi.co/api/starships/59/",
									"https://swapi.co/api/starships/64/",
									"https://swapi.co/api/starships/65/",
									"https://swapi.co/api/starships/74/"
								],
								"created": "2014-12-10T16:16:29.192000Z",
								"edited": "2014-12-20T21:17:50.325000Z",
								"url": "https://swapi.co/api/people/10/"
							}
						]
					}
				}, // Pages to show at the game. Each page is an attribute as the page and the value as an array that expect to have {props.itensPerPage} length.
				hash: props.hash ? props.hash : this.createHash(), // Unique hash
				isGameFinished: false, // Game has been finished and player has put it's name and email.
				isGameReady: false, // Game is ready to start.
				name: '', // Player name.
				pagesLoadedFromAPI: [], // Pages that were loaded from the API. Ex: [1, 4, 7].
				score: 0 // Player final score.
			};

			this.closeHintModal = this.closeHintModal.bind(this);
			this.getItensFromPage = this.getItensFromPage.bind(this);
			this.openHintModal = this.openHintModal.bind(this);
		}

		closeHintModal(id) {
			const { activePage, gamePages } = this.state;

			let page = gamePages[activePage];

			page.itens.map(item => {
				if (item.url == id) {
					item.openedModal = false;
				}

				return item
			});

			gamePages[activePage] = page;

			this.setState({
				gamePages
			});
		}

		createHash() {
			let text = "";
			let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			let i;
			for (i = 0; i < 5; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}

			return text;
		}

		getItensFromPage(page) {
			const { gamePages } = this.state;

			return gamePages[page].itens
		}

		getPages() {
			const { gamePages } = this.state;

			const pages = Object.keys(gamePages).map(page => parseInt(page)).sort();

			return pages
		}

		goToNextPage() {
			const { activePage } = this.state;

			if (this.hasNextPage) {
				this.setState({
					activePage: activePage + 1
				});
			}
		}

		goToPreviousPage() {
			const { activePage } = this.state;

			if (this.hasPreviousPage) {
				this.setState({
					activePage: activePage - 1
				});
			}
		}

		hasNextPage() {
			const { activePage } = this.state;

			const pages = this.getPages();
			const index = pages.findIndex(p => p == activePage);

			const remainingPages = pages.splice(index + 1, pages.length);

			return remainingPages.length > 0
		}

		hasPreviousPage() {
			const { activePage } = this.state;

			const pages = this.getPages();
			const index = pages.findIndex(p => p == activePage);

			const remainingPages = pages.splice(index, pages.length);

			return pages.length > 0
		}

		openHintModal(id) {
			const { activePage, gamePages } = this.state;

			let page = gamePages[activePage];

			page.itens.map(item => {
				if (item.url == id) {
					item.openedModal = true;
					item.hasUsedHint = true;

					// TODO atualizar answers pra constar que o jogador abriu a modal
				}

				return item
			});

			gamePages[activePage] = page;

			this.setState({
				gamePages
			});
		}

		startGame() {
			// TODO
			// Carregas todas as paginas da API em uma variavel temporaria
			// Distribuir os itens em paginas de acordo com {itensPerPage}
			// Para cada item, adicionar uma flag {openedModal: false}, um {id} igual a {item.url} e uma flag {isReady: false}
			// Adicionar para as duas primeiras paginas um href em {imageUrl} de acordo com uma API apropriada
			// e substituir os enderecos da API por seus respectivos valores de: films, species, vehicles, starships e
			// homeworld. Apos carregas essas informacoes, trocar flag {isReady} para true
		}

		render() {
			return (
				<Component
					{...this.props}
					{...this.state}
					closeHintModal={this.closeHintModal}
					itens={this.getItensFromPage(this.state.activePage)}
					openHintModal={this.openHintModal}
				/>
			)
		}
	}
)

export default Container;
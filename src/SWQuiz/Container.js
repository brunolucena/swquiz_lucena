import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Helpers from './Helpers';
import Services from './Services';

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
			timeLimit: 5
		};

		constructor(props) {
			super(props);

			this.state = {
				activePage: 1, // Page active.
				answers: [], // Answers given by the player.
				apiPeople: [], // All people from API.
				availableAPIPages: [], // Pages available on the API. Ex: [1, 2, 3, 4, 5, 6, 7, 8, 9].
				dateTimeEnded: '', // DateTime that the game was concluded.
				dateTimeLimit: '', // DateTime limit to finish the game (dateTimeStart + timeLimit).
				dateTimeStart: '', // DateTime when the game started.
				email: '', // Player email.
				hash: props.hash, // Unique hash
				isGameFinished: false, // Game has been finished and player has put it's name and email.
				isGameReady: false, // Game is ready to start.
				name: '', // Player name.
				pages: [], // Pages to show at the game. Each page is an attribute as the page and the value as an array that expect to have {props.itensPerPage} length.
				pagesLoadedFromAPI: [], // Pages that were loaded from the API. Ex: [1, 4, 7].
				score: 0 // Player final score.
			};

			this.gameCounter = this.gameCounter.bind(this);
			this.closeHintModal = this.closeHintModal.bind(this);
			this.getItensFromPage = this.getItensFromPage.bind(this);
			this.openHintModal = this.openHintModal.bind(this);
			this.startGame = this.startGame.bind(this);

			this.interval = setInterval(this.gameCounter, 1000);
		}

		componentDidMount() {
			const { activePage, apiPeople, hash } = this.state;
			const { getAPIResource } = Services;

			this.loadInitialGameData();
		}

		/**
		 * @description Create pages from peoples array. Saves the data both on component and localStorage.
		 *				At localStorage, saves only the url of the char, so the localStorage does not have the
		 *				actual answers for the Quiz.
		 *
		 *				When loading the data, if it's loading an already existing game, keeps the same pages
		 *				from the game saved on localStorage, so the chars will always appear at the same order.
		 *				When creating a new game, will create pages in a random char order.
		 *
		 *				After pages are loaded, it loads the info (image) of activePage, next page and previous page.
		 *
		 * @param {Array} peoples List of peoples from API.
		 * @param {string} gameHash (?) optional. Hash of an already existing game on localStorage.
		 */
		createPages(peoples, gameHash) {
			const { itensPerPage } = this.props;
			const { getAPIResource } = Services;
			const { getGame, setGame } = Helpers;

			peoples = peoples.sort((a, b) => (0.5 - Math.random()));

			let game = getGame(gameHash);
			let pages = {};

			if (game) {
				let keys = Object.keys(game.pages);

				keys.forEach((pageNumber, indexPages) => {
					let page = game.pages[pageNumber];
					game.pages[pageNumber] = [];

					if (!pages[pageNumber]) {
						pages[pageNumber] = [];
					}

					page.forEach((character, indexCharacters) => {
						character = peoples.find(people => people.url == character.url);

						pages[pageNumber].push(character);

						if (indexPages + 1 == keys.length) {
							this.loadPageInfo(this.state.activePage);
						}
					});
				});
			} else {
				const hash = this.createHash();

				game = {
					hash,
					pages: {},
					isFinished: false
				};

				let actualPage = 1;

				peoples.forEach(people => {
					if (!game.pages[actualPage]) {
						game.pages[actualPage] = [];
					}

					if (!pages[actualPage]) {
						pages[actualPage] = [];
					}

					if (pages[actualPage].length == itensPerPage) {
						actualPage++;

						pages[actualPage] = [];
						game.pages[actualPage] = [];
					}

					const peopleToLocalStorage = {
						url: people.url
					};

					pages[actualPage].push(people);
					game.pages[actualPage].push(peopleToLocalStorage);
				});

				setGame(game);

				this.setState({
					hash,
					pages
				}, () => {
					this.loadPageInfo(this.state.activePage);
				});
			}
		}

		/**
		 * @description Closes the hint modal of a specific character.
		 *
		 * @param {number} id Character id. Since the API doesn't returns this info, it uses the url, which is unique.
		 */
		closeHintModal(id) {
			const { activePage, pages } = this.state;

			let page = pages[activePage];

			page.map(item => {
				if (item.url == id) {
					item.openedModal = false;
				}

				return item
			});

			pages[activePage] = page;

			this.setState({
				pages
			});
		}

		/**
		 * @description Create a hash to store a game.
		 *
		 * @returns {string} Hash
		 */
		createHash() {
			let text = "";
			let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			let i;
			for (i = 0; i < 50; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}

			return text;
		}

		gameCounter() {
			const { dateTimeLimit } = this.state;

			const secondsRemaining = moment().diff(dateTimeLimit, 'seconds') * -1;

			if (secondsRemaining < 1) {
				clearInterval(this.interval);

				this.setState({
					dateTimeEnded: new Date(),
					isGameFinished: true
				});
			}
		}

		/**
		 * @description Get all characters from a specific page.
		 *
		 * @param {number} page Page number
		 *
		 * @returns {Array} Array of characters
		 */
		getItensFromPage(page) {
			const { pages } = this.state;

			return pages[page]
		}

		/**
		 * @description Get all available pages on the game.
		 *
		 * @returns {Array} Array of ints sorted.
		 */
		getPages() {
			const pages = Object.keys(this.state.pages).map(page => parseInt(page)).sort();

			return pages
		}

		/**
		 * @description Go to next page if available.
		 */
		goToNextPage() {
			const { activePage } = this.state;

			if (this.hasNextPage()) {
				this.setState({
					activePage: activePage + 1
				});
			}
		}

		/**
		 * @description Go to previous page if available.
		 */
		goToPreviousPage() {
			const { activePage } = this.state;

			if (this.hasPreviousPage()) {
				this.setState({
					activePage: activePage - 1
				});
			}
		}

		/**
		 * @description Checks if there is a next page.
		 *
		 * @returns {bool}
		 */
		hasNextPage() {
			const { activePage } = this.state;

			const pages = this.getPages();
			const index = pages.findIndex(p => p == activePage);

			const remainingPages = pages.splice(index + 1, pages.length);

			return remainingPages.length > 0
		}

		/**
		 * @description Checks if there is a previous page.
		 *
		 * @returns {bool}
		 */
		hasPreviousPage() {
			const { activePage } = this.state;

			const pages = this.getPages();
			const index = pages.findIndex(p => p == activePage);

			const remainingPages = pages.splice(index, pages.length);

			return pages.length > 0
		}

		/**
		 * @description Load info from a specific character to display as hints.
		 */
		loadCharacterInfo(characterId) {
			const { activePage, pages } = this.state;
			const { getAPIResource } = Services;

			let page = pages[activePage];

			let characterIndex = page.findIndex(c => c.url == characterId);
			let character = page[characterIndex];

			let films = character.films;
			let homeworld = character.homeworld;
			let species = character.species;
			let starships = character.starships;
			let vehicles = character.vehicles;

			character.films = [];
			character.homeworld = {};
			character.species = [];
			character.starships = [];
			character.vehicles = [];

			getAPIResource(homeworld)
				.then(response => {
					character.homeworld = response.data;

					page = pages[activePage];
					page[characterIndex] = character;
					pages[activePage] = page;

					this.setState({
						pages
					});
				})
				.catch(response => {
					console.log('error', response)
				});
			;

			films.forEach((filmUrl, indexFilms) => {
				getAPIResource(filmUrl)
					.then(response => {
						character.films.push(response.data);

						if (indexFilms + 1 == films.length) {
							page = pages[activePage];
							page[characterIndex] = character;
							pages[activePage] = page;

							this.setState({
								pages
							});
						}
					})
					.catch(response => {
						console.log('error', response)
					})
				;
			});

			species.forEach((speciesUrl, indexSpecies) => {
				getAPIResource(speciesUrl)
					.then(response => {
						character.species.push(response.data);

						if (indexSpecies + 1 == species.length) {
							page = pages[activePage];
							page[characterIndex] = character;
							pages[activePage] = page;

							this.setState({
								pages
							});
						}
					})
					.catch(response => {
						console.log('error', response)
					});
				;
			});

			starships.forEach((starshipsUrl, indexStarships) => {
				getAPIResource(starshipsUrl)
					.then(response => {
						character.starships.push(response.data);

						if (indexStarships + 1 == starships.length) {
							page = pages[activePage];
							page[characterIndex] = character;
							pages[activePage] = page;

							this.setState({
								pages
							});
						}
					})
					.catch(response => {
						console.log('error', response)
					});
				;
			});

			vehicles.forEach((vehiclesUrl, indexVehicles) => {
				getAPIResource(vehiclesUrl)
					.then(response => {
						character.vehicles.push(response.data);

						if (indexVehicles + 1 == vehicles.length) {
							page = pages[activePage];
							page[characterIndex] = character;
							pages[activePage] = page;

							this.setState({
								pages
							});
						}
					})
					.catch(response => {
						console.log('error', response)
					});
				;
			});
		}

		/**
		 * @description Load game data to start game.
		 *				The game is considered as ready when it has all the pages characters loaded,
		 *				and the images from the activePage loaded.
		 *				The next and previous page also loads if available.
		 */
		loadInitialGameData() {
			const { getAPIResource } = Services;

			const loadPeoplesPage = (url) => {
				let currentPage = 1;

				getAPIResource(url)
					.then(response => {
						const { data } = response;
						const { next, results } = data;

						const peoples = this.state.apiPeople.concat(results);

						this.setState({
							apiPeople: peoples
						});

						if (next) {
							loadPeoplesPage(next);
						} else {
							let allPeople = this.state.apiPeople;
							this.createPages(allPeople, this.state.hash);
						}
					})
					.catch(response => {
						console.log('error', response)
					})
			}

			loadPeoplesPage('https://swapi.co/api/people/?page=1');
		}

		/**
		 * @description Load images from: activePage, next page and page before.
		 *				already loaded.
		 *
		 * @param {int} pageNumber Page to load info.
		 */
		loadPageInfo(pageNumber) {
			const { pages } = this.state;
			const { getAPIResource } = Services;

			pages[pageNumber].forEach((character, indexCharacter) => {
				let isCharacterImageLoaded = false;

				if (!character.imageUrl) {
					character.imageUrl = 'teste';

					pages[pageNumber][indexCharacter] = character;

					if (indexCharacter + 1 == pages[pageNumber].length) {
						this.setState({
							isGameReady: true,
							pages
						});
					}
				}

			});

			if (this.hasNextPage() && this.state.activePage + 1 == pageNumber + 1) {
				this.loadPageInfo(this.state.activePage + 1);
			}

			if (this.hasPreviousPage() && this.state.activePage - 1 == pageNumber - 1) {
				this.loadPageInfo(this.state.activePage - 1);
			}
		}

		/**
		 * @description Opens the hint modal of a specific character.
		 *
		 * @param {number} id Character id. Since the API doesn't returns this info, it uses the url, which is unique.
		 */
		openHintModal(id) {
			const { activePage, pages } = this.state;

			let page = pages[activePage];

			this.loadCharacterInfo(id);

			page.map(item => {
				if (item.url == id) {
					item.openedModal = true;
					item.hasUsedHint = true;

					// TODO atualizar answers pra constar que o jogador abriu a modal
				}

				return item
			});

			pages[activePage] = page;

			this.setState({
				pages
			});
		}

		/**
		 * @description Start a game by setting it's dateTimeStart and the dateTimeLimit, considering the timeLimit.
		 */
		startGame() {
			const addMinutes = (date, minutes) => {
				return new Date(date.getTime() + minutes * 60000);
			};

			console.log('sartGame()');

			if (!this.state.dateTimeStart) {
				this.setState({
					dateTimeLimit: addMinutes(new Date(), this.props.timeLimit / 60),
					dateTimeStart: new Date()
				});
			}
		}

		render() {
			return (
				<Component
					{...this.props}
					{...this.state}
					closeHintModal={this.closeHintModal}
					itens={this.getItensFromPage(this.state.activePage)}
					openHintModal={this.openHintModal}
					startGame={this.startGame}
				/>
			)
		}
	}
)

export default Container;
const GAMESNAME = 'swquiz_games'

const getGames = () => {
	return JSON.parse(localStorage.getItem(GAMESNAME)) || []
}

const deleteGame = (gameHash) => {
	let games = getGames();

	games = games.filter(game => game.hash != gameHash);

	localStorage.setItem(GAMESNAME, JSON.stringify(games));
}

const getGame = (gameHash) => {
	let games = getGames();

	let game = games.find(g => g.hash == gameHash);

	return game
}

const setAnswer = (gameHash, answer) => {
	const games = getGames();
	const gameIndex = games.findIndex(g => g.hash == gameHash);

	const game = games[gameIndex];

	const answerIndex = game.answers.findIndex(a => a.id == answer.id);

	if (answerIndex == -1) {
		game.answers.push(answer);
	} else {
		game.answers[answerIndex] = answer;
	}

	games[gameIndex] = game;

	localStorage.setItem(GAMESNAME, JSON.stringify(games));
}

const setGameData = (gameHash, attribute, value) => {
	const games = getGames();

	const gameIndex = games.findIndex(game => game.hash == gameHash);
	const game = games[gameIndex];

	game[attribute] = value;
	games[gameIndex] = game;

	localStorage.setItem(GAMESNAME, JSON.stringify(games));
}

const setOrUpdateGame = (game) => {
	const games = getGames();

	const localStorageGameIndex = games.findIndex(g => g.hash == game.hash);

	if (localStorageGameIndex > -1) {
		games[localStorageGameIndex] = game;
	} else {
		games.push(game);
	}

	localStorage.setItem(GAMESNAME, JSON.stringify(games));
}

export default {
	deleteGame,
	getGame,
	setAnswer,
	setGameData,
	setOrUpdateGame
}
const GAMESNAME = 'swquiz_games'

const getGames() {
	return JSON.parse(localStorage.getItem(GAMESNAME)) || []
}

export const deleteGame = (gameHash) => {
	let games = getGames();

	games = games.filter(game => game.hash != gameHash);

	localStorage.setItem(GAMESNAME, Json.stringify(games));
}

export const setAnswer = (gameHash, answer) => {
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

export const setGame = (game) => {
	const games = getGames();

	games.push(game);

	localStorage.setItem(GAMESNAME, JSON.stringify(games));
}
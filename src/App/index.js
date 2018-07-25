import React, { Component } from 'react';
import { Route } from 'react-router'

import Home from '../Home'
import SWQuiz from '../SWQuiz'


class App extends Component {
	render() {
		return (
			<div>
				<Route exact path="/" component={Home} />
				<Route exact path="/swquiz" component={SWQuiz} />
			</div>
		);
	}
}

export default App;

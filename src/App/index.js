import React, { Component } from 'react';
import { Route, Switch } from 'react-router'

import Home from '../Home'
import SWQuiz from '../SWQuiz'


class App extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/ranking" component={Home} />
					<Route exact path="/swquiz" component={SWQuiz} />
				</Switch>
			</div>
		);
	}
}

export default App;

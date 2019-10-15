import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from './Components/Home';
import Menu from './Components/Menu';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Redirect to="/home" />
				</Route>
				<Route exact path="/home" component={Home} />
				<Route exact path="/menu" component={Menu} />
			</Switch>
		</Router>
	);
}

export default App;

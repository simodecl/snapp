import React, { Component } from 'react';

/*
Libraries
*/
import { BrowserRouter as Router } from 'react-router-dom';

/*
Material UI
*/
import './App.css';

/*
Layouts
*/
import Main from './layouts/main/Main';

class App extends Component {
	render() {
		return (
			<Router>
				<Main />
			</Router>
		);
	}
}

export default App;
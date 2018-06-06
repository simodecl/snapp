import React, { Component } from 'react';

/*
Libraries
*/
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

/*
Material UI
*/
import './App.css';

/*
Layouts
*/
import Main from './layouts/main/Main';

/*
Configuration
*/
import config from './config.json';

/*
State management via Redux
*/
import store from './store';

/*
Auth state
*/
import { AUTHENTICATED, UNAUTHENTICATED } from './constants';
const auth = localStorage.getItem('mobdev2_auth');
if(auth) {
  store.dispatch({ type: AUTHENTICATED, payload: JSON.parse(auth) });
} else {
  store.dispatch({ type: UNAUTHENTICATED });
}

class App extends Component {
  render() {    
    return (
      <Provider store={store}>
        <Router>
            <Main />
        </Router>
      </Provider>
    );
  }
}

export default App;

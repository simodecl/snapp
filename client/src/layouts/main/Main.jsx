import React, { Component } from 'react';

/*
Libraries
*/
import { Redirect, Route, Switch } from 'react-router-dom';

/*
Material UI
*/
import './Main.css';

/*
Components
*/
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

/*
Page components
*/
import HomePage from '../../pages/home-page/HomePage';

class Main extends Component {
  render() {    
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Redirect from="/home" to="/"/>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;

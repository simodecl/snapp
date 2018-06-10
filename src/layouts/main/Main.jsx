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
import GalleryPage from '../../pages/gallery-page/GalleryPage';

class Main extends Component {
  render() {    
    return (
      <div>
        <Header />
        <Switch>
          <Redirect from="/home" to="/"/>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/gallery' component={GalleryPage}/>
          <Route path="*" component={HomePage}/>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;

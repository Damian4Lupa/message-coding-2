import React, { Component } from 'react';
import "../styles/normalize.sass"
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/App.css';
import Header from './Header';
import Coding from './Coding';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Coding />
      </>
    );
  }
}

export default App;

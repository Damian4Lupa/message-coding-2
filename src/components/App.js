import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import Footer from './Footer'
import Header from './Header'
import Coding from './Coding'


class App extends Component {
  render() {
    return (
      <>
        <Header />

        <Coding />

        <Footer />
      </>
    );
  }
}


export default App;

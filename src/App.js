import Navbar from './components/Navbar';
import News from './components/News';
import './App.css';

import React, { Component } from 'react'

export default class App extends Component {

  
  render() {
    return (
      <div >
        <Navbar/>
        <News pageSize={10}/>
      </div>
      // style={{color: "white",backgroundColor: "#042743"}}
    )
  }
}


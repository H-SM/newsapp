import './App.css';

import React, { Component } from 'react'

export default class App extends Component {
  c= 'john';
  //this is a class variable
  render() {
    return (
      <div>
        this is a class based component... 
        <br />having a class variable {"c = "+ this.c }
      </div>
    )
  }
}


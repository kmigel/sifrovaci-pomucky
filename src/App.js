import React, { Component, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import './App.scss';

import Morseovka from './pomucky/morseovka.js';
import Braille from './pomucky/braille.js';
import Semafor from './pomucky/semafor.js';

class MenuButton extends Component {
  constructor(props) {
    super(props);
    this.name = props.name;
  }

  handleClick = () => {
    const navigate = this.props.navigate;
    navigate(`/${this.name.toLowerCase()}`);
  };

  render() {
    return (
      <button className={this.name} onClick={this.handleClick}>
        {this.name}
      </button>
    );
  }
}

const MenuButtonWrapper = (props) => {
  const navigate = useNavigate();
  return <MenuButton {...props} navigate={navigate} />;
};

function App() {
  const location = useLocation();
  const inMenu = (location.pathname == "/");

  return (<>
    <div className={inMenu ? "menu" : "hide"}>
      <MenuButtonWrapper name="Morseovka" />
      <MenuButtonWrapper name="Braille" />
      <MenuButtonWrapper name="Semafor" />
      <MenuButtonWrapper name="Pomucka" />
      <MenuButtonWrapper name="Pomucka" />
      <MenuButtonWrapper name="Pomucka" />
    </div>
    <Routes>
      <Route path="/morseovka" element={<Morseovka />} />
      <Route path="/braille" element={<Braille />} />
      <Route path="/semafor" element={<Semafor />} />
    </Routes>
  </>);
}

export default App;
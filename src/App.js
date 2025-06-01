import React, { Component, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import './reset.css';
import './App.scss';

import Morse from './pomucky/morse.js';
import Braille from './pomucky/braille.js';
import Semafor from './pomucky/semafor.js';
import Numbers from './pomucky/numbers.js';

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
      <div className="button-cont">
        <MenuButtonWrapper name="Morse" />
        <MenuButtonWrapper name="Braille" />
        <MenuButtonWrapper name="Semafor" />
        <MenuButtonWrapper name="Numbers" />
      </div>
    </div>
    <Routes>
      <Route path="/morse" element={<Morse />} />
      <Route path="/braille" element={<Braille />} />
      <Route path="/semafor" element={<Semafor />} />
      <Route path="/numbers" element={<Numbers />} />
    </Routes>
  </>);
}

export default App;
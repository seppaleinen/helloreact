import React from 'react';
import ReactDOM from 'react-dom';
import Index from './index';
import Game from './game';
import GameStore from './stores/game-store'
import { Provider } from "mobx-react"

const stores  = {
  gameStore: new GameStore()
}

const App = () => 
  <Provider {...stores}>
    <Game />
  </Provider>


describe("Testing index", function() {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
})

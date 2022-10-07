import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CharacterService from './api/CharacterService'
import Dashboard from './components/Dashboard';
import Character from './model/Character';
import data from '../test/fixtures/shad.json'

// const characterService = new CharacterService()

async function render() {
  ReactDOM.render(<Dashboard character={data.data}/>, document.body);
}

render();

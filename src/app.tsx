import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CharacterService from './api/CharacterService'
import Dashboard from './components/Dashboard';
import Character from './model/Character';

const characterService = new CharacterService()

async function render() {
  
  const data = await characterService.get('55412987')
  const shad = Character.build(data.data)
  ReactDOM.render(<Dashboard character={data.data}/>, document.body);
}

render();

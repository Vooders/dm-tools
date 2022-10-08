import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dashboard from './components/Dashboard';
import data from '../test/fixtures/shad.json'

async function render() {
  ReactDOM.render(<Dashboard character={data.data}/>, document.body);
}

render();

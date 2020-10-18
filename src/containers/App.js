import React from 'react';
import './App.css';
import Form from './Form/Form';
import Success from './Success';
import { Switch, Route } from 'react-router';

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route path='/success' exact component={Success} />
				<Route path='*' component={Form} />
			</Switch>
		</div>
	);
}

export default App;

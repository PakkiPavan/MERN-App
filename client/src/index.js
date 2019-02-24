import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './Home';
import Registration from './Registration';
import Login from './Login';
//import * as serviceWorker from './serviceWorker';
/*import {createStore} from 'redux';
import {Provider} from 'react-redux';
import LikeReducer from './LikeReducer';*/
import {BrowserRouter,Route} from 'react-router-dom';

//const store=createStore(LikeReducer);

ReactDOM.render(
	<BrowserRouter>
		<div>
			<Route exact path="/" component={Home}/>
			<Route path="/register" component={Registration}/>
			<Route path="/login" component={Login}/>
			<Route path="/like" component={App}/>

		</div>
	</BrowserRouter>,
	document.getElementById('root'));

/*
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
*/


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();

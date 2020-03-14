import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './Home';
import Registration from './Registration';
import Login from './Login';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
//import MM1 from './MM1';
import MMPlay from './MMPlay';
import MMHome from './MMHome';
import MMReducer from './MMReducer';
import NotFound from './NotFound';
import Spotify from './Spotify';
import Youtube from './Youtube';
import YoutubeTest from './YoutubeTest';
import {HashRouter,Route,Switch} from 'react-router-dom';
//import {BrowserRouter,HashRouter,Route,Switch} from 'react-router-dom';
import Rules from './Rules';
//import createHistory from 'history/createBrowserHistory'
import Codeforces from './Codeforces';
// import 'bootstrap/dist/css/bootstrap.min.css';

export const store=createStore(MMReducer);

//import * as serviceWorker from './serviceWorker';
/*import {createStore} from 'redux';
import {Provider} from 'react-redux';
import LikeReducer from './LikeReducer';*/

//const store=createStore(LikeReducer);

ReactDOM.render(
	<HashRouter>
		<div>
			<Provider store={store}>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route path="/register" component={Registration}/>
					<Route path="/login" component={Login}/>
					<Route path="/codeforces" component={Codeforces}/>
					<Route path="/like" component={App}/>
					<Route path="/mastermind" component={MMHome}/>
					<Route path="/rules" component={Rules}/>
					<Route path="/play" component={MMPlay}/>
					<Route path="/spotify" component={Spotify}/>
					<Route path="/youtube" component={Youtube}/>
					<Route path="/youtubeTest" component={YoutubeTest}/>
					<Route path="/*" component={NotFound}/>
				</Switch>
			</Provider>
		</div>
	</HashRouter>,
	document.getElementById('root'));


store.subscribe(()=>{
	// console.log("Current state is",store.getState())
})

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

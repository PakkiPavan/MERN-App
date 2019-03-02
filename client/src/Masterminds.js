import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import MM1 from './MM1';
import MMHome from './MMHome';
import MMReducer from './MMReducer';
import {BrowserRouter,Route,Link} from 'react-router-dom';
import Rules from './Rules';
const store=createStore(MMReducer);

class Masterminds extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state={}
	}

	render()
	{
		return(
      <BrowserRouter>
    		<div>
    			<center><h1 style={{color:'#863cbd',fontWeight:'900',fontFamily:"-webkit-body"}}>MASTERMIND</h1></center>
    			<Provider store={store}>
    				<Route exact path="/" component={MMHome}/>
    				<Route path="/rules" component={Rules}/>
    				<Route path="/play" component={MM1}/>
    			</Provider>
    		</div>
    	</BrowserRouter>
    );
	}
}

export default Masterminds;

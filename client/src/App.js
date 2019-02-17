import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import '../node_modules/font-awesome/css/font-awesome.css'

//import axios from 'axios';
/*import {mapStateToProps,mapDispatchToProps} from './LikeStore';
import {connect} from 'react-redux';*/

//	"heroku-postbuild":"NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"

class App extends Component {
	constructor(props)
	{
		super(props);
		this.state={count:-1}
	}
	componentWillMount()
	{
		/*axios.post("/inc",this.state)
				.then(result=>console.log(result))*/
		//Without Redux
		fetch('/api')
			.then((res)=>res.json())	
			.then(countJson=>this.setState({count:countJson[0].count},()=>console.log("Count fetched",countJson[0])));		
			
		//console.log(this.state.count)
		/*
			// Redux
			fetch('/api')
			.then((res)=>res.json())
			.then(countJson=>this.props.inc(countJson[0].count));		*/
	}
	componentDidUpdate()
	{
		//console.log("componentDidUpdate");
		//console.log(this.state.count)		
	}
	test()
	{
		console.log("Inside test");
		document.getElementById("like").childNodes[0].style.pointerEvents="none";
		document.getElementById("like").childNodes[0].style.color="green";
		
		this.setState({count:this.state.count+1},()=>console.log("With callback ",this.state.count))
		console.log("Without callback ",this.state.count)
		$.ajax({
			url:'/inc',
			type:'post',
			data:{
				count:this.state.count
			},
			success:function(r)
			{
				console.log("Success")
				console.log(r)
			},
			error:function()
			{
				console.log("Error")
			}
		})
		
	}
	
	render() {
		if(this.state.count!==-1)
		{
			return (
				<div id="like">
					<i className="fa fa-thumbs-up fa-2x" onClick={this.test.bind(this)}></i>
					<h1>{this.state.count}</h1>			
				</div>
			);
		}
		else
		{
			return(
				<div>Loading...</div>
			)
		}
		
	}
}
export default App;
//export default connect(mapStateToProps,mapDispatchToProps)(App);

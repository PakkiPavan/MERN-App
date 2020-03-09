import React, { Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import '../node_modules/font-awesome/css/font-awesome.css'
//import {Link} from 'react-router-dom';
import axios from 'axios';
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
		axios.get('/api')
		.then(res=>res.data)
		.then(countJson=>this.setState({count:countJson[0].count}))
		.catch(err=>console.log(err))
		//Without Redux
		/*
			fetch('/api')
			.then((res)=>res.json())
			.then(countJson=>this.setState({count:countJson[0].count},()=>console.log("Count fetched",countJson[0])));
		*/
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
		// console.log("Inside test");
		// console.log(document.getElementById("like").childNodes[1]);
		document.getElementById("like").childNodes[2].style.pointerEvents="none";
		document.getElementById("like").childNodes[2].style.color="green";

		this.setState({count:this.state.count+1},()=>console.log("With callback ",this.state.count))
		// console.log("Without callback ",this.state.count)
		$.ajax({
			url:'/inc',
			type:'post',
			data:{
				count:this.state.count
			},
			success:function(r)
			{
				// console.log("Success")
				// console.log(r)
			},
			error:function()
			{
				console.log("Error")
			}
		})

	}
	nav()
	{
		$('.nav').toggle(400);
	}
	logout()
  {
    axios.get('/logout')
    .then(res=>{
        // console.log(res);
        if(res.data==="pass")
          this.setState({logout:!this.state.logout})
    })
    .catch(err=>alert("Something went wrong"))
  }
	render() {
		if(this.state.count!==-1)
		{
			return (
				<div>
					<div className="mainHeader">
            <div className="pavanLogo" onClick={this.nav.bind(this)}>
              <span className="pp">PP</span>
            </div>
            <span className="profile">Welcome {this.props.uname}</span>
            <div className="nav">
              <button className="customBtn" onClick={this.logout.bind(this)}>Logout</button>
            </div>
          </div>

					<div id="like">
						<i className="fa fa-thumbs-up fa-2x" onClick={this.test.bind(this)}></i>
						&nbsp;&nbsp;<b style={{fontSize:'20px'}}>{this.state.count}</b>
					</div>

					<div className="footer">
						<p className="copyrights">&copy; Copyrights Pakki Pavan 2019</p>
					</div>

			</div>
			);
		}
		else
		{
			return(
				<div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
					<i className="fa fa-spinner fa-spin" style={{fontSize:"40px"}}></i>
					{/*
					<Loading>
					<div className="load">
						Loading...
					</div>
					</Loading>*/}
				</div>
			)
		}

	}
}

export default App;
//export default connect(mapStateToProps,mapDispatchToProps)(App);

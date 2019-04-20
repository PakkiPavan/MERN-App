import React from 'react';
import {Link} from 'react-router-dom';
import './MM.css';
import './App.css';
import $ from 'jquery';
import axios from 'axios';
import ErrorPage from './ErrorPage';
import Login from './Login';
import {mapStateToProps,mapDispatchToProps} from './MMStore';
import {connect} from 'react-redux';
import {store} from './index';
import styled,{keyframes} from 'styled-components';
import Footer from './Footer';

const Hamburger=styled.i`
	width:0px;
	outline:none;
	border:none;
	font-size:25px;
	padding:20px;
	cursor:pointer;
	color:white;
	display:none; 
	@media(max-width:975px){
		display:block;
	}
	@media(min-width:974px){
		display:none !important;
	}
`;
const Close=styled.i`
	font-size:25px;
	padding:20px;
	cursor:pointer;
	color:white;
	display:none; 
	@media(min-width:974px){
		display:none !important;
	}
`;

var load=keyframes`
	0%
	{
		transform:rotate(0deg);
	}
	100%
	{
		transform:rotate(360deg);
	}
`;

var Loading=styled.div`
	position:absolute;
	border:5px solid silver;
	top:50%;
	left:50%;
	transform:translate(-50%,-50%);
	width:150px;
	height:150px;
	border-radius:50%;
	text-align:center;
	line-height:150px;
	font-size:20px;
	text-transform:uppercase;
	&:before{
		content:'';
		position:absolute;
		top:-5px;
		left:-5px;
		width:100%;
		height:100%;
		border:5px solid transparent;
		border-top:5px solid black;
		border-radius:50%;
		animation:${load} 1.5s infinite;
	}
`;

class MMHome extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state={count:-1}
	}
	componentDidMount()
	{
		document.body.scrollTop=0;
		document.documentElement.scrollTop=0;
		// fetch("/login.json")
		// .then(res=>res.json())
		// .then(data=>console.log(data))
		// .catch(err=>console.log("Something went wrong"))
		this.props.setLogout();
		this.setState({count:-1})
		axios.get('/session')
    .then(res=>{
				console.log("axios session");
        console.log(res);
        if(res.data!=="")
        {
					this.setState({count:0})
          this.props.unamePass(res.data)
        }
        else
        {
					this.setState({count:0})
          this.props.unamePass("")
        }
    })
    .catch(err=>alert("Something went wrong"))
	}
	logout()
  {
		this.props.logoutCheck();
    axios.get('/serverLogout')
    .then(res=>{
        console.log(res);
        if(res.data==="pass")
        {
          this.props.setUname("");
        }
    })
    .catch(err=>alert("Something went wrong"))
  }
	nav(e)
	{
		var elem=document.getElementsByClassName('fa fa-bars')[0].parentNode;
		if(window.getComputedStyle(elem,null).getPropertyValue('display')==='block')
		{
			console.log("bars");
			document.getElementsByClassName('fa fa-bars')[0].parentNode.style.display="none";
			document.getElementsByClassName('fa fa-times')[0].parentNode.style.display="block";
			$('.nav').show(400);
		}
		else if(window.getComputedStyle(elem,null).getPropertyValue('display')==='none')
		{
			console.log("times");
			document.getElementsByClassName('fa fa-bars')[0].parentNode.style.display="block";
			document.getElementsByClassName('fa fa-times')[0].parentNode.style.display="none";			
			$('.nav').hide(400);
		}
  }

	render()
	{
			if(store.getState().uname!==""&&this.state.count!==-1)
			{
				return(
					<div>
						<div className="mainHeader">
							<Hamburger>
								<i className="fa fa-bars" onClick={this.nav.bind(this)}></i>
							</Hamburger>
							<Close>
								<i className="fa fa-times" onClick={this.nav.bind(this)}></i>
							</Close>            
							<center><h1 className="mastermindHeading">MASTERMIND</h1></center><br/>
							<div className="nav">
								<span className="profile1">{this.props.uname}</span>
								<Link to="/login" className="btn"><i class="fa fa-home" aria-hidden="true"></i>&ensp;Home</Link>
								<Link to="/play" className="btn">Play game</Link>
								<Link to="/rules" className="btn">How to Play</Link>
								<button className="btn" onClick={this.logout.bind(this)}><i class="fa fa-sign-out" aria-hidden="true"></i>Logout</button>
							</div>
						</div>
						<div className="container">
						</div>
						<Footer/>
					</div>
				);
			}
			else if(store.getState().uname===""&&!this.props.logout&&this.state.count!==-1)
			{
				return(
					<ErrorPage/>
				)
			}
			else if(this.props.logout&&this.state.count!==-1)
			{
				return(
					<Login/>
				)
			}
			else
			{
				return(
					<Loading>
						<div>
							Loading...
						</div>
					</Loading>
				)
			}
	}

}

export default connect(mapStateToProps,mapDispatchToProps)(MMHome);

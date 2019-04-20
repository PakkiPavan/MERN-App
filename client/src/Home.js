import React from 'react';
import {mapStateToProps,mapDispatchToProps} from './MMStore';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import styled,{keyframes} from 'styled-components';
import axios from 'axios';
import Dashboard from './Dashboard';
import Footer from './Footer';
import '../node_modules/font-awesome/css/font-awesome.css';

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


class Home extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state={count:-1}
	}
	componentDidMount()
	{
		document.body.scrollTop=0;
		document.documentElement.scrollTop=0;
// to count number of users registered
		fetch('/countUsers')
		.then(res=>res.json())
		.then(data=>{
			this.props.setUsersCount(data.usersCount);
			this.setState({count:0})
		})
		.catch(err=>alert("Something went wrong"))
//for session
		axios.get('/session')
		.then(res=>{
				console.log(res.data);
				if(res.data!=="")
				{
					//this.setState({count:0})
					this.props.unamePass(res.data)
				}
				else
				{
					//this.setState({count:0})
					this.props.unamePass("")
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
		if(this.props.uname!=="")
		{
			return(
				<Dashboard />
			)
		}
		else if(this.state.count!==-1)
		{
			return(
				<div>
					<div className="mainHeader">
						{/*<div className="pavanLogo" onClick={this.nav.bind(this)}>
							<span className="pp">PP</span>
						</div>*/}
						<Hamburger>
							<i className="fa fa-bars" onClick={this.nav.bind(this)}></i>
						</Hamburger>
						<Close>
							<i className="fa fa-times" onClick={this.nav.bind(this)}></i>
						</Close>
						<div className="nav">
							<Link to="/register" className="btn">SignUp</Link>
							<Link to="/login" className="btn">Login</Link>
						</div>
					</div>
					<div className="container">
						<h1 className="hContent">{this.props.usersCount} users registered</h1>
					</div>
					<Footer/>
				</div>
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

export default connect(mapStateToProps,mapDispatchToProps)(Home);

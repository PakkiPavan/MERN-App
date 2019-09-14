import React from 'react';
import './MM.css';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import ErrorPage from './ErrorPage';
import Login from './Login';
import {mapStateToProps,mapDispatchToProps} from './MMStore';
import {connect} from 'react-redux';
//import {store} from './index';
import styled,{keyframes} from 'styled-components';
import axios from 'axios';
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

/*
At the beginning of each game the computer generates a secret code of four colors. <br/>
The colors are always chosen from the seven colors. Duplicates are not allowed.<br/>
The objective is to guess the secret code. You have to guess the colors and put them in the same order as they are in the secret code.<br/>
Choose four colors in the next available row and then click on the Check button. The computer will score your guess in the following way: <br/>
•For each guess that is right in both color and position you will get a green point <br/>
•For each guess that is right in color but not in position you will get a red point<br/>
You have ten chances to guess the correct code, if you exhaust all of them without guessing the code, you lost the game and the secret code will be displayed in the last row.<br/><br/>
&emsp;Good Luck!


*/
/*
	<p style={{textIndent:'1em',textAlign:'left'}}>At the beginning of each game a four color code will be generated.</p>
	<p style={{textIndent:'1em',textAlign:'left'}}>The colors are always chosen from the seven colors in the top row. Duplicates are not allowed.</p>
	<p style={{textIndent:'1em',textAlign:'left'}}>The objective is to guess the secret code. You have to guess the colors and put them in the same order as they are in the secret code.</p>
	<p style={{textIndent:'1em',textAlign:'left'}}>Choose one color among the seven colors from the top row (blinking color is current color).</p>
	<p style={{textIndent:'1em',textAlign:'left'}}>Place it in the circle of current row. After placing four colors, click on the <b>Check</b> button.</p>
	<p style={{textIndent:'1em',textAlign:'left'}}>Hints will be displayed in the small four circles after <b>Check</b> button in the following way:</p>
	<p style={{textIndent:'2em',textAlign:'left'}}>•For each guess if the color is correct and it is in correct position as in the secret code then you will get a green point.</p>
	<p style={{textIndent:'2em',textAlign:'left'}}>•For each guess if the color is correct and it is not in correct position as in secret code then you will get a red point.</p>
	<p style={{textIndent:'1em',textAlign:'left'}}>You have ten chances to guess the correct code, if you exhaust all of them without guessing the code, you lost the game and the secret code will be displayed in the last row.</p>
	<p>Good Luck!!</p>
*/

class Rules extends React.Component
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
		if(this.props.uname!==""&&this.state.count!==-1)
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
							<Link to="/mastermind" className="btn"><i class="fa fa-home" aria-hidden="true"></i>&ensp;Home</Link>
							<Link to="/play" className="btn">Play game</Link>
							<button className="btn" onClick={this.logout.bind(this)}><i class="fa fa-sign-out" aria-hidden="true"></i>Logout</button>
						</div>
					</div>

					<div className="rules">
						<b style={{fontSize:'25px'}}>How to play?</b>
						<ul>
							<li>At the beginning of each game a four color code will be generated.</li>
							<li>The colors are always chosen from the seven colors in the top row. Duplicates are not allowed.</li>
							<li>The objective is to guess the secret code. You have to guess the colors and put them in the same order as they are in the secret code.</li>
							<li>Choose one color among the seven colors from the top row (blinking color is current color).</li>
							<li>Place it in the circle of current row. After placing four colors, click on the <b>Check</b> button.</li>
							<li>Whenever the check button is clicked Green/Red colors will be displayed in the small four circles which are after the <b>Check</b> button in the following way:
								<ul>
									<li><b>Green color:</b>represents one of the colors what you have placed is there in the secret code and it is in correct position as in the secret code.</li>
									<li><b>Red color</b>:represents one of the colors what you have have placed is there in the secret code but it is not in correct position.</li>
								</ul>
							</li>
							<li>You have ten chances to guess the correct code, if you exhaust all of them without guessing the code, you lost the game and the secret code will be displayed in the last row.</li>
						</ul>
						<br></br>
						<center><b style={{fontSize:'25px'}}>Good Luck!!</b></center>
					</div>
					<Footer/>
				</div>
			)
		}
		else if(this.props.uname===""&&!this.props.logout&&this.state.count!==-1)
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


export default connect(mapStateToProps,mapDispatchToProps)(Rules);

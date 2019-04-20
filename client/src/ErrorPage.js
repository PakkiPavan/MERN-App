import React from 'react';
import {Link} from 'react-router-dom';
import './MM.css';
import $ from 'jquery';
import Footer from './Footer';
import styled from 'styled-components';

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

class ErrorPage extends React.Component
{
	componentDidMount()
	{
		document.body.scrollTop=0;
		document.documentElement.scrollTop=0;
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
			return(
				<div>
					<div className="mainHeader">
						<Hamburger>
							<i className="fa fa-bars" onClick={this.nav.bind(this)}></i>
						</Hamburger>
						<Close>
							<i className="fa fa-times" onClick={this.nav.bind(this)}></i>
						</Close>            
						<div className="nav">
							<Link to="/login" className="btn">Login</Link>
							<Link to="/register" className="btn">SignUp</Link>
						</div>
					</div>
					<div className="container">
						<h3 className="hContent">Access Denied<br/><Link to="/login" style={{color:'blue'}}>Login</Link> to access this page</h3>
					</div>
					<Footer/>
				</div>

			);
		}

}

export default ErrorPage;

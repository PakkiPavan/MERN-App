import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import './App.css';
import './MM.css';
import axios from 'axios';
import Footer from './Footer';
import '../node_modules/font-awesome/css/font-awesome.css';
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


class Registration extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state={count:0}
	}
	componentDidMount()
	{
		document.body.scrollTop=0;
    document.documentElement.scrollTop=0;
	}
	// emailValidation()
	// {
	// 	var mail=/^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/;
	// 	var email=document.getElementById('email').value;
	// 	if (mail.test(email)===false&&email!=='')
	// 		$('#format').show();
	// 	else
	// 		$('#format').hide();

	// }
	// passwordMatch()
	// {
	// 	var password=document.getElementById('password').value;
	// 	var cpassword=document.getElementById('cpassword').value;
	// 	if(password!==cpassword)
	// 		$('#match').show();
	// 	else
	// 		$('#match').hide();
	// }
	validations(e)
	{
		if(e.target.id==="email")
		{
			var mail=/^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/;
			var email=document.getElementById('email').value;
			// if (mail.test(email)===false&&email!=='')
			// 	$('#format').show();
			// else
			// 	$('#format').hide();	
			if (mail.test(email)===false&&email!=='')
			{
				$('#emailWarning').empty();
				$('#emailWarning').append('Enter valid Email ID');
				$('#emailWarning').show();
			}
			else
			{
				$('#emailWarning').empty();
			}
			
		}
		else if(e.target.id==="cpassword")
		{
			var password=document.getElementById('password').value;
			var cpassword=document.getElementById('cpassword').value;
			// if(password!==cpassword)
			// 	$('#match').show();
			// else
			// 	$('#match').hide();	
			if(password!==cpassword)
			{
				$('#cpasswordWarning').empty();
				$('#cpasswordWarning').append('Confirm password should match with password');
				$('#cpasswordWarning').show();
			}
			else
			{
				$('#cpasswordWarning').empty();
			}
		}
		else if(e.target.id==="uname")
		{
			//var unameFormat2=/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
			var uname=document.getElementById('uname').value;
			var unameFormat=/^[` !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
			var unameFormat2=/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
			//console.log(unameFormat2.test(uname))
			if(uname.length<4)
			{
				$('#unameWarning').empty();
				$('#unameWarning').append('Username should be atleast 4 charaters');
				$('#unameWarning').show();
			}
			else if(unameFormat.test(uname))
			{
				$('#unameWarning').empty();
				$('#unameWarning').append('Username should not start with special character');
				$('#unameWarning').show();
			}
			else if(unameFormat2.test(uname))
			{
				$('#unameWarning').empty();
				$('#unameWarning').append('Username should not contain special characters except space');
				$('#unameWarning').show();
			}
			else 
			{
				$('#unameWarning').empty();
			}
		}
		else if(e.target.id==="password")
		{
			password=document.getElementById('password').value;
			var specialFormat=/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
			var capitalFormat=/[A-Z]/;
			var smallFormat=/[a-z]/;
			var numericFormat=/[0-9]/;
			//console.log(specialFormat.test(password))
			if(!specialFormat.test(password))
			{
				$('#passwordWarning').empty();
				$('#passwordWarning').append('Password should contain atleast one special character');
				$('#passwordWarning').show();
			}
			else if(!capitalFormat.test(password))
			{
				$('#passwordWarning').empty();
				$('#passwordWarning').append('Password should contain atleast one capital letter');
				$('#passwordWarning').show();
			}
			else if(!smallFormat.test(password))
			{
				$('#passwordWarning').empty();
				$('#passwordWarning').append('Password should contain atleast one small letter');
				$('#passwordWarning').show();
			}
			else if(!numericFormat.test(password))
			{
				$('#passwordWarning').empty();
				$('#passwordWarning').append('Password should contain atleast one digit');
				$('#passwordWarning').show();
			}
			else
			{
				$('#passwordWarning').empty();
			}
		}
	}
	register(e)
	{
		console.log('registering')
		//var mail=/^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/;
		var uname=document.getElementById('uname').value;
		var email=document.getElementById('email').value;
		var password=document.getElementById('password').value;
		var cpassword=document.getElementById('cpassword').value;

		if(uname===""||email===""||password===""||cpassword==="")
			alert("All fields are mandatory")
		else
		{
			var count=0;
			var arr=[...document.getElementsByClassName('warning')];
			arr.map((ele)=>{
				if(ele.innerHTML==="")
					count++;
			})
			if(count===4)
			{
				axios.post('/serverRegister',{uname:uname,email:email,password:password})
				.then(res=>{
					console.log(res);
					$('#form').get(0).reset();
					$('#success').show();
				})
				.catch(err=>alert("Something went wrong"))
				// $.ajax({
				// 	type:'post',
				// 	url:'register',
				// 	data:
				// 	{
				// 		uname:uname,
				// 		email:email,
				// 		password:password
				// 	},
				// 	success:function(r)
				// 	{
				// 		console.log('SUCCESS');
				// 		console.log(r);
				// 		if(r==="Inserted")
				// 		{
				// 			$('#success').show();
				// 			//document.getElementById('#form').reset();
				// 			$('#form').get(0).reset();
				// 		}
				// 	},
				// 	error:function()
				// 	{
				// 		alert("Something went wrong");
				// 	}
				// })
				}
			}
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
		$(document).ready(function(){
			$('input').focus(function(){
				$('#success').hide();
			})
		})
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
									<Link to="/" className="btn"><i className="fa fa-home" aria-hidden="true"></i>&ensp;Home</Link>
									<Link to="/login" className="btn"><i className="fa fa-sign-in" aria-hidden="true"></i>&ensp;Login</Link>
								</div>
							</div>
							<div className="container">
								<div className="box">
										<h2>Create an account</h2>
										<form id="form" autoComplete="off">
											<div className="inputBox">
												<input type="text" name="uname" id="uname" required onBlur={this.validations.bind(this)}/>
												<label>USERNAME</label>
												<p id="unameWarning" className="warning" style={{display:'none',color:'red'}}></p>
											</div>
											<div className="inputBox">
												<input type="text" name="email" id="email" required onBlur={this.validations.bind(this)} required/>
												<label>EMAIL</label>
												<p id="emailWarning" className="warning" style={{display:'none',color:'red'}}></p>
											</div>
											<div className="inputBox">
												<input type="password" name="password" id="password" required onBlur={this.validations.bind(this)}/>
												<label>PASSWORD</label>
												<p id="passwordWarning" className="warning" style={{display:'none',color:'red'}}></p>
											</div>
											<div className="inputBox">
												<input type="password" name="cpassword" id="cpassword" required onBlur={this.validations.bind(this)}/>
												<label>CONFIRM PASSWORD</label>
												<p id="cpasswordWarning" className="warning" style={{display:'none',color:'red'}}></p>
											</div>
											<div className="btnDiv">
												<button type="button" className="btnSubmit" onClick={this.register.bind(this)}>REGISTER</button>
											</div>
												<p id="success">Registration Completed Successfully<br/>Click <Link to="/login" style={{color:'blue'}}>here</Link> to Login</p>
										</form>
								</div>
							</div>
							<Footer/>
				</div>
			)
	}
}

export default Registration;

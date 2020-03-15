import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import './App.css';
import axios from 'axios';
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
	emailValidation()
	{
		var mail=/^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/;
		var email=document.getElementById('email').value;
		if (mail.test(email)===false&&email!=='')
			$('#format').show();
		else
			$('#format').hide();

	}
	passwordMatch()
	{
		var password=document.getElementById('password').value;
		var cpassword=document.getElementById('cpassword').value;
		if(password!==cpassword)
			$('#match').show();
		else
			$('#match').hide();
	}
	register(e)
	{
		// console.log('registering')
		var mail=/^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/;
		var uname=document.getElementById('uname').value;
		var email=document.getElementById('email').value;
		var password=document.getElementById('password').value;
		var cpassword=document.getElementById('cpassword').value;


		if(uname===""||email===""||password===""||cpassword==="")
			alert("All fields are mandatory")
		else
		{

			if (mail.test(email)===false)
				$('#format').show();
			else
			{
				if(password!==cpassword)
				{
					$('#match').show();
				}
				else
				{
					$('#match').hide();
					$('#format').hide();
					axios.post('/serverRegister',{uname:uname,email:email,password:password})
					.then(res=>{
						// console.log(res);
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
	}
	nav()
	{
		$('.nav').toggle(400);
	}
	render()
	{
		$(document).ready(function(){
			$('input').focus(function(){
				$('#success').hide();
			})
		})
			return(
				<div className="container1">
							<div className="mainHeader">
								<div className="pavanLogo" onClick={this.nav.bind(this)}>
									<span className="pp">PP</span>
								</div>
								<div className="nav">
									<Link to="/"><button className="customBtn">Home</button></Link>
									<Link to="/login"><button className="customBtn">Login</button></Link>
								</div>
							</div>
							<div className="box">
								<h1>Create an account</h1>
									<form id="form" autoComplete="off">
										<div className="inputBox">
											<input type="text" name="uname" id="uname" required/>
											<label>USERNAME</label>
										</div>
										<div className="inputBox">
											<input type="text"name="email" id="email" required onBlur={this.emailValidation.bind(this)} required/>
											<label>EMAIL</label>
											<p id="format" className="warning" style={{display:'none',color:'red',marginLeft:'30%'}}>Enter vaid Email ID</p>
										</div>
										<div className="inputBox">
											<input type="password" name="password" id="password" required/>
											<label>PASSWORD</label>
										</div>
										<div className="inputBox">
											<input type="password" name="cpassword" id="cpassword" required onBlur={this.passwordMatch.bind(this)}/>
											<label>CONFIRM PASSWORD</label>
											<p id="match" className="warning" style={{display:'none',color:'red'}}>Confirm password should match with password</p>
										</div>
										<div style={{position:'relative'}}>
											<p id="success">Registration Completed Successfully<br/>Click <Link to="/login" style={{color:'blue'}}>here</Link> to Login</p>
											<button type="button" className="customBtn submit" onClick={this.register.bind(this)}>REGISTER</button>
										</div>
									</form>
							</div>
							<div className="footer">
								<p className="copyrights">&copy; Copyrights Pakki Pavan 2019</p>
							</div>
				</div>
			)
	}
}

export default Registration;

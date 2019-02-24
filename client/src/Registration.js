import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import './App.css';
class Registration extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state={count:0}
	}
	componentDidMount()
	{
		console.log("HIIIIIIII");
		this.setState({count:this.state.count+1},()=>console.log(this.state.count))
	}
	emailValidation()
	{
		var mail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
	register()
	{
		console.log('registering')
		var mail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		var fname=document.getElementById('fname').value;
		var email=document.getElementById('email').value;
		var password=document.getElementById('password').value;
		var cpassword=document.getElementById('cpassword').value;


		if(fname===""||email===""||password===""||cpassword==="")
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
				else {
					$('#match').hide();
					$('#format').hide();
					$.ajax({
						type:'post',
						url:'register',
						data:
						{
							fname:fname,
							email:email,
							password:password
						},
						success:function(r)
						{
							console.log('SUCCESS');
							console.log(r);
							if(r==="Inserted")
							{
								$('#success').show();
								//document.getElementById('#form').reset();
								$('#form').get(0).reset();
							}
						},
						error:function()
						{
							alert("Something went wrong");
						}
					})
				}

				}


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
				<div className="container">
						<Link to="/">Home</Link>
							<div className="box">
								<h1>Create an account</h1>
									<form id="form" autoComplete="off">
										<div className="inputBox">
											<input type="text" name="fname" id="fname" required/>
											<label>USERNAME</label>
										</div>
										<div className="inputBox">
											<input type="text"name="email" id="email" required onBlur={this.emailValidation.bind(this)} required/>
											<label>EMAIL</label>
											<p id="format" style={{display:'none',color:'red'}}>Enter vaid Email ID</p>
										</div>
										<div className="inputBox">
											<input type="password" name="password" id="password" required/>
											<label>PASSWORD</label>
										</div>
										<div className="inputBox">
											<input type="password" name="cpassword" id="cpassword" required onBlur={this.passwordMatch.bind(this)}/>
											<label>CONFIRM PASSWORD</label>
											<p id="match" style={{display:'none',color:'red'}}>Confirm password should match with password</p>
										</div>
										<div className="btn">
											<button type="button" onClick={this.register.bind(this)}>REGISTER</button>
											<p id="success">Registration Completed Successfully</p>
										</div>
									</form>
							</div>
				</div>
			)


	}
}

export default Registration;

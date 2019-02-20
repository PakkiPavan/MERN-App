import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';

class Registration extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state={fname:"",email:"",password:""}
	}
	validate()
	{
		
	}
	register()
	{
		var password=document.getElementById('password').value;
		var cpassword=document.getElementById('cpassword').value;
		console.log('registering')
		if(password!==cpassword)
		{
			$('#match').show();
		}
		else
		{
			var fname=document.getElementById('fname').value;
			var email=document.getElementById('email').value;
			
			$('#match').hide();
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
					}
				},
				error:function()
				{
					alert("Something went wrong");
				}
				
			})
		}
	}
	render()
	{
		return(
			<div>
				<Link to="/">Home</Link>
				<form>
					<input type="text" name="fname" id="fname" required placeholder="Enter name" /><br/>
					<input type="text" name="email" id="email" required placeholder="Enter email" /><br/>
					<input type="password" name="password" id="password" required placeholder="Enter password" /><br/>
					<p id="match" style={{display:'none',color:'red'}}>Confirm password should match with password</p>
					<input type="password" name="cpassword" id="cpassword" required placeholder="Enter password"/><br/>
					
					<input type="button" value="Register" onClick={this.register.bind(this)}/>
					<p id="success" style={{display:'none'}}>Registration Completed Successfully</p>
				</form>
			</div>
		)
	}
}

export default Registration;
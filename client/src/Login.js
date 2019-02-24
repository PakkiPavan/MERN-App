import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
class Login extends React.Component
{
  constructor(props)
  {
    super(props);
  }
  login()
  {
    console.log("Logging in");
    var uname=document.getElementById('uname').value;
    var password=document.getElementById('password').value;
    if(uname===""||password==="")
      alert("All fields are mandatory");
    else {
      $.ajax({
        url:'login',
        type:'post',
        data:{
          uname:uname,
          password:password
        },
        success:function(r)
        {
          console.log("SUCCESS");
          console.log(r);
          if(r.length>0)
          {
              console.log("pass")
          }
          //window.location="/login";
        },
        error:function()
        {
          alert("Something went wrong");
        }
      })
    }
  }
  render(){
    return(
      <div className="container">
          <Link to="/">Home</Link>
            <div className="box">
              <h1>Login</h1>
                <form id="form" autoComplete="off">
                  <div className="inputBox">
                    <input type="text" name="uname" id="uname" required/>
                    <label>USERNAME</label>
                  </div>
                  <div className="inputBox">
                    <input type="password" name="password" id="password" required/>
                    <label>PASSWORD</label>
                  </div>
                  <div className="btn">
                    <button type="button" onClick={this.login.bind(this)}>LOGIN</button>
                  </div>
                </form>
            </div>
      </div>

    )
  }
}

export default Login;

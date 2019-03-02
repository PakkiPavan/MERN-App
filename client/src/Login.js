import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import Dashboard from './Dashboard';

class Login extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={home:false,uname:''}
  }
  login()
  {
    console.log("Logging in");
    var uname=document.getElementById('uname').value;
    var password=document.getElementById('password').value;
    if(uname===""||password==="")
      alert("All fields are mandatory");
    else
    {
      axios.post('/login',{uname:uname,password:password})
      .then(res=>{
        console.log(res.data);
        if(res.data.length>0)
        {
          this.setState({home:!this.state.home,uname:res.data[0].uname})
        }
      })
      .catch(err=>alert("Something went wrong"))
      // $.ajax({
      //   url:'login',
      //   type:'post',
      //   data:{
      //     uname:uname,
      //     password:password
      //   },
      //   success:function(r)
      //   {
      //     console.log("SUCCESS");
      //     console.log(r);
      //     if(r.length>0)
      //     {
      //         console.log("pass")
      //         //window.location="/home";
      //     }
      //     else
      //     {
      //         console.log("fail")
      //     }
      //     //window.location="/login";
      //   },
      //   error:function()
      //   {
      //     alert("Something went wrong");
      //   }
      // })
    }
  }
  render(){
    if(!this.state.home)
    {
      return(
        <div className="container">
            <Link to="/"><button className="button">Home</button></Link>
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
      );
    }
    else
    {
      return(
        <div>
          <Dashboard uname={this.state.uname}/>
        </div>
      );
    }
  }
}

export default Login;

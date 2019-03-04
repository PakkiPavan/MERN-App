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
    this.state={pass:false,uname:''}
  }
  componentDidMount()
  {
    axios.get('/session')
    .then(res=>{
        console.log(res.data);
        if(res.data!=="")
          this.setState({pass:true,uname:res.data})
    })
    .catch(err=>alert("Something went wrong"))
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
          this.setState({pass:!this.state.pass,uname:res.data[0].uname})
        }
        else
        {
          $('#fail').show();
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
  nav()
	{
		$('.nav').toggle(400);
	}
  render()
  {
    var self=this;
    $(document).ready(function(){
      console.log("pass is",self.state.pass);
      $('input').focus(function(){
        $('#fail').hide();
      })
    })
    if(!this.state.pass)
    {
      return(
        <div className="container">
          <div className="mainHeader">
            <div className="pavanLogo" onClick={this.nav.bind(this)}>
              <span className="pp">PP</span>
            </div>
            <div className="nav">
              <Link to="/"><button className="btn">Home</button></Link>
              <Link to="/register"><button className="btn">SignUp</button></Link>
            </div>
          </div>
              <div className="box login">
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
                    <div style={{position:'relative'}}>
                      <p id="fail">Invalid Credentials</p>
                      <button type="button" className="btn submit" onClick={this.login.bind(this)}>LOGIN</button>
                    </div>
                  </form>
              </div>
              <div className="footer">
        				<p className="copyrights">&copy; Copyrights Pakki Pavan 2019</p>
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

import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import Dashboard from './Dashboard';
import {mapStateToProps,mapDispatchToProps} from './MMStore';
import {connect} from 'react-redux';
import {store} from './index';
import styled,{keyframes} from 'styled-components';

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

class Login extends React.Component
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

    // console.log(this.props.history);
    // console.log("Current uname in LOGIN is ",store.getState().uname);
    // store.subscribe(()=>{
    // 	console.log("Current state in LOGIN is",store.getState().color)
    // })
    this.setState({count:-1})
    // console.log("Login");
    axios.get('/session')
    .then(res=>{
        // console.log(res.data);
        if(res.data!=="")
        {
          //this.setState({pass:true,uname:res.data})
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
  login()
  {
    // console.log("Logging in");
    var uname=document.getElementById('uname').value;
    var password=document.getElementById('password').value;
    if(uname===""||password==="")
      alert("All fields are mandatory");
    else
    {
      axios.post('/serverLogin',{uname:uname,password:password})
      .then(res=>{
        // console.log(res.data);
        if(res.data.length>0)
        {
          //this.setState({pass:!this.state.pass,uname:res.data[0].uname})
          //this.props.unameCheck(res.data[0].uname)
          this.props.setUname(res.data[0].uname);
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
  // scroll()
  // {
  //   //console.log(document.body.scrollTop);
  //   //console.log(document.documentElement.scrollTop);
  //   document.documentElement.scrollTop=0;
  // }
  render()
  {
    //var self=this;
    $(document).ready(function(){
      document.body.scrollTop=0;
      document.documentElement.scrollTop=0;
      $('input').focus(function(){
        $('#fail').hide();
      })
    })

    if(store.getState().uname===''&&this.state.count!==-1)
    {
      //console.log("logout after logout "+this.props.logout);
      return(
        <div className="container1" id="container">
          <h1 id="#top">Hello</h1>
          <div className="mainHeader">
            <div className="pavanLogo" onClick={this.nav.bind(this)}>
              <span className="pp">PP</span>
            </div>
            <div className="nav">
              <Link to="/"><button className="customBtn">Home</button></Link>
              <Link to="/register"><button className="customBtn">SignUp</button></Link>
            </div>
          </div>
              <div className="box login" id="loginBox">
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
                      <button type="button" className="customBtn submit" onClick={this.login.bind(this)}>LOGIN</button>
                    </div>
                  </form>
              </div>
              <div className="footer" id="#footer">
        				<p className="copyrights">&copy; Copyrights Pakki Pavan 2019</p>
        			</div>
        </div>
      );
    }
    else if(store.getState().uname!==''&&this.state.count!==-1)
    {
      return(
        <div>
          <Dashboard/>
        </div>
      );
    }
    else
    {
      return(
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
					<i className="fa fa-spinner fa-spin" style={{fontSize:"40px"}}></i>
					{/*
					<Loading>
					<div className="load">
						Loading...
					</div>
					</Loading>*/}
				</div>
      )
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);

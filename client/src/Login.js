import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import Dashboard from './Dashboard';
import {mapStateToProps,mapDispatchToProps} from './MMStore';
import {connect} from 'react-redux';
import {store} from './index';
import styled,{keyframes} from 'styled-components';
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

class Login extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={count:-1,uname:''}
  }
  componentDidMount()
  {
    document.body.scrollTop=0;
    document.documentElement.scrollTop=0;
    console.log(this.props.history);
    console.log("Current uname in LOGIN is ",store.getState().uname);
    // store.subscribe(()=>{
    // 	console.log("Current state in LOGIN is",store.getState().color)
    // })
    this.setState({count:-1})
    console.log("Login");
    axios.get('/session')
    .then(res=>{
        console.log(res.data);
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
    console.log("Logging in");
    var uname=document.getElementById('uname').value;
    var password=document.getElementById('password').value;
    if(uname===""||password==="")
      alert("All fields are mandatory");
    else
    {
      
			//document.getElementById('uname').value=this.props.uname;
      axios.post('/serverLogin',{uname:uname,password:password})
      .then(res=>{
        console.log(res.data);
        if(res.data.length>0)
        {
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
  keyPress(e)
  {
    if(e.which===13)
    {
      this.login();
    }
  }
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
        <div className="container" id="container">
          <div className="mainHeader">
              <Hamburger>
								<i className="fa fa-bars" onClick={this.nav.bind(this)}></i>
							</Hamburger>
							<Close>
								<i className="fa fa-times" onClick={this.nav.bind(this)}></i>
							</Close>            
            <div className="nav">
              <Link to="/" className="btn"><i class="fa fa-home" aria-hidden="true"></i>&ensp;Home</Link>
              <Link to="/register" className="btn"><i class="fa fa-user-plus" aria-hidden="true"></i>&ensp;SignUp</Link>
            </div>
          </div>
          <div className="container">
            <div className="box" id="loginBox">
              <h1>Login</h1>
                <form id="form" autoComplete="off">
                  <div className="inputBox">
                    <input type="text" name="uname" id="uname" onKeyPress={this.keyPress.bind(this)} required/>
                    <label>USERNAME</label>
                  </div>
                  <div className="inputBox">
                    <input type="password" name="password" id="password" onKeyPress={this.keyPress.bind(this)} required/>
                    <label>PASSWORD</label>
                  </div>
                  <div className="btnDiv">
											<button type="button" className="btnSubmit" onClick={this.login.bind(this)}>LOGIN</button>
									</div>
                  <p id="fail" className="warning">Invalid Credentials</p>
                </form>
            </div>
          </div>
          <Footer/>
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
        <Loading>
          <div className="load">
            Loading...
          </div>
        </Loading>
      )
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);

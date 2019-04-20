import React from 'react';
import {Link} from 'react-router-dom';
import {mapStateToProps,mapDispatchToProps} from './MMStore';
import {connect} from 'react-redux';
import axios from 'axios';
//import Login from './Login';
import $ from 'jquery';
import Footer from './Footer';
//import {store} from './index';
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

class Dashboard extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={logout:false}
  }
  componentDidMount()
  {
    console.log("Dashboard");
    //console.log(this.props.logout);
    console.log(this.props.uname);
  }
  logout()
  {
    axios.get('/serverLogout')
    .then(res=>{
        console.log(res);
        if(res.data==="pass")
        {
          //this.setState({logout:!this.state.logout})
          //this.props.logoutCheck();
          //this.props.unameCheck('');
          this.props.setUname("");

        }
        //console.log("uname after logout "+store.getState().uname);
    })
    .catch(err=>alert("Something went wrong"))
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

  render(){
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
							<span className="profile1">{this.props.uname}</span>
              <Link to="/mastermind" className="btn">Mastermind</Link>
              <button className="btn" onClick={this.logout.bind(this)}><i class="fa fa-sign-out" aria-hidden="true"></i>Logout</button>
            </div>
          </div>
          <div className="container">
          </div>
          <Footer/>
        </div>
      );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);

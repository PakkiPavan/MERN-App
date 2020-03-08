import React from 'react';
import {mapStateToProps,mapDispatchToProps} from './MMStore';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import styled,{keyframes} from 'styled-components';
import axios from 'axios';
import Dashboard from './Dashboard';

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


class Home extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state={count:-1}
	}
	componentDidMount()
	{
		document.body.scrollTop=0;
		document.documentElement.scrollTop=0;
// to count number of users registered
		fetch('/countUsers')
		.then(res=>res.json())
		.then(data=>{
			this.props.setUsersCount(data.usersCount);
			this.setState({count:0})
		})
		.catch(err=>alert("Something went wrong"))
//for sesion
		axios.get('/session')
		.then(res=>{
				console.log(res.data);
				if(res.data!=="")
				{
					//this.setState({count:0})
					this.props.unamePass(res.data)
				}
				else
				{
					//this.setState({count:0})
					this.props.unamePass("")
				}
		})
		.catch(err=>alert("Something went wrong"))

	}
	nav()
	{
		$('.nav').toggle(400);
	}
	render()
	{
		if(this.props.uname!=="")
		{
			return(
				<Dashboard />
			)
		}
		else if(this.state.count!==-1)
		{
			return(
				<div>
					<div className="mainHeader">
						<div className="pavanLogo" onClick={this.nav.bind(this)}>
							<span className="pp">PP</span>
						</div>
						<div className="nav">
							<Link to="/register"><button className="customBtn">SignUp</button></Link>
							<Link to="/login"><button className="customBtn">Login</button></Link>
							<Link to="/codeforces"><button className="customBtn">Codeforces</button></Link>
							{/* <Link to="/spotify"><button className="customBtn">Spotify</button></Link> */}
							<Link to="/youtube"><button className="customBtn">Youtube</button></Link>
						</div>
					</div>
					<div className="error">
						<h1 className="hContent">{this.props.usersCount} users registered</h1>
					</div>
					<div className="footer">
						<p className="copyrights">&copy; Copyrights Pakki Pavan 2019</p>
					</div>
				</div>
			)
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

export default connect(mapStateToProps,mapDispatchToProps)(Home);

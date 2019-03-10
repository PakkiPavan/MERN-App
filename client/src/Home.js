import React from 'react';
import {mapStateToProps,mapDispatchToProps} from './MMStore';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import $ from 'jquery';
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

		fetch('/countUsers')
		.then(res=>res.json())
		.then(data=>{
			this.props.setUsersCount(data.usersCount);
			this.setState({count:0})
		})
		.catch(err=>alert("Something went wrong"))
	}
	nav()
	{
		$('.nav').toggle(400);
	}
	render()
	{
		if(this.state.count!==-1)
		{
			return(
			<div>
				<div className="mainHeader">
					<div className="pavanLogo" onClick={this.nav.bind(this)}>
						<span className="pp">PP</span>
					</div>
					<div className="nav">
						<Link to="/register"><button className="btn">SignUp</button></Link>
						<Link to="/login"><button className="btn">Login</button></Link>
					</div>
				</div>
				<div className="error">
					<h1>{this.props.usersCount} users registered</h1>
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
				<Loading>
					<div>
						Loading...
					</div>
				</Loading>
			)
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);

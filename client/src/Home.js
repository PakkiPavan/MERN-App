import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';

class Home extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state={}
	}
	componentDidMount()
	{
		document.body.scrollTop=0;
		document.documentElement.scrollTop=0;

	}
	nav()
	{
		$('.nav').toggle(400);
	}
	render()
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
					<Link to="/MMHome"><button className="btn">Mastermind</button></Link>
				</div>
			</div>

			<div className="footer">
				<p className="copyrights">&copy; Copyrights Pakki Pavan 2019</p>
			</div>
		</div>
		)
	}
}

export default Home;

import React from 'react';
import {Link} from 'react-router-dom';
import './MM.css';
import $ from 'jquery';

class MMHome extends React.Component
{
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
					<center><h1 className="mastermindHeading">MASTERMIND</h1></center><br/>
					<div className="nav">
						<Link to="/play"><button className="btn">Play game</button></Link>
						<Link to="/rules"><button className="btn">How to Play</button></Link>
					</div>
				</div>

				<div className="footer">
					<p className="copyrights">&copy; Copyrights Pakki Pavan 2019</p>
				</div>
			</div>

		);
	}
}

export default MMHome;

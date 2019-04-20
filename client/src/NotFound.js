import React from 'react';
import {Link} from 'react-router-dom';
import './MM.css';
import $ from 'jquery';
import Footer from './Footer';

class NotFound extends React.Component
{
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
								<Link to="/login"><button className="btn">Login</button></Link>
						</div>
					</div>
					<div className="error">
						<h3 className="hContent">The page you are looking is Not Found</h3>
					</div>
					<Footer/>
				</div>

			);
		}

}

export default NotFound;

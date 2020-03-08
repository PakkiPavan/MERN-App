import React from 'react';
import {Link} from 'react-router-dom';
import './MM.css';
import $ from 'jquery';

class ErrorPage extends React.Component
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
								<Link to="/login"><button className="customBtn">Login</button></Link>
						</div>
					</div>
					<div className="error">
						<h3 className="hContent">Access Denied<br/><Link to="/login" style={{color:'blue'}}>Login</Link> to access this page</h3>
					</div>
					<div className="footer">
						<p className="copyrights">&copy; Copyrights Pakki Pavan 2019</p>
					</div>
				</div>

			);
		}

}

export default ErrorPage;

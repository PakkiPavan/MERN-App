import React from 'react';
import {Link} from 'react-router-dom';

class Home extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state={}
	}

	render()
	{
		return(
		<div>
			<div className="mainHeader">
				<Link to="/register"><button className="btn">SignUp</button></Link><br/>
				<Link to="/login"><button className="btn">Login</button></Link><br/>
				<Link to="/MMHome"><button className="btn">Mastermind</button></Link><br/>
			</div>
			<div className="footer">
				<p className="copyrights">&copy; Copyrights Pakki Pavan 2019</p>
			</div>
		</div>
		)
	}
}

export default Home;

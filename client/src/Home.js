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
			<Link to="/register"><button className="button">SignUp</button></Link><br/>
			<Link to="/login"><button className="button">Login</button></Link><br/>
		</div>
		)
	}
}

export default Home;

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
			<Link to="/register">Register here</Link><br/>
			<Link to="/login">Login here</Link><br/>
			<Link to="/like">Like</Link>
			
		</div>	
		)
	}
}

export default Home;
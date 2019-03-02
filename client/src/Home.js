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
			<Link to="/register"><div className="btn"><button>SignUp</button></div></Link><br/>
			<Link to="/login"><div className="btn"><button>Login</button></div></Link><br/>
		</div>
		)
	}
}

export default Home;

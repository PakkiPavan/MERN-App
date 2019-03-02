import React from 'react';
import {BrowserRouter,Route,Link} from 'react-router-dom';
import './MM.css';

class MMHome extends React.Component
{
	render()
	{
		return(
			<div>
				<Link to="/play"><button className="btn">Play game</button><br/></Link>
				<Link to="/rules"><button className="btn">How to Play</button><br/></Link>

				<p className="copyrights">&copy; Copyrights Pavan Pakki 2019</p>
			</div>

		);
	}
}

export default MMHome;

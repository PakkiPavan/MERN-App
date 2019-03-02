import React from 'react';
import {BrowserRouter,Route,Link} from 'react-router-dom';
import './MM.css';

class MMHome extends React.Component
{
	render()
	{
		return(
			<div>
				<button className="btn"><Link to="/play">Play game</Link></button><br/>
				<button className="btn"><Link to="/rules">How to Play</Link></button><br/>

				<p className="copyrights">&copy; Copyrights Pavan Pakki 2019</p>
			</div>

		);
	}
}

export default MMHome;

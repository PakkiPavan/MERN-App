import React from 'react';
import {Link} from 'react-router-dom';
import './MM.css';

class MMHome extends React.Component
{
	render()
	{
		return(
			<div>
				<center><h1 style={{color:'#9c258d',fontWeight:'900',fontFamily:"-webkit-body"}}>MASTERMIND</h1></center><br/>
				<button className="btn"><Link to="/play">Play game</Link></button><br/>
				<button className="btn"><Link to="/rules">How to Play</Link></button><br/>

				<div className="footer">
					<p className="copyrights">&copy; Copyrights Pakki Pavan 2019</p>
				</div>
			</div>

		);
	}
}

export default MMHome;

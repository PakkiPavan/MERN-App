import React from 'react';
import './MM.css';
import {Link} from 'react-router-dom';
/*
At the beginning of each game the computer generates a secret code of four colors. <br/>
The colors are always chosen from the seven colors. Duplicates are not allowed.<br/>
The objective is to guess the secret code. You have to guess the colors and put them in the same order as they are in the secret code.<br/>
Choose four colors in the next available row and then click on the Check button. The computer will score your guess in the following way: <br/>
•For each guess that is right in both color and position you will get a green point <br/>
•For each guess that is right in color but not in position you will get a red point<br/>
You have ten chances to guess the correct code, if you exhaust all of them without guessing the code, you lost the game and the secret code will be displayed in the last row.<br/><br/>
&emsp;Good Luck!


*/
/*
	<p style={{textIndent:'1em',textAlign:'left'}}>At the beginning of each game a four color code will be generated.</p>
	<p style={{textIndent:'1em',textAlign:'left'}}>The colors are always chosen from the seven colors in the top row. Duplicates are not allowed.</p>
	<p style={{textIndent:'1em',textAlign:'left'}}>The objective is to guess the secret code. You have to guess the colors and put them in the same order as they are in the secret code.</p>
	<p style={{textIndent:'1em',textAlign:'left'}}>Choose one color among the seven colors from the top row (blinking color is current color).</p>
	<p style={{textIndent:'1em',textAlign:'left'}}>Place it in the circle of current row. After placing four colors, click on the <b>Check</b> button.</p>
	<p style={{textIndent:'1em',textAlign:'left'}}>Hints will be displayed in the small four circles after <b>Check</b> button in the following way:</p>
	<p style={{textIndent:'2em',textAlign:'left'}}>•For each guess if the color is correct and it is in correct position as in the secret code then you will get a green point.</p>
	<p style={{textIndent:'2em',textAlign:'left'}}>•For each guess if the color is correct and it is not in correct position as in secret code then you will get a red point.</p>
	<p style={{textIndent:'1em',textAlign:'left'}}>You have ten chances to guess the correct code, if you exhaust all of them without guessing the code, you lost the game and the secret code will be displayed in the last row.</p>
	<p>Good Luck!!</p>
*/

class Rules extends React.Component
{
	render()
	{
		return(
			<div className="rules">
				<button className="btn"><Link to="/MMHome">Home</Link></button>&nbsp;
				<button className="btn"><Link to="/play">Play game</Link></button><br/>

				<b style={{fontSize:'20px'}}>How to play?</b>
				<ul>
					<li>At the beginning of each game a four color code will be generated.</li>
					<li>The colors are always chosen from the seven colors in the top row. Duplicates are not allowed.</li>
					<li>The objective is to guess the secret code. You have to guess the colors and put them in the same order as they are in the secret code.</li>
					<li>Choose one color among the seven colors from the top row (blinking color is current color).</li>
					<li>Place it in the circle of current row. After placing four colors, click on the <b>Check</b> button.</li>
					<li>Whenever the check button is clicked Green/Red colors will be displayed in the small four circles which are after the <b>Check</b> button in the following way:
						<ul>
							<li><b>Green color:</b>represents one of the colors what you have placed is there in the secret code and it is in correct position as in the secret code.</li>
							<li><b>Red color</b>:represents one of the colors what you have have placed is there in the secret code but it is not in correct position.</li>
						</ul>
					</li>
					<li>You have ten chances to guess the correct code, if you exhaust all of them without guessing the code, you lost the game and the secret code will be displayed in the last row.</li>
				</ul>
				<center><b style={{fontSize:'20px'}}>Good Luck!!</b></center>

				<div className="footer">
					<p className="copyrights">&copy; Copyrights Pakki Pavan 2019</p>
				</div>
			</div>
		)
	}
}


export default Rules;

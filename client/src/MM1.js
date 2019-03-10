import React from 'react';
import './MM.css';
import {connect} from 'react-redux';
import {mapStateToProps,mapDispatchToProps} from './MMStore';
//import styled from 'styled-components';
import $ from 'jquery';
import {Link} from 'react-router-dom';

class MM1 extends React.Component
{
	componentWillMount()
	{
		document.body.scrollTop=0;
		document.documentElement.scrollTop=0;

		this.props.initialState();
		var u=[]
		while(u.length<4)
		{
			var rn=Math.floor(Math.random()*7);
			if(u.indexOf(rn)===-1)
				u.push(rn)
		}

		var code=[]
		for(var i=0;i<u.length;i++)
		{
			code.push(this.props.colors[u[i]])
		}
		this.props.assignCode(code);
		//console.log(code)
		/*var board=document.getElementById('board')
		for(i=0;i<4;i++)
		{
			board.childNodes[board.childNodes.length-1].childNodes[i].style.backgroundColor=this.props.code[i]
		}*/
		//console.log()
	}
	change(e)
	{
		//console.log("HIIIIII")
		//var x=document.getElementById(e.target.id);
		//x.style.backgroundColor=this.props.color;
		//console.log(x.style)
		var board=document.getElementById("board");
		//console.log(e.target.id);
		var c=0;

		//console.log(board.childNodes[this.props.index-1].childNodes[e.target.id[1]-1])
		if(e.target.id.length===2)
		{
			board.childNodes[this.props.index-1].childNodes[e.target.id[1]-1].style.backgroundColor=this.props.color;
		}
		else
		{
			board.childNodes[this.props.index-1].childNodes[e.target.id[2]-1].style.backgroundColor=this.props.color;
		}
		for(var i=0;i<4;i++)
		{
			if(board.childNodes[this.props.row].childNodes[i].style.backgroundColor==="")
			{
				c++;
			}
		}
		if(c===0)
		{
			//console.log("c=0")
			if(this.props.flag)
			{
				this.props.enableCheck()
				this.props.setFlag()
			}

		}

	}
	enable(e)
	{
		var board=document.getElementById("board");
		//
			var t=[]
			for(var i=this.props.code.length-1;i>=this.props.code.length-4;i--)
			{
				t.push(this.props.code[i])
			}
			t.reverse();
			//console.log("t")
			//console.log(t)

		//
		var temp=[]
		for(i=0;i<4;i++)
		{
			temp.push(board.childNodes[this.props.index-1].childNodes[i].style.backgroundColor);
		}
		var u=[]
		for(i=0;i<4;i++)
		{
			if(u.indexOf(board.childNodes[this.props.index-1].childNodes[i].style.backgroundColor)===-1)
			{
				u.push(board.childNodes[this.props.index-1].childNodes[i].style.backgroundColor);
			}

		}
		if(temp.length!==u.length)
			alert("Duplicate colors not allowed")
		else
		{
			//console.log("this.props.index")
			//console.log(this.props.index-1)
			if(this.props.index!==11)
			{
				board.childNodes[this.props.index].style.pointerEvents="auto";
				board.childNodes[this.props.index-1].style.pointerEvents="none";
				this.props.enableCheck();
				this.props.incIndex();
				this.props.incRow();
				this.props.setFlag();
			}
			var cp=0,cc=0;
			for(i=0;i<4;i++)
			{
				if(this.props.code[i]===board.childNodes[this.props.index-1].childNodes[i].style.backgroundColor)
					cp++;
				else if(this.props.code.includes(board.childNodes[this.props.index-1].childNodes[i].style.backgroundColor))
					cc++;
			}

			//console.log(`cp=${cp} cc=${cc}`)
			if(cp===4)
			{
				alert(`You won the game in ${this.props.index-1} attempts`)
				//window.location="http://localhost:3000/";
				//window.location="https://mastermind-board-game.herokuapp.com";
				//window.location="https://mastermind-game.netlify.com/";
				//window.location="/MMHome";
			}

			else
			{
				if(this.props.index!==11)
				{
					for(i=0;i<cp;i++)
					{
						board.childNodes[this.props.index-1].childNodes[5].childNodes[i].style.backgroundColor="green"
					}
					for(i=cp;i<cp+cc;i++)
					{
						board.childNodes[this.props.index-1].childNodes[5].childNodes[i].style.backgroundColor="red"
					}
				}
				else
				{
					this.lose();
				}

			}
		}

	}
	lose()
	{
		this.props.remQuestion();
		var board=document.getElementById('board')
		for(var i=0;i<4;i++)
		{
			board.childNodes[board.childNodes.length-1].childNodes[i].style.backgroundColor=this.props.code[i]
		}
		alert("Game Over")
		alert("Secret code is displayed in the last row")
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
					<center><h1 className="mastermindHeading">MASTERMIND</h1></center><br/>
					<div className="nav">
						<Link to="/mastermind"><button className="btn">Home</button></Link>
						<Link to="/rules"><button className="btn">How to Play</button></Link>
					</div>
				</div>

				<div id="board">
					<div className="colors">
						<button className="green" id="green" value="green" onClick={this.props.currentColor}></button>
						<button className="red" id="red" value="red" onClick={this.props.currentColor}></button>
						<button className="yellow" id="yellow" value="yellow" onClick={this.props.currentColor}></button>
						<button className="blue" id="blue" value="blue" onClick={this.props.currentColor}></button>
						<button className="pink" id="pink" value="pink" onClick={this.props.currentColor}></button>
						<button className="skyblue" id="skyblue" value="skyblue" onClick={this.props.currentColor}></button>
						<button className="black" id="black" value="black" onClick={this.props.currentColor}></button>
					</div>
					<div className="">
						<button className="circle" value="11" id="11" onClick={this.change.bind(this)}></button>
						<button className="circle" value="12" id="12" onClick={this.change.bind(this)}></button>
						<button className="circle" value="13" id="13" onClick={this.change.bind(this)}></button>
						<button className="circle" value="14" id="14" onClick={this.change.bind(this)}></button>
						<button value="15" id="15" onClick={this.enable.bind(this)} disabled={this.props.enable} className="check">Check</button>
						<div className="hint"><button className="hint-up" style={{left:'5px'}}></button><button className="hint-up" style={{right:'5px'}}></button><button className="hint-down" style={{left:'5px'}}></button><button style={{right:'5px'}} className="hint-down"></button></div>
					</div>
					<div className="row">
						<button className="circle" value="21" id="21" onClick={this.change.bind(this)}></button>
						<button className="circle" value="22" id="22" onClick={this.change.bind(this)}></button>
						<button className="circle" value="23" id="23" onClick={this.change.bind(this)}></button>
						<button className="circle" value="24" id="24" onClick={this.change.bind(this)}></button>
						<button value="25" id="25" onClick={this.enable.bind(this)} disabled={this.props.enable} className="check">Check</button>
						<div className="hint"><button className="hint-up" style={{left:'5px'}}></button><button className="hint-up" style={{right:'5px'}}></button><button className="hint-down" style={{left:'5px'}}></button><button style={{right:'5px'}} className="hint-down"></button></div>
					</div>
					<div className="row">
						<button className="circle" value="31" id="31" onClick={this.change.bind(this)}></button>
						<button className="circle" value="32" id="32" onClick={this.change.bind(this)}></button>
						<button className="circle" value="33" id="33" onClick={this.change.bind(this)}></button>
						<button className="circle" value="34" id="34" onClick={this.change.bind(this)}></button>
						<button onClick={this.enable.bind(this)} disabled={this.props.enable} className="check">Check</button>
						<div className="hint"><button className="hint-up" style={{left:'5px'}}></button><button className="hint-up" style={{right:'5px'}}></button><button className="hint-down" style={{left:'5px'}}></button><button style={{right:'5px'}} className="hint-down"></button></div>
					</div>
					<div className="row">
						<button className="circle" value="41" id="41" onClick={this.change.bind(this)}></button>
						<button className="circle" value="42" id="42" onClick={this.change.bind(this)}></button>
						<button className="circle" value="43" id="43" onClick={this.change.bind(this)}></button>
						<button className="circle" value="44" id="44" onClick={this.change.bind(this)}></button>
						<button onClick={this.enable.bind(this)} disabled={this.props.enable} className="check">Check</button>
						<div className="hint"><button className="hint-up" style={{left:'5px'}}></button><button className="hint-up" style={{right:'5px'}}></button><button className="hint-down" style={{left:'5px'}}></button><button style={{right:'5px'}} className="hint-down"></button></div>
					</div>
					<div className="row">
						<button className="circle" value="51" id="51" onClick={this.change.bind(this)}></button>
						<button className="circle" value="52" id="52" onClick={this.change.bind(this)}></button>
						<button className="circle" value="53" id="53" onClick={this.change.bind(this)}></button>
						<button className="circle" value="54" id="54" onClick={this.change.bind(this)}></button>
						<button onClick={this.enable.bind(this)} disabled={this.props.enable} className="check">Check</button>
						<div className="hint"><button className="hint-up" style={{left:'5px'}}></button><button className="hint-up" style={{right:'5px'}}></button><button className="hint-down" style={{left:'5px'}}></button><button style={{right:'5px'}} className="hint-down"></button></div>
					</div>
					<div className="row">
						<button className="circle" value="61" id="61" onClick={this.change.bind(this)}></button>
						<button className="circle" value="62" id="62" onClick={this.change.bind(this)}></button>
						<button className="circle" value="63" id="63" onClick={this.change.bind(this)}></button>
						<button className="circle" value="64" id="64" onClick={this.change.bind(this)}></button>
						<button onClick={this.enable.bind(this)} disabled={this.props.enable} className="check">Check</button>
						<div className="hint"><button className="hint-up" style={{left:'5px'}}></button><button className="hint-up" style={{right:'5px'}}></button><button className="hint-down" style={{left:'5px'}}></button><button style={{right:'5px'}} className="hint-down"></button></div>
					</div>
					<div className="row">
						<button className="circle" value="71" id="71" onClick={this.change.bind(this)}></button>
						<button className="circle" value="72" id="72" onClick={this.change.bind(this)}></button>
						<button className="circle" value="73" id="73" onClick={this.change.bind(this)}></button>
						<button className="circle" value="74" id="74" onClick={this.change.bind(this)}></button>
						<button onClick={this.enable.bind(this)} disabled={this.props.enable} className="check">Check</button>
						<div className="hint"><button className="hint-up" style={{left:'5px'}}></button><button className="hint-up" style={{right:'5px'}}></button><button className="hint-down" style={{left:'5px'}}></button><button style={{right:'5px'}} className="hint-down"></button></div>
					</div>
					<div className="row">
						<button className="circle" value="81" id="81" onClick={this.change.bind(this)}></button>
						<button className="circle" value="82" id="82" onClick={this.change.bind(this)}></button>
						<button className="circle" value="83" id="83" onClick={this.change.bind(this)}></button>
						<button className="circle" value="84" id="84" onClick={this.change.bind(this)}></button>
						<button onClick={this.enable.bind(this)} disabled={this.props.enable} className="check">Check</button>
						<div className="hint"><button className="hint-up" style={{left:'5px'}}></button><button className="hint-up" style={{right:'5px'}}></button><button className="hint-down" style={{left:'5px'}}></button><button style={{right:'5px'}} className="hint-down"></button></div>
					</div>
					<div className="row">
						<button className="circle" value="91" id="91" onClick={this.change.bind(this)}></button>
						<button className="circle" value="92" id="92" onClick={this.change.bind(this)}></button>
						<button className="circle" value="93" id="93" onClick={this.change.bind(this)}></button>
						<button className="circle" value="94" id="94" onClick={this.change.bind(this)}></button>
						<button onClick={this.enable.bind(this)} disabled={this.props.enable} className="check">Check</button>
						<div className="hint"><button className="hint-up" style={{left:'5px'}}></button><button className="hint-up" style={{right:'5px'}}></button><button className="hint-down" style={{left:'5px'}}></button><button style={{right:'5px'}} className="hint-down"></button></div>
					</div>
					<div className="row">
						<button className="circle" value="101" id="101" onClick={this.change.bind(this)}></button>
						<button className="circle" value="102" id="102" onClick={this.change.bind(this)}></button>
						<button className="circle" value="103" id="103" onClick={this.change.bind(this)}></button>
						<button className="circle" value="104" id="104" onClick={this.change.bind(this)}></button>
						<button onClick={this.enable.bind(this)} disabled={this.props.enable} className="check">Check</button>
					</div>
					<div className="code">
						<button className="circle">{this.props.question}</button>
						<button className="circle">{this.props.question}</button>
						<button className="circle">{this.props.question}</button>
						<button className="circle">{this.props.question}</button>
					</div>

				</div><br/><br/>

				<div className="footer">
					<p className="copyrights">&copy; Copyrights Pakki Pavan 2019</p>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(MM1);



export function mapStateToProps(state)
{
	return{
		color:state.color,
		check:state.check,
		index:state.index,
		row:state.row,
		enable:state.enable,
		colors:state.colors,
		code:state.code,
		flag:state.flag,
		question:state.question
		
	}
}
export function mapDispatchToProps(dispatch)
{
	return{
		currentColor:(e)=>{
			dispatch({type:"currentColor",value:e.target.value});
			console.log(document.getElementById(e.target.id))
			for(var i=0;i<7;i++)
			{
				if(i===0)
					document.getElementById("green").style.animation="blink 0s infinite"
				else if(i===1)
					document.getElementById("red").style.animation="blink 0s infinite"
				else if(i===2)
					document.getElementById("yellow").style.animation="blink 0s infinite"
				else if(i===3)
					document.getElementById("blue").style.animation="blink 0s infinite"
				else if(i===4)
					document.getElementById("pink").style.animation="blink 0s infinite"
				else if(i===5)
					document.getElementById("skyblue").style.animation="blink 0s infinite"
				else if(i===6)
					document.getElementById("black").style.animation="blink 0s infinite"
			}
			document.getElementById(e.target.id).style.animation="blink 0.2s infinite"
		},
		checkEnable:()=>{
			dispatch({type:"checkEnable"})
		},
		incIndex:()=>{
			dispatch({type:"incIndex"})
		},
		incRow:()=>{
			dispatch({type:"incRow"})
		},
		enableCheck:()=>{
			dispatch({type:"enableCheck"})
		},
		setFlag:()=>{
			dispatch({type:"setFlag"})
		},
		remQuestion:()=>{
			dispatch({type:"remQuestion"})
		},
		emptyCode:()=>{
			dispatch({type:"emptyCode"})
		},
		assignCode:(code)=>{
			dispatch({type:"assignCode",code:code})
		},
		initialState:()=>{
			dispatch({type:"initialState"})
		}
	}
}

const initialState={
	color:'green',
	check:true,
	index:2,
	row:1,
	enable:true,
	colors:{0:'green',1:'red',2:'yellow',3:'blue',4:'pink',5:'skyblue',6:'black'},	
	code:[],
	flag:true,
	question:'?'
}
function MMReducer(state=initialState,action)
{
	//console.log(action.value)
	switch(action.type)
	{
		case "currentColor":
			return{
				...state,color:action.value
			}
		case "checkEnable":
			return{
				...state,check:!state.check
			}
		case "incIndex":
			return{
				...state,index:state.index+1
			}	
		case "incRow":
			return{
				...state,row:state.row+1
			}	
		case "enableCheck":
			return{
				...state,enable:!state.enable
			}	
		case "setFlag":
			return{
				...state,flag:!state.flag
			}
		case "remQuestion":
			return{
				...state,question:''
			}
		case "emptyCode":
			return{
				...state,code:[]
			}
		case "assignCode":
			return{
				...state,code:action.code
			}
		case "initialState":
			return{
				...state,color:'green',check:true,index:2,row:1,enable:true,code:[],flag:true,question:'?'
			}
		default:
			return state;
	}
}

export default MMReducer;
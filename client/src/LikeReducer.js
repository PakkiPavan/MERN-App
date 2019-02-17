const initialState={
	count:0
}

function LikeReducer(state=initialState,action)
{
	switch(action.type)
	{
		case "like":
			return {
				...state,count:action.likes
			}
		default:
			return state;
	}
}

export default LikeReducer;
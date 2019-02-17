export function mapStateToProps(state)
{
	console.log(state)
	return{
		count:state.count
	}
}

export function mapDispatchToProps(dispatch)
{
	return{
		inc:(likes)=>{
			dispatch({type:"like",likes:likes})
		}
	}
}
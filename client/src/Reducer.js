const initialState={
  pass:false,
  uname:'',
  logout:false
}

function Reducer(state=initialState,action)
{
  switch(action.type)
  {
    case "unameCheck":
      return{
        ...state,pass:!state.pass,uname:action.uname
      }
    case "unamePass":
      return{
        ...state,pass:true,uname:action.uname
      }
    case "logoutCheck":
      return{
        ...state,logout:!state.logout
      }
  }
}

export default Reducer;

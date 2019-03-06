export function mapStateToProps(state)
{
  return{
    pass:state.pass,
    uname:state.uname,
    logout:state.logout
    }
}

export function mapDispatchToProps(dispatch)
{
  return{
    unameCheck:(uname)=>{
      dispatch({type:"unameCheck",uname:uname})
    },
    unamePass:(uname)=>{
      dispatch({type:"unamePass",uname:uname})
    },
    logoutCheck:()=>{
      dispatch({type:"logoutCheck"})
    }
  }
}

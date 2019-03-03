import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Login from './Login';

class Dashboard extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={logout:false}
  }
  logout()
  {
    axios.get('/logout')
    .then(res=>{
        console.log(res);
        if(res.data==="pass")
          this.setState({logout:!this.state.logout})
    })
    .catch(err=>alert("Something went wrong"))
  }
  render(){
    if(!this.state.logout)
    {
      return(
        <div>
          <Link to="/"><button className="btn">Home</button></Link>
          <h1>Welcome {this.props.uname}</h1>
          <Link to="/like"><button className="btn">Like</button></Link><br/>
          <button className="btn" onClick={this.logout.bind(this)}>Logout</button>
        </div>
      );
    }
    else
    {
      return(
        <Login/>
      );
    }

  }
}

export default Dashboard;

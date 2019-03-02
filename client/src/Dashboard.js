import React from 'react';
import {Link} from 'react-router-dom';
//import axios from 'axios';

class Dashboard extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={}
  }

  render(){
    return(
      <div>
        <Link to="/"><button className="btn">Home</button></Link>
        <h1>Welcome {this.props.uname}</h1>
        <Link to="/like"><button className="btn">Like</button></Link>
      </div>
    );
  }
}

export default Dashboard;

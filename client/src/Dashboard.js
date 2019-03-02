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
        <Link to="/"><div className="btn"><button>Home</button></div></Link>
        <h1>Welcome {this.props.uname}</h1>
        <Link to="/like"><div className="btn"><button>Like</button></div></Link>
      </div>
    );
  }
}

export default Dashboard;

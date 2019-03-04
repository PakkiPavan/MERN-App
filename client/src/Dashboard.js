import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import $ from 'jquery';

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
  nav()
  {
    $('.nav').toggle(400);
  }

  render(){
    if(!this.state.logout)
    {
      return(
        <div>
          <div className="mainHeader">
            <div className="pavanLogo" onClick={this.nav.bind(this)}>
              <span className="pp">PP</span>
            </div>
            <span className="profile">Welcome {this.props.uname}</span>
            <div className="nav">
              <Link to="/MMHome"><button className="btn">Mastermind</button></Link>
              <button className="btn" onClick={this.logout.bind(this)}>Logout</button>
            </div>
          </div>
          <div className="content">
            <h1></h1>
          </div>


          <div className="footer">
            <p className="copyrights">&copy; Copyrights Pakki Pavan 2019</p>
          </div>

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

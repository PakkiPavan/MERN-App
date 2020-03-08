import React from 'react';
import {Link} from 'react-router-dom';
import {mapStateToProps,mapDispatchToProps} from './MMStore';
import {connect} from 'react-redux';
import axios from 'axios';
//import Login from './Login';
import $ from 'jquery';
//import {store} from './index';


class Dashboard extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={logout:false}
  }
  componentDidMount()
  {
    console.log("Dashboard");
    //console.log(this.props.logout);
    console.log(this.props.uname);

  }
  logout()
  {
    axios.get('/serverLogout')
    .then(res=>{
        console.log(res);
        if(res.data==="pass")
        {
          //this.setState({logout:!this.state.logout})
          //this.props.logoutCheck();
          //this.props.unameCheck('');
          this.props.setUname("");

        }
        //console.log("uname after logout "+store.getState().uname);
    })
    .catch(err=>alert("Something went wrong"))
  }
  nav()
  {
    $('.nav').toggle(400);
  }

  render(){
      return(
        <div>
          <div className="mainHeader">
            <div className="pavanLogo" onClick={this.nav.bind(this)}>
              <span className="pp">PP</span>
            </div>
            <span className="profile">Welcome {this.props.uname}</span>
            <div className="nav">
              <Link to="/mastermind"><button className="customBtn">Mastermind</button></Link>
              <button className="customBtn" onClick={this.logout.bind(this)}>Logout</button>
            </div>
          </div>
          <div className="content">
          </div>

          <div className="footer">
            <p className="copyrights">&copy; Copyrights Pakki Pavan 2019</p>
          </div>

        </div>
      );


  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);

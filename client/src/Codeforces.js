import React from 'react';
import {Link} from 'react-router-dom';
import {mapStateToProps,mapDispatchToProps} from './MMStore';
import {connect} from 'react-redux';
import axios from 'axios';
//import Login from './Login';
import $ from 'jquery';
//import {store} from './index';
import './Codeforces.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

class Codeforces extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={logout:false,contestId:0}
    }
    nav()
    {
        $('.nav').toggle(400);
    }
    componentDidMount(){
        // let self=this;
        // $.ajax({
        //    url:"https://codeforces.com/api/user.info?handles=tourist;petr;",
        //     type:"GET",
        //     success:function(data){
        //         console.log(data)
        //         let users=data.result;
        //         let obj=data.result[0];
        //         self.setState({
        //             avatar:"https:"+obj.titlePhoto,
        //             name:obj.firstName+" "+obj.lastName,
        //             handle:obj.handle,
        //             profile:"https://codeforces.com/profile/"+obj.handle,
        //             users:users
        //         })
        //     }
        // })
    }
    
    handleClick=()=>{
        this.setState({showUser:true})
    }
    showUsers=()=>{
        this.state.users.map((data)=>{
            console.log(data.handle)
        })
    }
    goodBye=()=>{
        let self=this;
        $.ajax({
            url:"https://codeforces.com/api/contest.standings?contestId=1287&from=1&count=10",
            type:"GET",
            success:function(data){
                //console.log(JSON.stringify(data))
                let users=JSON.stringify(data);
                //console.log(JSON.stringify(data.result.rows))
                let rows=data.result.rows;
                let handles="";
                rows.map((user)=>{
                    handles+=user.party.members[0].handle+";"
                })
                let standings=self.fetchData(handles);
                console.log(standings)
                self.setState({
                    users:standings,
                    contest:data.result.contest.name
                })
            }
        })
    }
    handleChange=(event)=>{
        this.setState({contestId:event.target.value});
    }
    fetchData=(handles)=>{
        let users=null;
        let self=this;
        $.ajax({
            url:"https://codeforces.com/api/user.info?handles="+handles,
            type:"GET",
            async:false,
            success:function(data){
                users=data.result;
            }
        })
        return users;
    }
    getStandings=()=>{
        console.log(this.state.contestId)
        let self=this;
        $.ajax({
            url:"https://codeforces.com/api/contest.standings?contestId=1288&from=1&count=10",
            type:"GET",
            success:function(data){
                console.log("SUCCESS");
                console.log(data);
                let users=JSON.stringify(data);
                console.log(JSON.stringify(data.result.rows))
                let rows=data.result.rows;
                let handles="";
                rows.map((user)=>{
                    handles+=user.party.members[0].handle+";"
                })
                let standings=self.fetchData(handles);
                console.log(standings)
                self.setState({
                    users:standings,
                    contestName:data.result.contest.name,
                    handle:standings[1].handle,
                    avatar:"https://"+standings[1].titlePhoto
                })
            },
            error:function(error){
                alert("Invalid Contest ID");
            }
        })
    }
    render(){
        let users=this.state.users;
        let arr=[];
        if(users && users.length>0)
        {
            users.map((data)=>{
                arr.push(
                    <Card style={{ width: '18rem',float:"left",marginRight:"3em",marginBottom:"3em",height:"700px" }}>
                        <Card.Header>{data.handle}</Card.Header>
                        <Card.Img variant="top" src={data.titlePhoto} />
                        <Card.Body>
                            <Card.Title>
                                {data.firstName && data.lastName && data.firstName+" "+data.lastName}
                            </Card.Title>
                            <Card.Text>
                                {`Rating: ${data.rating} - ${data.rank.toUpperCase()}`}
                            </Card.Text>
                            <Card.Text>
                                {data.city && data.country && <Card.Text>{data.city+" "+data.country}</Card.Text>}
                            </Card.Text>
                            <Button variant="primary" style={{width:"fit-content"}}>Go to {data.handle} Profile</Button>
                        </Card.Body>
                    </Card>
                )
            });
        }
      return(
        <div>
          <div className="mainHeader">
            <div className="pavanLogo" onClick={this.nav.bind(this)}>
              <span className="pp">PP</span>
            </div>
            <center className="headerContent">Welcome to Codeforces</center>
            {/* <span className="profile">Welcome {this.props.uname}</span>
            <div className="nav">
              <Link to="/mastermind"><button className="customBtn">Mastermind</button></Link>
              <button className="customBtn" onClick={this.logout.bind(this)}>Logout</button>
            </div> */}
          </div>
          <div className="content">
            <div>
                <Form>
                <Form.Group controlId="formContestId">
                    <Form.Label>Contest ID</Form.Label>
                    <Form.Control type="number" style={{width:"200px"}}onChange={this.handleChange} placeholder="Enter contest ID" />
                    <Button variant="primary" onClick={this.getStandings}>Get Standings</Button>
                </Form.Group>
                </Form>
                {arr}
                {/* <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.state.avatar} />
                    <Card.Body>
                    <Card.Title>{this.state.handle}</Card.Title>
                    <Card.Text>
                        {this.state.firstName && this.state.lastName && <Card.Text>{this.state.firstName+" "+this.state.lastName}</Card.Text>}
                    </Card.Text>
                    <Card.Text>
                        {this.state.city && this.state.country && <Card.Text>{this.state.city+" "+this.state.country}</Card.Text>}
                    </Card.Text>
                    <Card.Text>
                        {this.state.rating+" "+this.state.rank}
                    </Card.Text>
                    <Button variant="primary">Go to {this.state.handle} Profile</Button>
                    </Card.Body>
                </Card> */}
            </div>
          </div>

          {/* <div className="footer">
            <p className="copyrights">&copy; Copyrights Pakki Pavan 2019</p>
          </div> */}

        </div>
      );


  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Codeforces);

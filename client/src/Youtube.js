import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import Dashboard from './Dashboard';
import {mapStateToProps,mapDispatchToProps} from './MMStore';
import {connect} from 'react-redux';
import {store} from './index';
import dotenv from "dotenv";
// import './App.css';
import styled,{keyframes} from 'styled-components';
// import {
//     Card, CardImg, CardText, CardBody,
//     CardTitle, CardSubtitle, Button
//   } from 'reactstrap';

let apiKey="";

var load=keyframes`
	0%
	{
		transform:rotate(0deg);
	}
	100%
	{
		transform:rotate(360deg);
	}
`;

var Loading=styled.div`
	position:absolute;
	border:5px solid silver;
	top:50%;
	left:50%;
	transform:translate(-50%,-50%);
	width:150px;
	height:150px;
	border-radius:50%;
	text-align:center;
	line-height:150px;
	font-size:20px;
	text-transform:uppercase;
	&:before{
		content:'';
		position:absolute;
		top:-5px;
		left:-5px;
		width:100%;
		height:100%;
		border:5px solid transparent;
		border-top:5px solid black;
		border-radius:50%;
		animation:${load} 1.5s infinite;
	}
`;

class Youtube extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            count:-1,
            isHidden:false,
            iframeWidth:"853",
            iframeHeight:"480",
            srcUrl:null,
        };
    }
    componentDidMount()
    {
        // dotenv.config();
        // fetch("/apiKeys.json")
        // .then(res=>res.json())
        // .then(data=>{
        //     apiKey=data.youtubeApiKey;
        // })
        // .catch(err=>{
        //     alert("ERROR WHILE FETCHING YOUTUBE API KEY")
        // })
        apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
        // // let URL="https://www.googleapis.com/youtube/v3/search?key=AIzaSyBMQ0sWfQQcroPaK0FpJeMq5HBu7NpSj90&part=snippet&q=samajavaragamana video song"
        // let URL=`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=samajavaragamana video song&maxResults=10`;
        // fetch(URL)
        // .then(response => response.json())
        // .then(data => {
        //   console.log("VIDEO DETAILS FETCHED");
        //   console.log(data);
        //   this.setState({
        //     videoId: data.items[0].id.videoId
        //   });
        // }).catch(err=>{
        //   alert("ERROR WHILE FETCHING VIDEO DETAILS");
        // });

    
    };
    handleChange = (event) =>{
        this.setState({query:event.target.value})
    } 
    handleKeyPress = (event) =>{
        if(event.key==="Enter")
        {
            this.search();
        }
    };
    hideVideo = () =>{
        this.setState({
            isHidden:!this.state.isHidden
        },()=>{
            if(document.getElementById("videoFrame"))
                document.getElementById("videoFrame").style.display=this.state.isHidden ? "block" : "none";
        });
    }
    search = () =>{
        // let URL="https://www.googleapis.com/youtube/v3/search?key=AIzaSyBMQ0sWfQQcroPaK0FpJeMq5HBu7NpSj90&part=snippet&q=samajavaragamana video song"
        let URL=`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=${this.state.query}&maxResults=50`;
        fetch(URL)
        .then(response => response.json())
        .then(data => {
            // console.log("VIDEO DETAILS FETCHED");
            // console.log(data);
            this.setState({
                items:data.items,
                srcUrl:"https://www.youtube-nocookie.com/embed/"+data.items[0].id.videoId+"?autoplay=1",
                // videoId: data.items[0].id.videoId,
                // thumbnail:data.items[0].snippet.thumbnails.medium.url,
                // title:data.items[0].snippet.title,
                // channelTitle:data.items[0].snippet.channelTitle,
                iframeHeight:String(window.innerHeight-100),
                iframeWidth:String(window.innerWidth-500)
            },()=>{
                if(document.getElementById("videoFrame"))
                    document.getElementById("videoFrame").style.display="none";
            })
        }).catch(err=>{
        alert("ERROR WHILE FETCHING VIDEO DETAILS");
        });

    };
    nav()
    {
        $('.nav').toggle(400);
    }
    test = () =>{
        axios.get('/httpTest')
        .then(res=>{
            // console.log("test")
            // console.log(res)
        })
        .catch(err=>alert("Something went wrong"))
    };
    checkTest = (event) =>{
        // console.log("checkTest");
        event.persist();
        // console.log(event.target.checked)
    };
    loadVideo = (event) =>{
        event.persist();
        this.setState({
            srcUrl:"https://www.youtube-nocookie.com/embed/"+event.target.id+"?autoplay=1"
        });
    }
    render()
    {
        // console.log("VIDEO ID",this.state.videoId)
        let src=null;
        if(this.state.videoId)
        {
            // src="https://www.youtube.com/embed/"+this.state.videoId+"?autoplay=1"
            src="https://www.youtube-nocookie.com/embed/"+this.state.videoId+"?autoplay=1"
        }
        let items=this.state.items;
        let cards=[];
        if(items)
        {
            items.map((ele,index)=>{
                if(ele.id && ele.id.videoId && ele.id.videoId!=="")
                {
                    cards.push(
                        <li key={ele.id.videoId} id={ele.id.videoId} className="cardsContainer" onClick={this.loadVideo}>
                            <div id={ele.id.videoId}>
                                <img id={ele.id.videoId} src={ele.snippet.thumbnails.medium.url} alt="thumbnail"/>
                                <div className="customCard" id={ele.id.videoId} className={ele.id.videoId}>
                                    <div className="videoTitle" id={ele.id.videoId}>{ele.snippet.title}</div>
                                    <div className="channelTitle" id={ele.id.videoId}>{ele.snippet.channelTitle}</div>
                                </div>
                            </div>
                        </li>
                    )
                }
            })
        }
        return(
            <div className="youtubeContainer" id="youtubeContainer">
                <h1>Youtube</h1>
                <input onChange={this.handleChange} placeholder="Search Youtube Videos" onKeyPress={this.handleKeyPress} className="searchField"/>
                <button className="searchBtn"><i className="fa fa-search" onClick={this.search}></i></button>
                {/* <button onClick={this.search} className="customBtn">Get Videos</button> */}
                {/* <button onClick={this.hideVideo} className="customBtn">Toggle Video</button> */}
                <div className="toggleContainer">
                    <label className="switch">
                        <input type="checkbox" className="customCheckBox" onChange={this.hideVideo}/>
                        <span className="slider round"></span>
                    </label>
                </div>
                {/* {this.state.srcUrl && (
                    <div className="spinner">
                        <i className="fa fa-spinner fa-spin" style={{fontSize:"40px"}}></i>
                    </div>
                )} */}
                {/* {(src && this.state.isHidden) && (
                    <div className="cardsContainer">
                        <img src={this.state.thumbnail} style={{width:"168px",float:"left",borderTopLeftRadius:"10px",borderBottomLeftRadius:"10px"}} alt="thumbnail"/>   
                        <img src="https://i.ytimg.com/vi/sBws8MSXN7A/mqdefault.jpg" style={{width:"168px",float:"left"}} alt="thumbnail"/>   
                        <div className="customCard">
                            <span className="videoTitle">{this.state.title}</span>
                            <span className="channelTitle">{this.state.channelTitle}</span>
                        </div>
                    </div>
                )} */}
                {/* <button onClick={this.test}>HTTP Test</button> */}
                {this.state.srcUrl && (
                    <div>
                        <iframe
                            id="videoFrame" 
                            // width="853" 
                            // height="480" 
                            width={this.state.iframeWidth} 
                            height={this.state.iframeHeight}
                            src={this.state.srcUrl}
                            frameBorder="0" 
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        >
                        </iframe>
                    </div>
                )}
                {(this.state.items && this.state.isHidden) && (
                    <div className="customCards">
                        <ul>{cards}</ul>
                    </div>
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Youtube);

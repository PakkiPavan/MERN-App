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

class YoutubeTest extends React.Component
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
        // https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&videoCategoryId=1&key={API_KEY}
        // https://www.googleapis.com/youtube/v3/videos?id=DHvZLI7Db8E&key=YOUR_API_KEY&part=snippet,contentDetails,statistics,status
        document.getElementById("spinner").style.display="block";
        document.getElementsByTagName("main")[0].style.padding="55px 0px";
        document.getElementsByClassName("container")[0].style.height=window.innerHeight+"px";
        apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
        // let URL=`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=IN&maxResults=25&key=${apiKey}`;
        // let URL=`https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet,contentDetails,statistics,status&chart=mostPopular&maxResults=25`;
        // let URL=`https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet&chart=mostPopular&maxResults=25`;
        let URL=`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=hitesh choudhary&chart=mostPopular&maxResults=50`;
    
        fetch(URL)
        .then(response => response.json())
        .then(data => {
            // console.log("TENDING DATA")
            // console.log(data);
            this.setState({
                items:data.items,
                // srcUrl:"https://www.youtube-nocookie.com/embed/"+data.items[0].id.videoId+"?autoplay=1",
                iframeHeight:String(window.innerHeight-100),
                iframeWidth:String(window.innerWidth-500)
            },()=>{
                document.getElementById("spinner").style.display="none";
            })
        }).catch(err=>{
        alert("ERROR WHILE FETCHING VIDEO DETAILS");
        });

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
    };
    getVideoDetailsById=(videoId)=>{
        let URL=`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,statistics,status`;
        fetch(URL)
        .then((res)=>res.json())
        .then((data)=>{
            // console.log("PART DATA")
            // console.log(data);
            this.setState({
                viewCount:data.items[0].statistics.viewCount
            });
        })
        .catch(err=>{
            alert("ERROR WHILE FETCHING VIDEO DETAILS BY ID");
        })
    };
    search = () =>{
        // document.getElementsByTagName("main")[0].style.padding="370px 18px 10px";
        this.setState({
            items:null
        });
        document.getElementsByTagName("main")[0].style.padding="55px 0px";
        document.getElementById("spinner").style.display="block";
        document.getElementsByClassName("container")[0].style.height=window.innerHeight+"px";
        this.setState({
            srcUrl:null
        });
        // let URL="https://www.googleapis.com/youtube/v3/search?key=AIzaSyBMQ0sWfQQcroPaK0FpJeMq5HBu7NpSj90&part=snippet&q=samajavaragamana video song"
        // let URL=`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,statistics,status`;
        let URL=`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=${this.state.query}&maxResults=50`;
        fetch(URL)
        .then(response => response.json())
        .then(data => {
            // console.log("SEARCH DATA");
            // console.log(data)
            for(let i=0;i<data.items.length;i++)
            {
                if(data.items[i].id.videoId)
                {
                    this.getVideoDetailsById(data.items[i].id.videoId);
                    break;
                }
            }
            this.setState({
                items:data.items,
                // srcUrl:"https://www.youtube-nocookie.com/embed/"+data.items[0].id.videoId+"?autoplay=1",
                // videoId: data.items[0].id.videoId,
                // thumbnail:data.items[0].snippet.thumbnails.medium.url,
                // title:data.items[0].snippet.title,
                // channelTitle:data.items[0].snippet.channelTitle,
                iframeHeight:String(window.innerHeight-100),
                iframeWidth:String(window.innerWidth-500)
            },()=>{
                document.getElementById("spinner").style.display="none";
            })
        }).catch(err=>{
        alert("ERROR WHILE FETCHING VIDEO DETAILS");
        });

    };
    loadVideo = (event) =>{
        event.persist();
        document.getElementById("spinner").style.display="block";
        document.getElementsByTagName("main")[0].style.padding="370px 18px 10px";
        setTimeout(() => {
            this.setState({
                srcUrl:"https://www.youtube-nocookie.com/embed/"+event.target.id+"?autoplay=1"
            },()=>{
                document.getElementById("spinner").style.display="none";
            });
        }, 300);
    }

    nav()
    {
        $('.nav').toggle(400);
    }
    hideVideo = () =>{
        this.setState({
            isHidden:!this.state.isHidden
        },()=>{
            if(document.getElementById("video"))
                document.getElementById("video").style.display=this.state.isHidden ? "block" : "none";
        });
    };
    render()
    {
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
                        <article className="item" data-key={ele.id.videoId} id={ele.id.videoId} onClick={this.loadVideo}>
                            <img src={ele.snippet.thumbnails.medium.url} id={ele.id.videoId} alt="thumbnail" className="thumb"/>
                            <div className="details" id={ele.id.videoId}>
                                <h4 id={ele.id.videoId}>{ele.snippet.title}</h4>
                                <p id={ele.id.videoId}>{ele.snippet.channelTitle}</p>
                            </div>
                        </article>
                    )
                }
            })
        }

        return(
            <div className="container">

            <header>
                {/* <img src='./youtubeLogo.jpg' alt="" class="logo"/> */}
                <input placeholder="Search" style={{padding:"6px",width:"350px"}} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                <button className="searchBtn1"><i className="fa fa-search searchIcon1" onClick={this.search}></i></button>
                <div className="toggleContainer">
                    <label className="switch">
                        <input type="checkbox" className="customCheckBox" onChange={this.hideVideo}/>
                        <span className="slider round"></span>
                    </label>
                </div>
            </header>
            {this.state.srcUrl && (<section id="video">
                <iframe 
                    width="560" 
                    height="315" 
                    src={this.state.srcUrl}
                    frameBorder="0" 
                    allow="autoplay; encrypted-media" 
                    allowFullScreen>
                </iframe>
            </section>)}
            <div id="spinner" style={{display:"none"}}>
                <i className="fa fa-spinner fa-spin" style={{fontSize:"35px"}}></i>
            </div>
            <main>
                {this.state.isHidden && cards}
            {/* <article class="item" data-key="9sWEecNUW-o">
                <img src="https://i.ytimg.com/vi/sBws8MSXN7A/mqdefault.jpg" alt="Test" class="thumb"/>
                <div class="details">
                    <h4>Test Video Title</h4>
                    <p>
                        Description
                        Description
                        Description
                    </p>
                </div>
            </article>
            <article class="item" data-key="9sWEecNUW-o">
                <img src="https://i.ytimg.com/vi/sBws8MSXN7A/mqdefault.jpg" alt="Test" class="thumb"/>
                <div class="details">
                    <h4>Test Video Title</h4>
                    <p>
                        Description
                        Description
                        Description
                    </p>
                </div>
            </article>
            <article class="item" data-key="9sWEecNUW-o">
                <img src="https://i.ytimg.com/vi/sBws8MSXN7A/mqdefault.jpg" alt="Test" class="thumb"/>
                <div class="details">
                    <h4>Test Video Title</h4>
                    <p>
                        Description
                        Description
                        Description
                    </p>
                </div>
            </article>
            <article class="item" data-key="9sWEecNUW-o">
                <img src="https://i.ytimg.com/vi/sBws8MSXN7A/mqdefault.jpg" alt="Test" class="thumb"/>
                <div class="details">
                    <h4>Test Video Title</h4>
                    <p>
                        Description
                        Description
                        Description
                    </p>
                </div>
            </article>
            <article class="item" data-key="9sWEecNUW-o">
                <img src="https://i.ytimg.com/vi/sBws8MSXN7A/mqdefault.jpg" alt="Test" class="thumb"/>
                <div class="details">
                    <h4>Test Video Title</h4>
                    <p>
                        Description
                        Description
                        Description
                    </p>
                </div>
            </article>
            <article class="item" data-key="9sWEecNUW-o">
                <img src="https://i.ytimg.com/vi/sBws8MSXN7A/mqdefault.jpg" alt="Test" class="thumb"/>
                <div class="details">
                    <h4>Test Video Title</h4>
                    <p>
                        Description
                        Description
                        Description
                    </p>
                </div>
            </article> */}
            </main>

        </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(YoutubeTest);

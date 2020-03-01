import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import Dashboard from './Dashboard';
import {mapStateToProps,mapDispatchToProps} from './MMStore';
import {connect} from 'react-redux';
import {store} from './index';
import styled,{keyframes} from 'styled-components';

let apiKey=<API_KEY>;
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
        this.state={count:-1}
    }
    componentDidMount()
    {
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
    } 
    search = () =>{
        // let URL="https://www.googleapis.com/youtube/v3/search?key=AIzaSyBMQ0sWfQQcroPaK0FpJeMq5HBu7NpSj90&part=snippet&q=samajavaragamana video song"
        let URL=`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=${this.state.query}&maxResults=10`;
        fetch(URL)
        .then(response => response.json())
        .then(data => {
        console.log("VIDEO DETAILS FETCHED");
        console.log(data);
        this.setState({
            videoId: data.items[0].id.videoId
        });
        }).catch(err=>{
        alert("ERROR WHILE FETCHING VIDEO DETAILS");
        });

    };
    nav()
    {
        $('.nav').toggle(400);
    }
    render()
    {
        console.log("VIDEO ID",this.state.videoId)
        let src=null;
        if(this.state.videoId)
        {
            src="https://www.youtube.com/embed/"+this.state.videoId
        }
        return(
            <div className="container" id="container">
                <h1>Youtube</h1>
                <input onChange={this.handleChange} placeholder="Search youtube videos" onKeyPress={this.handleKeyPress}/>
                {src && (
                    <iframe 
                        width="853" 
                        height="480" 
                        src={src}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                    </iframe>
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Youtube);

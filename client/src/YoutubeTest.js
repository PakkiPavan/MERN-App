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

    
    };
    nav()
    {
        $('.nav').toggle(400);
    }
    render()
    {
        // console.log("VIDEO ID",this.state.videoId)
        return(
            <div class="container">

            <header>
                <img src="https://richardmiddleton.me/projects/youtube/images/logo.png" alt="" class="logo"/>
            </header>
            <section id="video">
                <iframe 
                    width="560" 
                    height="315" 
                    src="https://www.youtube.com/embed/9sWEecNUW-o" 
                    frameborder="0" 
                    allow="autoplay; encrypted-media" 
                    allowfullscreen>
                </iframe>
            </section>

            <main>
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
            </main>

        </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(YoutubeTest);

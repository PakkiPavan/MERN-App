import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import Dashboard from './Dashboard';
import {mapStateToProps,mapDispatchToProps} from './MMStore';
import {connect} from 'react-redux';
import {store} from './index';
import styled,{keyframes} from 'styled-components';

import queryString from 'query-string';

let accessToken="BQBmapyvJOkWvkzCaPON_5FrkhnjrtOY8eS18dGvXvYp6h-AQCS-emRQO-uALNwuX2wf7gAoOw5i239fFUmb2lyAKjVSLc-MrqsROCph49UBtcVWIEKuH5omlJvQ7GGqCh1_02Dt_0RLvDsTAouM69L1AsJvqMxdXg";
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

class Spotify extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={count:-1}
  }
  componentDidMount()
  {
    let parsed = queryString.parse(window.location.search);
    // let accessToken = parsed.access_token;
    // console.log("ACCESS TOKEN",accessToken)
    if (!accessToken)
      return;
    /* To fetch user details*/
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    })
    .then(response => response.json())
    .then(data => {
      // console.log("USER DETAILS FETCHED");
      // console.log(data);
      // this.setState({
      //   user: {
      //     name: data.display_name
      //   }
      // }
    }).catch(err=>{
      alert("ERROR WHILE FETCHING USER DETAILS");
    });

    // Web playback SDK Test
    // Premium required for Spotify Player
    /* let deviceId="1422c447888b1410fe1871fa53c670db101fe038";
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: "spotify:track:7xGfFoTpQ2E7fRF5lN10tr" }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    })
    .then((res)=>res.json())
    .then(data=>{
      console.log("SDK SUCCESS");
      console.log(data)
    })
    .catch(err=>{
      console.log("SDK ERROR");
      console.log(err)
    }) */

    /* To fetch Playlists */
    // fetch('https://api.spotify.com/v1/me/playlists', {
    //   headers: {'Authorization': 'Bearer ' + accessToken}
    // }).
    // then(response => response.json())
    // .then(data=>{
    //   console.log("PLAYLISTS FETCHED")
    //   console.log(data)
    // })
    // .catch(err=>{
    //   alert("ERROR WHILE FETCHING PLAYLISTS")
    // })


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
    // console.log("SEARCH",this.state.query);
    // let accessToken="BQAr5bk7HSlCg_oQFjy1dYnS1XXmmANNUX0g1OQXEb-pst0PFhWkquuJsiPNgIQMl90SbV5hAz3SV0HLW6BYkwdeLGsF7FiPJ_1g6DmnLSJDT8uU2NCqEFxT8hG10tY3Ok3eGAhvR--cS6F2sVVSpLeMouwa92732g";
    let auth_token = "Bearer "+accessToken;
    let BASE_URL = "https://api.spotify.com/v1/search?";
    let ALBUM_URL = "https://api.spotify.com/v1/artists/";
    //valid type --> album , artist, playlist, and track
    // let FETCH_URL = BASE_URL + "q=" + this.state.query + "&type='artist'";
    // let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist`;
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=playlist`;
    fetch(FETCH_URL, {
      method:'GET',
      headers: {
        'Content-Type' :'application/json',
        'Authorization': auth_token,
      },
      mode: 'cors',
      cache:'default'
    }).
    then(response => response.json())
    .then(data=>{
      // console.log("ARTISTS FETCHED")
      // console.log(data);
      /* let items=data.playlists.items;
      let item=data.playlists.items[0];
      // console.log("ITEMS")
      // console.log(item);
      let id=item.id; */
      // samajavaragamana
      // ala vaikuntapuramlo
      // this.setState({
      //   tracks:data.tracks.items
      // });
      // "https://api.spotify.com/v1/playlists/1RyG20JlxfQEojoJLCI9No/tracks"
      // FETCH_URL=`${ALBUM_URL}${artist.id}/top-tracks?country=US&`
      // FETCH_URL=`${ALBUM_URL}${id}/tracks`
      /* FETCH_URL = "https://api.spotify.com/v1/playlists/1RyG20JlxfQEojoJLCI9No/tracks";
      fetch(FETCH_URL,{
        method:'GET',
        headers: {
          'Content-Type' :'application/json',
          'Authorization': auth_token,
          },
      })
      .then((res)=>res.json())
      .then(data=>{
        // console.log("DATA USING ID");
        // console.log(data)
      }) */
    })
    .catch(err=>{
      alert("ERROR WHILE FETCHING ARTISTS")
    });

    //To fetch album
    // FETCH_URL=`${ALBUM_URL}${artist.id}/top-tracks?country=US&`
    // FETCH_URL=`${ALBUM_URL}${artist.id}/top-tracks&`
    // fetch(FETCH_URL,{
    //   method:'GET',
    //   headers: {
    //     'Content-Type' :'application/json',
    //     'Authorization': auth_token,
    //     },
    // })
  };
  playAudio=()=>{
    // console.log("PLAY AUDIO");
    // console.log(this.state.tracks);
    
    if(this.state.tracks)
    {
      let audioUrl = this.state.tracks[0].preview_url;
      // console.log("AUDIO URL");
      // console.log(audioUrl)
      let audio=new Audio(audioUrl);
      // console.log("AUDIO");
      // console.log(audio);
      audio.play();
      this.setState({
        audio
      });
    }
    else{
      alert("NO SONGS TO PLAY");
    }
  };
  pauseAudio = () =>{
    // console.log("PAUSE AUDIO");
    if(this.state.audio)
    {
      this.state.audio.pause();
    }
    else
    {
      alert("NO SONGS TO PAUSE");
    }
  }
  nav()
	{
		$('.nav').toggle(400);
	}
  loginSpotify=()=>{
    // console.log("loginSpotify");
    window.location = "http://localhost:3001/spotifyLogin";
  }
  render()
  {

    return(
        <div className="container" id="container">
            <h1>Spotify</h1>
            <input onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
            <button onClick={this.playAudio}>Play Audio</button>
            <button onClick={this.pauseAudio}>Pause Audio</button>
            {/* Click this button for access_token */}
            <button onClick={this.loginSpotify}>Get Auth Code</button>
        </div>
    );

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Spotify);

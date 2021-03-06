const http=require('http');
const express=require('express');
const mongoose=require('mongoose');
const app=express();
var session=require('express-session')
const port=Number(process.env.PORT || 3001);
const path=require('path');
const bodyParser=require('body-parser');
const queryString=require('query-string');
// let request=require("request");
// var proxy = require('express-http-proxy');
//For youtube to mp3 start
const ytdl = require('ytdl-core');
const fs = require('fs');
var through = require('through');
var youtubeStream = require('youtube-audio-stream');
//For youtube to mp3 end

// let axios=requires("axios");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// var url="mongodb://pavan:pavan786@ds123645.mlab.com:23645/test1";
var url="mongodb://pavan:pavan786@ds219078.mlab.com:19078/mern_app";
var sess=null;
mongoose.connect(url,function(err){
	if(err)
		throw err;
	console.log("Connected");
});

let encode_uri = 'http%3A%2F%2Flocalhost%3A3001%2Fcallback%2F';
let redirect_uri = "http://localhost:3001/callback/"
let clientId = "764ecb0f59f942d8be3b5104e67d77c7";
let clientSecret = "2cde13a391af4561859f5ee9ac505b44";
let code = "AQDNJ671BrgRv1DQ3HlVitRF5CxFTpuPtC9JbLO_nzr9lnDZqjYQzaXiHnlDmEKDIomq5NTRuRa5mQpFDhQTzbplsdpX6csd71mfHomXV8DgksWP1q0rSJaMZt-Jui3qmLye__E_6eO4Z4bCPugydKTHExGPlQ24fx2Rauprues_7-rGNIm3koNgJSeuQ1gHjdzNaaA";
app.use(
	session({
		secret:"aaaa",
		saveUninitialized: true,
		resave:true
	})
)

/*
	GET	    Read
	POST	Create
	PUT	    Update
	DELETE	Delete
*/
/* setInterval(function(){
	http.get('https://ancient-tundra-40322.herokuapp.com/')
},20*60*1000) //every 20 minutes
 */
var userSchema=new mongoose.Schema({
	fname:String,
	email:String,
	password:String
})
var userModel=mongoose.model("userData",userSchema)

//static fie declaration
//app.use(express.static(path.join(__dirname,'client/build')));
app.use(express.static(path.join(__dirname,'client/public/index.html')));

//production mode start
if(process.env.NODE_ENV==='production')
{
	console.log("INSIDE PRODUCTION")
	app.use(express.static('client/build'));
	app.get('/api',(req,res)=>{
		var count;
		mongoose.connect(url,function(err,db){
			if(err) throw err;
			db.collection('collectionTest1').find({_id:"003"}).toArray(function(err,docs){
				if(err) throw err;
				res.json(docs);
			})
		})

	})
	// app.get("/serverLogin",function(req,res){
	// 	if(sess)
	// 	{
	// 		res.send(sess.uname);
	// 	}
	// 	else {
	// 		res.send("");
	// 	}
	// })
	app.post("/inc",function(req,res){
		var count;
		mongoose.connect(url,function(err,db){
			if(err) throw err;
			db.collection('collectionTest1').find({_id:"003"}).toArray(function(err,docs){
				if(err) throw err;
				count=docs[0].count;
				intCount=parseInt(req.body.count)+1
				db.collection('collectionTest1').updateOne({count:count},{$set:{"count":intCount}},function(err,res){
					if(err) throw err;
					console.log("Incremented")
					db.close();
				})
				res.send("Incremented"+" "+JSON.stringify(docs)+" "+count+" "+intCount);
			})
		})
	});
}
//production mode ends

app.post('/serverRegister',function(req,res){
	console.log(req.body)
	mongoose.connect(url,function(err,db){
		if(err)
			throw err;
		db.collection('userData').insertOne(req.body,function(err,res){
			if(err)
				throw err;
			db.close();
		})
		res.send("Inserted");
	})
	/*var data=new userModel(req.body)
	data.save()
	.then(user=>{
		res.send("stored");
	})
	.catch(err=>{
		res.status(400).send("not stored")
	})*/

})
app.get("/countUsers",function(req,res){
	mongoose.connect(url,function(err,db){
		if(err)
			throw err;
		db.collection('userData').find().count()
		.then(function(count){
			console.log("Number of users registered="+count);
			res.send({usersCount:count})
			//res.send(count)
			db.close();
		})
	})
})

// redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3001/callback';
// Encode URI = http%3A%2F%2Flocalhost%3A3001%2Fcallback%2F

// clientId="764ecb0f59f942d8be3b5104e67d77c7";

// code = AQDNJ671BrgRv1DQ3HlVitRF5CxFTpuPtC9JbLO_nzr9lnDZqjYQzaXiHnlDmEKDIomq5NTRuRa5mQpFDhQTzbplsdpX6csd71mfHomXV8DgksWP1q0rSJaMZt-Jui3qmLye__E_6eO4Z4bCPugydKTHExGPlQ24fx2Rauprues_7-rGNIm3koNgJSeuQ1gHjdzNaaA

//https://accounts.spotify.com/authorize?response_type=code&client_id=764ecb0f59f942d8be3b5104e67d77c7&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fcallback%2F
//https://accounts.spotify.com/authorize?response_type=code&client_id=764ecb0f59f942d8be3b5104e67d77c7&redirect_uri=http://localhost:3001/callback/

app.get("/spotifyLogin",function(req,res){
	console.log("Server Spotify Login");
	res.redirect('https://accounts.spotify.com/authorize?' +
		queryString.stringify({
			response_type: 'code',
			client_id: clientId,
			redirect_uri//encode_uri
		})
	)
})

// access_token = "BQC-pr-eCvyhUk8HTcoohq0-V3q2tOc9POMC-U9W6Iyni-sEBHhGMDoFxQ2nYiigMeTbTPjgixXjRQbtJXZ2ZkQLDUTnPoWcSWTV2Mt6lWZfunXCiZRI_bokgCzI19kykDOQKXlG5W5S8IK7EqUCcUPZPsK0fO_7LA"
app.get('/callback', function(req, res) {
	console.log("SPOTIFY CALLBACK");
	let code = req.query.code || null
	console.log("CODE",code)
	let authOptions = {
	  url: 'https://accounts.spotify.com/api/token',
	  form: {
		code: code,
		redirect_uri:"http://localhost:3001/callback/",
		grant_type: 'authorization_code'
	  },
	  headers: {
		'Authorization': 'Basic ' + (new Buffer(
		  clientId + ':' + clientSecret
		).toString('base64'))
	  },
	  json: true
	}
	request.post(authOptions, function(error, response, body) {
		console.log("POST");
		// console.log(response);
		console.log(body)
		console.log(error)
		var access_token = body.access_token
		console.log("ACCESS TOKEN",access_token);
		let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
		res.redirect(uri + '?access_token=' + access_token)
	})
})

app.get("/httpTest",function(req,res){
	console.log("httpTest");
	var getAudio = function (req, res) {
		var requestUrl = 'http://youtube.com/watch?v=OCg6BWlAXSw';// + req.params.videoId
		try {
			youtubeStream(requestUrl).pipe(res)
		} catch (exception) {
			console.log("CATCH")
		  res.status(500).send(exception)
		}
	  }
	  console.log("getAudio")
	  console.log(getAudio);
	// const videoUrl = 'https://www.youtube.com/watch?v=' + req.params.videoId;
	/* const videoUrl = 'https://www.youtube.com/watch?v=OCg6BWlAXSw';
	
	try {
		var videoReadableStream = ytdl(videoUrl, { filter: 'audioonly'});
		// videoReadableStream.on('info', function(info) {
		// 	console.log(info)
		// 	console.log('Download started')
		// 	console.log('filename: ' + info._filename)
		// 	console.log('size: ' + info.size)
		// })
		ytdl.getInfo(videoUrl, [] ,function(err, info){
			var videoName = info.title.replace('|','').toString('ascii');

			videoReadableStream.on('end', () => res.end(videoReadableStream));
			videoReadableStream.pipe(res);
		});
	} catch (exception) {
	console.log(exception);
	res.end("Error");
	} */


})
app.post('/serverLogin',function(req,res){
	//console.log(req.body)
	//console.log(req.session.uname)
	//res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	//console.log("sess in login");
	//console.log(sess);

	// if(!sess)
	// {
	// 	res.send("Login to access this page")
	// }
	console.log("BODY");
	console.log(req.body);
	mongoose.connect(url,function(err,db){
		if(err)
			throw err;
		db.collection('userData').find({uname:req.body.uname,password:req.body.password}).toArray(function(er,docs){
			if(err)
				throw err;
				if(docs.length>0)
				{
					sess=req.session;
					sess.uname=req.body.uname;
					console.log(req.session.uname)
					console.log(docs.length)
				}
				//else
				// {
				// 	res.send("fail")
				//
				// }
				//console.log(docs)
				res.json(docs);
				//res.redirect('/home');
				db.close();
		})
	})
	//res.send("pass")
})
// app.get('/login',function(req,res){
// 	//console.log(sess)
// 	if(sess)
// 		res.send("Logged in")
// 	else
// 		res.send('Login to access this page')
// })

// app.get('/register',function(req,res){
// 	res.send("Access denied. Login to access this page");
// })

app.get('/session',function(req,res){
		console.log("SERVER SESSION");
		if(sess)
		{
			console.log("sess in session");
			console.log(sess);
			res.send(sess.uname);
		}
		else {
			res.send("");
		}
})


//	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
app.get('/serverLogout',function(req,res){
	console.log('logout')
	req.session.destroy();
	sess=null;
	console.log(req.session)
	res.send("pass")
	// req.session.destroy(function(err){
	// 	if(err)
	// 	{
	// 		console.log(err)
	// 		res.send("fail")
	// 	}
	// 	else
	// 	{
	// 		console.log('logout else')
	// 		console.log(req.session)
	// 		res.send("pass")
	// 	}
	// })
})

// app.get('/home',function(req,res){
// 	//res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
// 	console.log("Name: ")
// 	res.send("HOME")
// 	//res.sendFile(__dirname+"/client/public/index.html")
// 	// if(req.session.uname)
// 	// {
// 	// 	console.log(__dirname)
// 	// 	//res.sendFile(__dirname+"/index.html")
// 	// }
// 	// else
// 	// 	res.send("Login to access this page")
// })

app.get("/api",function(req,res){
	var count;
	//console.log(req.body)
	mongoose.connect(url,function(err,db){
		if(err) throw err;
		db.collection('collectionTest1').find({_id:"003"}).toArray(function(err,docs){
			if(err) throw err;
			//count=docs[0].count;
			//console.log(count+1)
			res.json(docs);
			db.close();
		})

	})

});





app.post("/inc",function(req,res){
	var count;
	console.log("Inside inc")
	console.log(req.body)
	//console.log(res.render("App.js"))

	mongoose.connect(url,function(err,db){
		if(err) throw err;
		db.collection('collectionTest1').find({_id:"003"}).toArray(function(err,docs){
			if(err) throw err;
			//res.json(docs);
			count=docs[0].count;
			//console.log(count)
			intCount=parseInt(req.body.count)+1
			db.collection('collectionTest1').updateOne({count:count},{$set:{"count":intCount}},function(err,res){
				if(err) throw err;
				console.log("Incremented")
				db.close();
			})
			res.send("Incremented"+" "+JSON.stringify(docs)+" "+count+" "+intCount);
		})
	})
});


app.listen(port,function(){
	console.log("Server started at port "+port)
})




/*
var countSchema=new mongoose.Schema({
	count:String
})
var countModel=mongoose.model("collectionTest1",countSchema)
*/
/*
app.get("/api",function(req,res){
	//res.sendFile(__dirname + "/index.html");
	var a=[];
	mongoose.connect(url,function(err,db){
		if(err) throw err;
		var cursor=db.collection('collectionTest1').find();
		cursor.forEach(function(doc,err){
			a.push(doc);
		},function(){
			db.close();
			for(var i=0;i<a.length;i++)
			{
				//console.log(a[i].fname)
			}
			res.json(a);
		})
	})
});
*/

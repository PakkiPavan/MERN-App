const http=require('http');
const express=require('express');
const mongoose=require('mongoose');
const app=express();
var session=require('express-session')
const port=Number(process.env.PORT || 3001);
const path=require('path');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var url="mongodb://pavan:pavan786@ds123645.mlab.com:23645/test1";
var sess;
mongoose.connect(url,function(err){
	if(err)
		throw err;
	console.log("Connected");
});

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
setInterval(function(){
	http.get('https://ancient-tundra-40322.herokuapp.com/')
},20*60*1000) //every 20 minutes

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

app.post('/register',function(req,res){
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
app.post('/login',function(req,res){
	//console.log(req.body)
	//console.log(req.session.uname)
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	sess=req.session;
	sess.uname=req.body.uname;
	console.log("Username: "+sess.uname)
	if(!sess.uname)
	{
		res.send("Login to access this page")
	}
	mongoose.connect(url,function(err,db){
		if(err)
			throw err;
		db.collection('userData').find({uname:req.body.uname,password:req.body.password}).toArray(function(er,docs){
			if(err)
				throw err;
				// if(docs.length>0)
				// {
				// 	sess=req.session;
				// 	sess.uname=req.body.uname;
				// 	console.log(req.session.uname)
				// 	console.log(docs.length)
				//
				// }
				// else
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
app.get('/*',function(req,res){
	res.send('Login to access this page')
})
//	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
app.get('/home',function(req,res){
	//res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	console.log("Name: ")
	res.send("HOME")
	//res.sendFile(__dirname+"/client/public/index.html")
	// if(req.session.uname)
	// {
	// 	console.log(__dirname)
	// 	//res.sendFile(__dirname+"/index.html")
	// }
	// else
	// 	res.send("Login to access this page")
})

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

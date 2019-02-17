const express=require('express');
const mongoose=require('mongoose');	
const app=express();
const port=Number(process.env.PORT || 3001);
const path=require('path');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var url="mongodb://pavan:pavan786@ds123645.mlab.com:23645/test1";

mongoose.connect(url,function(err){
	if(err)
		throw err;
	console.log("Connected");
});
/*
	GET	    Read
	POST	Create
	PUT	    Update
	DELETE	Delete
*/

//static fie declaration
//app.use(express.static(path.join(__dirname,'client/build')));

//production mode 
if(process.env.NODE_ENV==='production')
{
	console.log("INSIDE PRODUCTION")
	app.use(express.static('client/build'));
	app.get('*',(req,res)=>{
		//res.sendFile(path.join(__dirname,'client/build/index.html'))
		//res.sendFile(path.resolve(__dirname,'client','build','index.html'))
		var count;
		mongoose.connect(url,function(err,db){
			if(err) throw err;
			db.collection('collectionTest1').find({_id:"003"}).toArray(function(err,docs){
				if(err) throw err;
				res.json(docs);
				//count=docs[0].count;
				//console.log(count+1)
			})
		})
	
	})
	

}
	
/*app.get('/api',(req,res)=>{
	console.log("INSIDE first get")
	res.sendFile(path.join(__dirname,'client/public/index.html'))
})
*/

app.get("/api",function(req,res){
	var count;
	//console.log(req.body)
	mongoose.connect(url,function(err,db){
		if(err) throw err;
		db.collection('collectionTest1').find({_id:"003"}).toArray(function(err,docs){
			if(err) throw err;
			res.json(docs);
			//count=docs[0].count;
			//console.log(count+1)
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
			db.collection('collectionTest1').update({count:count},{$set:{"count":intCount}})
			res.send("Incremented");
			console.log("Incremented")
		})
		db.close();
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

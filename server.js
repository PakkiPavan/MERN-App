const http=require('http');
const express=require('express');
const mongoose=require('mongoose');
const app=express();
var session=require('express-session')
const port=Number(process.env.PORT || 3001);
const path=require('path');
var nodemailer=require('nodemailer');
//client ID: 619484619705-aj76lio2024eov6p4pihdk48mlc778qi.apps.googleusercontent.com
//client secret: QaVWaQhLRO-QQGVUFBvVDjVo
//Authorization code: 4/MwHwjoJfwrWfIYM5ySWIjx3Kp2FaSIglsKVUNmJJPwLhbXvO95VwXW7QPJOA4xTuI-aiLRBdPSgyV_XhcrPLADQ
//Refresh token: 1/LmHOuvMjdKNd14PdqzDnqJWmCY0uYAFqEQadSkD0_jo
//Access token: ya29.GlvyBv7jS03a78iXf3ySz4ScOs3BKOv1ivoBtAM9qyYsVrni75BmyMwu7uhZDZt75AVRVkLMDZN54C1aMeOig4Dl0ogY6BUPS50qnCK5ZNYl9xiySYtZiXxoSG2i

var smtpTransport=require('nodemailer-smtp-transport');
const bodyParser=require('body-parser');
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
// to make app online for every 20 minutes start
/*
setInterval(function(){
	http.get('https://ancient-tundra-40322.herokuapp.com/')
},20*60*1000) //every 20 minutes
*/
// to make app online for every 20 minutes end
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
	//Email verification start
	let transporter = nodemailer.createTransport({
		service:'gmail',
		auth: {
			type: 'OAuth2',
			user: 'pakkicode@gmail.com',
			clientId:'619484619705-aj76lio2024eov6p4pihdk48mlc778qi.apps.googleusercontent.com',
			clientSecret: 'QaVWaQhLRO-QQGVUFBvVDjVo',
			refreshToken: '1/LmHOuvMjdKNd14PdqzDnqJWmCY0uYAFqEQadSkD0_jo',
			accessToken: 'ya29.GlvyBv7jS03a78iXf3ySz4ScOs3BKOv1ivoBtAM9qyYsVrni75BmyMwu7uhZDZt75AVRVkLMDZN54C1aMeOig4Dl0ogY6BUPS50qnCK5ZNYl9xiySYtZiXxoSG2i'
		}
	});
	//client ID: 619484619705-aj76lio2024eov6p4pihdk48mlc778qi.apps.googleusercontent.com
	//client secret: QaVWaQhLRO-QQGVUFBvVDjVo
	//Authorization code: 4/MwHwjoJfwrWfIYM5ySWIjx3Kp2FaSIglsKVUNmJJPwLhbXvO95VwXW7QPJOA4xTuI-aiLRBdPSgyV_XhcrPLADQ
	//Refresh token: 1/LmHOuvMjdKNd14PdqzDnqJWmCY0uYAFqEQadSkD0_jo
	//Access token: ya29.GlvyBv7jS03a78iXf3ySz4ScOs3BKOv1ivoBtAM9qyYsVrni75BmyMwu7uhZDZt75AVRVkLMDZN54C1aMeOig4Dl0ogY6BUPS50qnCK5ZNYl9xiySYtZiXxoSG2i
	
	var mailOptions={
		from:'pakkicode@gmail.com',
		to:'pavanpakki007@gmail.com',
		subject:'Confirmation mail',
		//text:'Hi Pavan, This is the mail regarding to test whether the email verification is working or not using node JS'
		html:`
			<h3>Hi Pavan,</h3>
			<p>This is the mail regarding to test whether the email verification is working or not using node JS</p>
			<h2>Thanks and Regards</h2>
			<h3>If you have any queries ask at pakkicode@gmail.com</h3>
			`
	};
	transporter.sendMail(mailOptions,function(err,info){
		if(err)
		{
			console.log("ERROR in sending email")
			console.log(err);
		}
		else
		{
			console.log("Email Sent");
			console.log(info);
		}
	});
	//Email verification end
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
	//Email verification start
	// let transporter = nodemailer.createTransport({
	// 	service:'gmail',
	// 	auth: {
	// 		type: 'OAuth2',
	// 		user: 'pakkicode@gmail.com',
	// 		clientId:'619484619705-aj76lio2024eov6p4pihdk48mlc778qi.apps.googleusercontent.com',
	// 		clientSecret: 'QaVWaQhLRO-QQGVUFBvVDjVo',
	// 		refreshToken: '1/LmHOuvMjdKNd14PdqzDnqJWmCY0uYAFqEQadSkD0_jo',
	// 		accessToken: 'ya29.GlvyBv7jS03a78iXf3ySz4ScOs3BKOv1ivoBtAM9qyYsVrni75BmyMwu7uhZDZt75AVRVkLMDZN54C1aMeOig4Dl0ogY6BUPS50qnCK5ZNYl9xiySYtZiXxoSG2i'
	// 	}
	// });
	//client ID: 619484619705-aj76lio2024eov6p4pihdk48mlc778qi.apps.googleusercontent.com
	//client secret: QaVWaQhLRO-QQGVUFBvVDjVo
	//Authorization code: 4/MwHwjoJfwrWfIYM5ySWIjx3Kp2FaSIglsKVUNmJJPwLhbXvO95VwXW7QPJOA4xTuI-aiLRBdPSgyV_XhcrPLADQ
	//Refresh token: 1/LmHOuvMjdKNd14PdqzDnqJWmCY0uYAFqEQadSkD0_jo
	//Access token: ya29.GlvyBv7jS03a78iXf3ySz4ScOs3BKOv1ivoBtAM9qyYsVrni75BmyMwu7uhZDZt75AVRVkLMDZN54C1aMeOig4Dl0ogY6BUPS50qnCK5ZNYl9xiySYtZiXxoSG2i
	
	// var mailOptions={
	// 	from:'pakkicode@gmail.com',
	// 	to:'pavanpakki007@gmail.com',
	// 	subject:'Confirmation mail',
		//text:'Hi Pavan, This is the mail regarding to test whether the email verification is working or not using node JS'
	// 	html:`
	// 		<h3>Hi Pavan,</h3>
	// 		<p>This is the mail regarding to test whether the email verification is working or not using node JS</p>
	// 		<h2>Thanks and Regards</h2>
	// 		<h3>If you have any queries ask at pakkicode@gmail.com</h3>
	// 		`
	// };
	// transporter.sendMail(mailOptions,function(err,info){
	// 	if(err)
	// 	{
	// 		console.log("ERROR in sending email")
	// 		console.log(err);
	// 	}
	// 	else
	// 	{
	// 		console.log("Email Sent");
	// 		console.log(info);
	// 	}
	// });
	//Email verification end
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

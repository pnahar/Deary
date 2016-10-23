/**
 * Routes file for Login
 */
var ejs = require("ejs");
var mysql = require('./mysql');
var session = require('client-sessions');

exports.search = function(req,res)
{
	console.log("hashtag.js hashtag "+req.param("hashtag"));
	// check user already exists
	var hashtagres;
	var usersres;
	var getHashtag="SELECT * FROM hashtag where hashtag like '%"+req.param("searchparam")+"%';";
	//console.log("gettweetidquery is "+insertTweet);
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			var getUsers="SELECT * FROM users where username like '%"+req.param("searchparam")+"%';";
			//console.log("gettweetidquery is "+insertTweet);
			mysql.fetchData(function(err,results2){
				if(err){
					throw err;
				}
				else 
				{
					//usersres = Array.from(results2);

					//console.log("search.js  users"+results2[0].username);
					res.render('search', { hashtag: results, users: results2 });
					//console.log("hashtag.js1 userid "+hashtagid);
					//json_responses = {"statusCode" : 101};
					//res.send(json_responses);
					//console.log("gettweetid is "+insertTweetId);



				}
			},getUsers);
		}
	},getHashtag);







	//console.log("hashtag.js2 hashtagid "+hashtagid);
	//var getTweets="select * from tweets where userid='"+req.session.userid+"' or userid in (select user2 from followers where user1='" + req.session.userid +"') order by id desc ";


}


//Check login - called when '/checklogin' POST call given from AngularJS module in login.ejs
exports.checklogin_bkp = function(req,res)
{
	var username, password;
	username = req.param("username");
	password = req.param("password");

	var json_responses;

	if(username!== ''  && password!== '')
	{
		console.log(username+" "+password);
		if(username === "test" && password === "test")
		{
			//Assigning the session
			req.session.username = username;
			console.log("Session initialized");
			json_responses = {"statusCode" : 200};
			res.send(json_responses);
		}
		else
		{
			json_responses = {"statusCode" : 401};
			res.send(json_responses);
		}
	}
	else
	{
		json_responses = {"statusCode" : 401};
		res.send(json_responses);
	}
};


//Redirects to the homepage
exports.redirectToHomepage = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("homepage",{username:req.session.username});
	}
	else
	{
		res.redirect('/');
	}
};


//Logout the user - invalidate the session
exports.logout = function(req,res)
{
	req.session.destroy();
	res.redirect('/');
};
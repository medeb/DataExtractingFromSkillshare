var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
geturl=req.body.link;
var name,data,students,follower;
request = require('request');
cheerio = require("cheerio");
var fs = require('fs');
dataA=[];
std=[];
request(geturl,function(err,resp,body){
	if(!err && resp.statusCode==200){
	$ = cheerio.load(body);
	follower=$('div.number').text();
	name = $('h1.full-name').text();
	//console.log("Channel Name : "+name+'\n');
	//console.log("Follower "+follower+"\n");
	$('p.title-link ','#page-wrapper').each(function(){
	data =$(this).text();
	//console.log(data+'\n');
	dataA.push(data);
	});

	//console.log(dataA+'\n');
	$('span.ss-icon-user.num-students.left').each(function(){
	students = $(this).text();
	std.push(students);
	});
	
	// HERE IT IS**********************************************************************************************************************************
	/*for(var i=0;i<dataA.length;i++){
        res.render('results', { co:dataA[i],nt:std[i],ent:follower });
	}*/
	
	var stream = fs.createWriteStream("views/data.ejs");
	stream.once('open', function(fd) {
	stream.write('<h1 style="color:red">'+name+"  " +follower+'</h1>'+'\n');
	for(var i=0;i<dataA.length;i++){
 	stream.write('<h3style="color:red">'+dataA[i]+'</h3>'+'<h3>'+std[i]+'</h3>'+'\n');
   	}
	stream.end();
	});
	

	/*for(var i=0;i<dataA.length;i++){
	console.log(dataA[i]+std[i]);
	}*/
	res.render('results');
	//});
	//console.log(std);
}
});




});

module.exports = router;

var express = require ("express");
var fs = require ("fs");
var url = require ("url");
var app = express();

app.use(express.static("www"));

app.get("/getall",function(req,res){
	fs.readFile("./data/data.json",function(err,data){
		var arr = JSON.parse(data.toString()).mapList;
		res.json({"mapList" : arr});
	})
})

app.get("/del",function(req,res){
	var id = url.parse(req.url , true).query.id;
	console.log(id);
	fs.readFile("./data/data.json",function(err,data){
		var arr = JSON.parse(data.toString()).mapList;
		arr = arr.filter(function(item){
			return item.id != id;
		})
		fs.writeFile("./data/data.json",JSON.stringify({"mapList" : arr}) , function(data){
			res.json({"mapList" : arr});
		});
	});
});
app.get("/changetitle",function(req,res){
	var id = url.parse(req.url , true).query.id;
	var title = url.parse(req.url , true).query.title;
	console.log(id);
	fs.readFile("./data/data.json",function(err,data){
		var arr = JSON.parse(data.toString()).mapList;
		arr.forEach(function(item){
			if(item.id == id){
				item.title = title
			}
		});
		fs.writeFile("./data/data.json",JSON.stringify({"mapList" : arr}) , function(data){
			res.json({"mapList" : arr});
		});
	});
});
app.get("/changedone",function(req,res){
	var id = url.parse(req.url , true).query.id;
	var done = url.parse(req.url , true).query.done == 1 ? true : false;

	fs.readFile("./data/data.json",function(err,data){
		var arr = JSON.parse(data.toString()).mapList;
		arr.forEach(function(item){
			if(item.id == id){
				item.done = done
			}
		});
		fs.writeFile("./data/data.json",JSON.stringify({"mapList" : arr}) , function(data){
			res.json({"mapList" : arr});
		});
	});
});
app.get("/add",function(req,res){
	var id = url.parse(req.url , true).query.id;
	var title = url.parse(req.url , true).query.title;

	fs.readFile("./data/data.json",function(err,data){
		var arr = JSON.parse(data.toString()).mapList;
		arr.push({
			id : id,
			title : title,
			done :false
		})
		fs.writeFile("./data/data.json",JSON.stringify({"mapList" : arr}) , function(data){
			res.json({"mapList" : arr});
		});
	});
});
app.listen(3000,function(){
	console.log("端口在3000");
})
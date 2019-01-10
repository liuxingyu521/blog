var express = require('express');
var path = require('path');
var portFinder = require('portfinder');

var app = express();

app.use('/blog', express.static('../_site'));

/*
* 请求过来优先匹配静态路径，
* 当请求不存在的路径时，才会走这个route
*/
app.get('*', function(req, res){
	var file404 = path.resolve(__dirname, '../_site/404.html');

	// 重定向到404
	// res.redirect(301, '/blog/404.html');
	res.status(404).sendFile(file404);
})

portFinder.basePort = 8888;
portFinder.getPort(function(err, port){
  if(err){
    console.log('查找空闲端口失败：', err);
  }else{
    app.listen(port);

    console.log('open http://localhost:' + port + '/blog');
  }
})

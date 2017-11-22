var express = require('express');

var app = express();

app.use('/blog', express.static('../_site'));

app.listen(4848);

console.log('open http://localhost:4848/blog');
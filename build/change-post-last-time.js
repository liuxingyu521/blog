var fs = require('fs');
var getFileTimes = require('file-times/get');

getFileTimes('../test.html').then(function(fileTime){
  var mTime = new Date(fileTime.modified).toLocaleString()
  console.log(`mTime: ${mTime}`);
  
  var file = fs.readFileSync('../test.html', { encoding: 'utf-8'});

  file = file.replace('${last-modified-time}', mTime)

  fs.writeFile('../test.html', file, function(err){
    if(!err){
      console.log('写入成功')
    }
  })

})





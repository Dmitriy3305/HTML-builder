const fs = require('fs');
const path = require('path');
const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
let filecСontent = '';
readStream.on('data', function(chunk){
    filecСontent += chunk;
    console.log(filecСontent);
})
readStream.on('error', error => console.log('Error', error.message));


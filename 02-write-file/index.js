const fs = require('fs');
const writeStream = fs.createWriteStream('02-write-file/text.txt'); 
const { stdin, stdout } = process;

stdout.write('Good time of day! Enter the text to check:\r\n');
stdin.on('data', function(enteredText) {
  if (enteredText.toString() === 'exit\r\n') {
    process.exit();
  } else if (process.on('SIGINT', function() {
    process.exit();
  }));
  writeStream.write(enteredText);
});
process.on('exit', function() {
  stdout.write('Check completed, goodbye!');
});

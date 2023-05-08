const path = require('path');
const fs = require('fs');
const {mkdir} = require('fs/promises');
const {readdir} = require('fs/promises');
const {rm} = require('fs/promises');
const {copyFile} = require('fs/promises');
const original = path.join(__dirname, 'files');
const originalCopy = path.join(__dirname, 'files-copy');

fs.mkdir(originalCopy, { recursive: true }, err => {
   if(err) throw err;
});

(async function () {
    await rm(originalCopy, {recursive: true});
    await mkdir(originalCopy);
    copyDir(original, originalCopy);
})();

async function copyDir(dirOriginal, dirOriginalCopy) {
    try {
        const files = await readdir(dirOriginal, {withFileTypes: true});
        for (let item of files) {
          if (item.isFile()) {
           await copyFile(`${dirOriginal + '//' + item.name}`,`${dirOriginalCopy + '//' + item.name}`);
          } else if (item.isDirectory()) {
            await mkdir(`${dirOriginalCopy + '//' + item.name}`);
            await copyDir(`${dirOriginal + '//' + item.name}`, `${dirOriginalCopy + '//' + item.name}`);
          }
        };
    } catch (error) {
        if(err) throw err;
    }

}




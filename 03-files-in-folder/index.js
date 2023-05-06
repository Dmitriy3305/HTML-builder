const fs = require("fs");
const path = require("path");
const {readdir} = require("fs/promises");
const dir = path.join(__dirname, "secret-folder");

readdir(dir, { withFileTypes: true }).then((files) => {
  for (let item of files) {
    if (item.isFile()) {
      const itemPath = path.join(dir, item.name);
      const itemInfo = path.parse(itemPath);
      fs.stat(path.join(dir, item.name), (err, stats) => {
        if (err) throw err;
        console.log(
            itemInfo.name +
            " - " +
            path.extname(itemPath).substring(1) +
            " - " +
            stats.size / 1000 +
            " kb"
        );
      });
    }
  }
});

const fs = require("fs");
const path = require("path");
const { readdir } = require("fs/promises");
const cssPath = path.join(__dirname, "styles");

fs.writeFile("./05-merge-styles/project-dist/bundle.css", " ", (err) => {
  if (err) throw err;
});

readdir(cssPath, { withFileTypes: true }).then((files) => {
  for (let item of files) {
    if (item.name.split(".").pop() === "css" && item.isFile() === "true") {
      fs.readFile(path.join(cssPath, item.name), "utf8", (err, data) => {
        if (err) throw err;
        fs.appendFile(
          "./05-merge-styles/project-dist/bundle.css",
          data,
          (err) => {
            if (err) throw err;
          }
        );
      });
    }
  }
});

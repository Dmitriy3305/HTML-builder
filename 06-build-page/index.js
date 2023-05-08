const fs = require("fs");
const path = require("path");
const { readdir } = require("fs/promises");
const { mkdir } = require("fs/promises");
const { rm } = require("fs/promises");
const { copyFile } = require("fs/promises");
const templatePath = path.join(__dirname, "template.html");
const componentsPath = path.join(__dirname, "components");
const cssPath = path.join(__dirname, "styles");
const original = path.join(__dirname, "./assets");
const originalCopy = path.join(__dirname, "./project-dist/assets");
//creating a folder
fs.mkdir("./06-build-page/project-dist", { recursive: true }, (err) => {
  if (err) throw err;
});
//generation index.html
fs.readFile(templatePath, "utf8", (err, templateHtml) => {
  if (err) throw err;
  try {
    fs.readdir(componentsPath, (err, files) => {
      for (let item of files) {
        const componentPath = path.join(componentsPath, item);
        fs.readFile(componentPath, "utf8", (err, component) => {
          const nameTag = `{{${path.basename(item, path.extname(item))}}}`;
          templateHtml = templateHtml.replace(nameTag, component);
          if (
            path.basename(item, path.extname(item)) ===
            path.parse(files[files.length - 1]).name
          ) {
            const outputPath = path.join(
              __dirname,
              "project-dist",
              "index.html"
            );
            fs.writeFile(outputPath, templateHtml, (err) => {
              if (err) throw err;
            });
          }
        });
      }
    });
  } catch {
    if (err) throw err;
  }
});
//generation style.css
fs.writeFile("./06-build-page/project-dist/style.css", " ", (err) => {
  if (err) throw err;
});

readdir(cssPath, { withFileTypes: true }).then((files) => {
  for (let item of files) {
    if (item.name.split(".").pop() === "css" && item.isFile() === true) {
      fs.readFile(path.join(cssPath, item.name), "utf8", (err, data) => {
        if (err) throw err;
        fs.appendFile("./06-build-page/project-dist/style.css", data, (err) => {
          if (err) throw err;
        });
      });
    }
  }
});
//copying assets
fs.mkdir(originalCopy, { recursive: true }, (err) => {
  if (err) throw err;
});

(async function () {
  await rm(originalCopy, { recursive: true });
  await mkdir(originalCopy);
  copyDir(original, originalCopy);
})();

async function copyDir(dirOriginal, dirOriginalCopy) {
  try {
    const files = await readdir(dirOriginal, { withFileTypes: true });
    for (let item of files) {
      if (item.isFile()) {
        await copyFile(
          `${dirOriginal + "//" + item.name}`,
          `${dirOriginalCopy + "//" + item.name}`
        );
      } else if (item.isDirectory()) {
        await mkdir(`${dirOriginalCopy + "//" + item.name}`);
        await copyDir(
          `${dirOriginal + "//" + item.name}`,
          `${dirOriginalCopy + "//" + item.name}`
        );
      }
    }
  } catch (error) {
    if (err) throw err;
  }
}

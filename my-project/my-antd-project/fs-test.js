const fs = require('fs');

//const flag = fs.writeFileSync('text.js', 'test', 'utf8');
//console.log(flag);
// const obj = fs.readFileSync('config.json', 'utf8');
const fileTypeArray = ['js', 'ts', 'jsx', 'tsx'];
const appendString = '//这是要添加的文字aaaaaaaa\n';

// const config = JSON.parse(obj);
// const newString = fs.readFileSync('text.js', 'utf8');
// const newData = '//1111' + '\n' + newString;
// fs.writeFileSync('text.js', newString, 'utf8');
// const oPath = fs.readdirSync('src', 'utf8');
// console.log(oPath);

// console.log(fs.statSync('src/test.js').isDirectory()); //判断是否为文件夹

function doAppendString(path) {
  const oPath = fs.readdirSync(path, 'utf8');
  oPath.forEach(function(item, index) {
    let newPath = `${path}/${item}`;
    if (fs.statSync(newPath).isDirectory()) {
      doAppendString(newPath); //是文件夹
    } else {
      const newString = fs.readFileSync(newPath, 'utf8');

      const fileType = item
        .split('.')
        .pop()
        .toLocaleLowerCase();
      if (
        fileTypeArray.includes(fileType) &&
        newString.substr(0, 10) !== appendString.substr(0, 10)
      ) {
        fs.writeFileSync(newPath, appendString, 'utf8');
      }
    }
  });
}
doAppendString('src');

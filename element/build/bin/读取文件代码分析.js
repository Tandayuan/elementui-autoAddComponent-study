const path = require('path');
const fs = require('fs');

// const navConfigFile = require('../../examples/nav.config.json');
// console.log(typeof navConfigFile);

// const sassPath = path.join(__dirname, '../../packages/theme-chalk/src/index.scss');
// const jStr = fs.readFileSync(sassPath, { encoding: 'utf-8' });
// const sassStrFile = `${jStr}@import "./heihei.scss";`;
// console.log(sassStrFile);

// const navConfigFile = path.join(__dirname, '../../examples/nav.config.json');
// const k = fs.readFileSync(navConfigFile, { encoding: 'utf-8' });
// console.log(k);

const curFP = path.join(__dirname, 'test.txt');
const writeStream = fs.createWriteStream(curFP, { flags: 'a' });
writeStream.write('谭达源的一些可写流数据');
writeStream.end();
writeStream.on('finish', () => {
  console.log('Write file finish.');
});


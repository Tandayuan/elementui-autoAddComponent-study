// 示例一：从字符串创建 Blob
const parts = ['<html><h2>Hello Semlinker</h2></html>'];
const myBlob = new Blob(parts, { type: 'text/html' });
// console.log(myBlob.size, "字节大小");
// console.log(myBlob.type, "MIME类型");

// 示例二：从类型化数组和字符串创建 Blob
const tdy = new Uint8Array([84, 66, 89]); //  参照ASCII码
const tdyBlob  = new Blob([tdy, '和', 'LP'], { type: 'text/plain' });
(async function test(){
  const t = await tdyBlob.text();
  console.log(t, "UTF-8文本内容");
})()
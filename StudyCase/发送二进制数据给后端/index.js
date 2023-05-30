const fileUpload = document.querySelector("#fileUpload");
fileUpload.style.opacity = 0;
fileUpload.addEventListener('change', async (event)=>{
    const fileList = fileUpload.files;
    console.log(fileList);
    if(fileList.length > 0){
        const imageFile = fileList[0];
        const mimeType = imageFile.type;
        // 创建Base64编码的字符串 File 转 Base64
        const base64Str = await promisify(fileToBase64, imageFile);
        const u8Array = base64ToUint8Array(base64Str, mimeType);
        // 得到Blob实例对象
        const blobObj = uint8ArrayToBlobOrFile(u8Array, mimeType);
        // 模拟发送二进制数据给后端
        function sendData(blobData) {
            console.log("发送到后端成功，发送的二进制数据：", blobData);
        }
        sendData(blobObj);
        // end
        // 特别需求：Blob 转 File 
        const toFile = blobToFile(blobObj, "Test.png", "image/jpeg");
        console.log("特别需求:Blob 转 File", toFile);
        // 特别需求：Base64 转 File；其中 Base64 转 Uint8Array 步骤上面有重复直接引用即可
        const fileObj = uint8ArrayToBlobOrFile(u8Array, "image/jpeg", false, "fileObj.png");
        console.log("特别需求:Base64 转 File", fileObj);
    }
})
function promisify(fn, ...args) {
    return new Promise((res, rej)=>{
        args.push((returnVal)=>{
            if(returnVal){
                res(returnVal)
            }
        })
        Reflect.apply(fn, this, args)
    })
}
// File 转 Base64
async function fileToBase64(file, callback) {
    // 创建Base64编码的字符串
    const fileReader = new FileReader();
    fileReader.addEventListener("load", function(){
        const base64Str = fileReader.result;
        callback(base64Str);
    })
    fileReader.readAsDataURL(file);
}
// Base64 转 Uint8Array
function base64ToUint8Array(base64Str) {
    // Data URL由四个部分组成：前缀（data:）、指示数据类型的 MIME 类型、如果非文本则为可选的 base64 标记、数据本身；
    // data:image/jpeg;base64,base64Data
    const base64Data = base64Str.split(",")[1];
    // atob() 解码通过 Base-64 编码的字符串数据（“atob”应读作“ASCII to binary”），返回的值是二进制数据“字符串”。
    const binaryBytes = window.atob(base64Data);
    // 创建可操作的二进制数据缓冲区视图数组（TypedArray类型是Uint8Array）
    const arrayBuffer = new ArrayBuffer(binaryBytes.length);
    const u8Array = new Uint8Array(arrayBuffer);
    for (let index = 0; index < binaryBytes.length; index++) {
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
        // 返回当前索引字符在Unicode中的字节编码
        const charCode = binaryBytes.charCodeAt(index);
        // Uint8Array中的元素类型是字节（单字节由8位组成）编码，它被表示为0到255（2^8）之间的整数。
        // 字节编码由于只涉及到Unicode中的前256位，所以字节编码映射的字符可以参考ASCII码表。
        u8Array[index] = charCode;
    }
    return u8Array;
}
// Uint8Array 转 Blob/File
function uint8ArrayToBlobOrFile(u8Array, mimeType, isToBlob = true, fileName) {
    if(isToBlob) return new Blob([u8Array], { type: mimeType });
    return new File([u8Array], fileName, { type: mimeType });
}
// Blob 转 File 
function blobToFile(blobData, fileName, fileType) {
    return new File([blobData], fileName, { type: fileType });
}
const fileUpload = document.querySelector("#fileUpload");
const previewBox = document.querySelector("#previewBox");
const img = document.querySelector("img");
fileUpload.style.opacity = 0;

fileUpload.addEventListener('change', async (event)=>{
    const fileList = fileUpload.files;
    console.log(fileList);
    if(fileList.length > 0){
        const imageFile = fileList[0];
        const imgBox = document.createElement("img");
        imgBox.width = 500;
        imgBox.height = 500;

        // 创建File对象的URL映射
        // const imageFileUrlStr = URL.createObjectURL(imageFile);
        // imgBox.src = imageFileUrlStr;
        // previewBox.appendChild(imgBox);

        // 创建Base64编码的字符串
        const fileReader = new FileReader();
        fileReader.addEventListener("load", function(){
            const base64Data = fileReader.result;
            imgBox.src = base64Data;
            previewBox.appendChild(imgBox);
        })
        fileReader.readAsDataURL(imageFile);
    }
})

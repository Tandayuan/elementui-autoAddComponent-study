function downloadToFile(fileName, blobData) {
    const a = document.createElement("a");
    a.download = fileName;
    const blobStr = URL.createObjectURL(blobData);
    a.href = blobStr;
    a.click();
    a.remove();
    URL.revokeObjectURL(blobStr);
}
const btn = document.querySelector("#btn");
btn.addEventListener("click", ()=> {
    const fileName = "简单的文本.txt";
    const blob = new Blob(["谭达源的数据~"], { type: "text/plain" });
    downloadToFile(fileName, blob);
})
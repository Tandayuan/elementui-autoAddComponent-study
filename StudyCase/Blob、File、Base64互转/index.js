// 参考文章：https://blog.csdn.net/BaymaxCSDN/article/details/108077233
/**
 * File 转 Base64 (Blob 转 Base64)
 * 应用场景：预览本地上传的图片
 * 思路：利用FileRender的readAsDataURL()实现
 * 代码路径：StudyCase\预览本地上传的图片
 */
/**
 * File 转 Blob (过程包含：Base64 转 Blob)
 * 应用场景：获取上传的文件对象，转换为二进制数据对象，发送给后端。
 * 思路：
 * 利用FileRender的readAsDataURL()获取 Base64编码字符串；
 * Base64编码字符串转换成Uint8Array的二进制缓冲对象，作为参数传入Blob构造函数创建Blob实例对象。
 * 代码路径：StudyCase\发送二进制数据给后端
 */
/**
 * Blob 转 File 
 * 应用场景：有需求转换时
 * 思路：File的构造函数传入对应的Blob、文件名、MIME文件类型即可完成转换。
 * 代码路径：StudyCase\发送二进制数据给后端
 */
/**
 * Base64 转 File
 * 应用场景：有需求转换时
 * 思路：Base64 转 Uint8Array File的构造函数传入对应的Uint8Array、文件名、MIME文件类型即可完成转换。
 * 代码路径：StudyCase\发送二进制数据给后端
 */
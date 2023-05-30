# element-ui自动新增组件方式学习
# 参考资料
[process对象](http://javascript.ruanyifeng.com/nodejs/process.html)

[Makefile入门了解](https://zhuanlan.zhihu.com/p/56489231)

[原文地址](https://juejin.cn/post/7031331765482422280)

**重点查看：[前端文件操作 File, Blob, ArrayBuffer 以及FileReader](https://blog.csdn.net/qfc_128220/article/details/122233317)**

[你不知道的 Blob](https://mp.weixin.qq.com/s/lQKTCS_QB0E62SK9oXD4LA)

[ArrayBuffer与Unit8Array的基础知识](https://mp.weixin.qq.com/s?__biz=MzI2MjcxNTQ0Nw==&mid=2247484317&idx=1&sn=c0b397b6bd5fdfced0c1bebc187a7c0d&chksm=ea47a2c5dd302bd37b285f65dd7a92df8ca1bc213465091e82a28be08ec5808b905e9fb69bec&scene=21#wechat_redirect)

**重点查看**：[一文看懂ASCII,UNICODE,UTF8编码规则](https://zhuanlan.zhihu.com/p/475820456)

[常见编码问题解惑](https://www.unicode.org/faq/utf_bom.html)

# 学习目标
+ [x] 了解Makefile的作用
+ [x] 学习涉及NodeJs知识相关的Api
+ [x] 学习流(Stream)、Blob、文件(File)的定义
+ [x] 学习Base64、Blob、File 三种类型的相互转换
+ [x] 学习主流编码规则的特点(UTF-8、ASCII、GBK……)
+ [ ] 学习npm包`file-save`在本项目的应用

# 了解Makefile的作用

一个自动化脚本，执行预设好的脚本。

# 学习涉及NodeJs知识相关的Api

+ [fs 文件系统 | Node.js v20.2.0 文档 (nodejs.cn)](https://nodejs.cn/api/fs.html#fsreadfilesyncpath-options)

  > 同步读取文件的所有内容，如果没有指定编码返回的是二进制数据缓冲对象，否则返回按指定编码生成的字符串。
  >
  > ```js
  > const path = require('path');
  > const fs = require('fs');
  > // 读取json文件为字符串示例：
  > const navConfigFile = path.join(__dirname, '../../examples/nav.config.json');
  > const k = fs.readFileSync(navConfigFile, { encoding: 'utf-8' });
  > console.log(k);
  > // 读取sass文件为字符串示例：
  > const sassPath = path.join(__dirname, '../../packages/theme-chalk/src/index.scss');
  > const jStr = fs.readFileSync(sassPath, { encoding: 'utf-8' });
  > const sassStrFile = `${jStr}@import "./heihei.scss";`;
  > console.log(sassStrFile);
  > ```

+ `path.join()：join方法上的所有参数拼接成字符串路径` 

+ `__dirname`：

  在node.js中，__dirname是一个内置变量，表示当前文件所在的目录的绝对路径。它是一个全局变量，可以在任何地方使用。__dirname是通过node.js内置的模块path获取的，它与当前文件的物理位置有关，而不是与执行node命令的位置有关。在使用__dirname时，通常会结合其他模块路径一起使用，例如：

  ```js
  const path = require('path');
  // 获取当前文件所在目录的绝对路径
  const filePath = path.join(__dirname, 'file.txt');
  ```

  上述代码中，使用了node.js内置的path模块将文件名'file.txt'与__dirname拼接起来，形成文件的完整路径。这样可以避免硬编码文件路径，使代码更具可移植性。

+ `process.exit()`：中止nodejs进程的方法。

+ `process.argv`

  在node.js中，process.argv是一个包含当前进程的命令行参数的数组。它是一个全局变量，可以在任何地方使用。

  process.argv的第一个元素是node.js的可执行文件的绝对路径，第二个元素是当前执行的JavaScript文件的绝对路径。从第三个元素开始，便是传递给JavaScript文件的命令行参数。

  例如，在以下命令中，'test.js'是node.js执行的JavaScript文件，'apple'和'banana'是传递给test.js的两个命令行参数：

  ```
  node test.js apple banana
  ```

  此时，在test.js文件中，可以通过process.argv获取到以下数组：

  ```
  [
    '/usr/local/bin/node',
    '/Users/user/test.js',
    'apple',
    'banana'
  ]
  ```

  从数组中可以看到，process.argv是以字符串形式呈现的，如果需要将其中的参数转换为其他类型，例如数字或布尔值，则需要进行类型转换。如果需要解析命令行参数，可以使用第三方模块，如commander、yargs等。

# 学习流(Stream)、Blob、文件(File)的定义

+ [文件(File)](https://developer.mozilla.org/zh-CN/docs/Web/API/File)：

  > 文件（**`File`**）接口提供有关文件的信息，并允许网页中的 JavaScript 访问其内容。`File` 接口也继承了 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 接口的属性和方法。`File` 对象是特殊类型的 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)；File对象通常情况下来自于用户在input[type=file]的标签上选择文件后返回的对象。

+ [Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)：

  > 表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取。二进制的格式可以让Window电脑读取到；它可以转换成 [`ReadableStream`](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream) 来用于数据操作。要获取用户文件系统上的文件对应的 `Blob` 对象，请参阅 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 文档。

+ [流(Stream)](https://developer.mozilla.org/zh-CN/docs/Web/API/Streams_API)：

  > 流会将你想要从网络接受的资源分成一个个小的分块，然后按位处理它。这正是浏览器在接收用于显示 web 页面的资源时做的事情——视频缓冲区和更多的内容可以逐渐播放，有时候随着内容的加载，你可以看到图像逐渐地显示。
  >
  > **PS:**[关于流的代码示例，理解会更深刻。](https://developer.mozilla.org/zh-CN/docs/Web/API/Streams_API#%E7%A4%BA%E4%BE%8B)


# 学习Base64、Blob、File 三种类型的相互转换

+ 学习Demo地址：`StudyCase`文件夹
+ 参考文章：[Base64、Blob、File 三种类型的相互转换 最详细](https://blog.csdn.net/BaymaxCSDN/article/details/108077233)

# 学习主流编码规则的特点(UTF-8、ASCII、GBK……)

> 计算机按照二进制形式存储和读取数据。为了让人类能够看得懂，二进制数据通过某个编码规则映射对应的字符。常见的编码规则由UTF-8、ASCII、GBK。
>
> 它们具体转换成字符的方法如下文：
>
> [一文看懂ASCII,UNICODE,UTF8编码规则](https://zhuanlan.zhihu.com/p/475820456)

> Unicode 和 UTF-8 的对应关系 ？
>
> **码位**是表示文本的系统（例如 Unicode）中用于表示抽象字符的数值。
>
> 在 Unicode 中，码位以“U+1234”的形式表示，其中的“1234”是分配的数值。Unicode中A字符的码位是：U+0041；
>
> Unicode 转换格式 (UTF) 是从每个 Unicode 码位（代理代码点除外）到唯一字节序列的算法映射。我的理解是，utf-8的算法解析Unicode的码位变成二进制位数据，再把这些数据以8位组成单个字节以及utf-8的其他算法组成唯一字节序列。（utf-8的算法映射详解：[一文看懂ASCII,UNICODE,UTF8编码规则](https://zhuanlan.zhihu.com/p/475820456)）

# 学习npm包`file-save`在本项目的应用

# DIY-UI-frame-by-Vue-for-input
* 本节是在[DIY-UI-frame-by-Vue](https://github.com/bomber063/DIY-UI-frame-by-Vue)的基础上继续写轮子。
## 解决一个BUG（因为增加了mocha库，但是并未完全下载它的全部依赖de-indent，再次运行parcel会报错）
* 运行下面代码报错
```
npx parcel index.html --no-cache
```
* 报错信息如下:
```
×  Cannot find module 'de-indent'
```
* 所以需要安装de-indent依赖，可以直接安装,这种方式你的package.json会告诉你安装了什么。但是node_modules会增加100多MB的文件
```
npm i de-indent
```
* 也可以运行`npm i`，不过这种方式你的package.json不会告诉你安装了啥。同样node_modules会增加100多MB的文件。
* **因为我的git hub仓库是忽略了node_modules的**，所以并没有记录这里面的变化，所以当时查询以往记录的时候没有查询到
* 具体可以见[de-indent在git-hub上面的说明](https://github.com/yyx990803/de-indent)和[de-indent在npm的说明](https://www.npmjs.com/package/de-indent)


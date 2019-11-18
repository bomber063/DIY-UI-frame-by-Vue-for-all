## tabs组件
### 问题解答
#### github的警告提示
* git hub上有一个警告，内容为发现了一个潜在安全隐患在你的依赖（第三方库）里面
```
We found a potential security vulnerability in one of your dependencies
```
* 这么说的意思，可以推测部分依赖可能存在某种**病毒**,可以搜索到阮一峰的推特上面在**2018年7月13日**有说道ESLint的两个组件库的npm账户被窃，注入了恶意代码。会偷窥用户的`.npmrc`文件，里面包含用户发布到npm的token,为了这件事,npm把所有token都作废了。
* 这个`.npmrc`文件里面会有一些npm的publish的token,只要别人拿到这个token就可以伪装是真正的发布者来发布这个包。
* 一般可以点击Review vulnerable dependency进去看看，如果你也不知道，或者看不懂，就点击Dismiss忽略掉就好了。
#### cnpm问题
* 建议卸载掉cnpm,因为这个库的维护已经不是很活跃了。直接用npm就可以了，但是npm在大陆比较慢，但是之前有说过[可以设置淘宝的源](https://github.com/bomber063/DIY-UI-frame-by-Vue)可以解决这个问题。
* 为什么放弃cnpm，可以查看这篇文章——[是时候放弃用 cnpm 命令了](https://cnodejs.org/topic/552212ba01b6c9310d8e9959)
#### npm和yarn
* 如果一个项目里面最好只用一个，不要npm和yarn混着用，可能会出问题。
#### windows的&&命令不支持
* 就是package.json里面的test里面的用到一个`&`符号。它是让前面的一个命令`parcel watch test/* --no-cache`运行后保持在后台，然后同时运行后面的命令`--no-cache & karma start`。但是windows不支持这个符号
```
    "dev-test": "parcel watch test/* --no-cache & karma start",
```
* [解决的方案前面也说过了](https://github.com/bomber063/DIY-UI-frame-by-Vue),就是
    * 将 dev-test 对应的命令 parcel watch test/* --no-cache & karma start 分别运行，运行方式如下
    * 新开一个 Git Bash 窗口运行 npx parcel watch test/* --no-cache
    * 再开一个 Git Bash 窗口运行 npx karma start
#### vue有什么好的文章推荐
* 看Vue官网就好了
### 在
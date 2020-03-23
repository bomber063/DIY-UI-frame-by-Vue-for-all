## 轱辘 - 一个 Vue UI 组件
[![Build Status](https://travis-ci.org/bomber063/DIY-UI-frame-by-Vue-for-all.svg?branch=master)](https://travis-ci.org/bomber063/DIY-UI-frame-by-Vue-for-all)

### 介绍
* 这是我在学习 Vue 过程中做的一个 UI 框架，希望对你有用。

### 开始使用
1. 添加 CSS 样式 使用本框架前，请在 CSS 中开启 border-box
    ```
    *,*::before,*::after{box-sizing: border-box;}
    ```
    IE 8 及以上浏览器都支持此样式。
    
    你还需要设置默认颜色等变量（后续会改为 SCSS 变量）
    ```
    html {
      --button-height: 32px;
      --font-size: 14px;
      --button-bg: white;
      --button-active-bg: #eee;
      --border-radius: 4px;
      --color: #333;
      --border-color: #999;
      --border-color-hover: #666;
    }
    ```
    IE 15 及以上浏览器都支持此样式。
2. 安装 gulu
    ```
    npm i --save gulu-bomber
    ```
3. 引入 gulu
    ```
    import {Button, ButtonGroup, Icon} from 'gulu-bomber'
    import 'gulu-bomber/dist/index.css'
    
    export default {
      name: 'app',
      components: {
        'g-button': Button,
        'g-icon': Icon
      }
    }
    ```
### 文档
[官方文档](https://bomber063.github.io/DIY-UI-frame-by-Vue-for-all/)
### 提问
[Issues](https://github.com/bomber063/DIY-UI-frame-by-Vue-for-all/issues)
### 联系方式
邮箱：tangyihong063@163.com
### 贡献代码
[Pull request](https://github.com/bomber063/DIY-UI-frame-by-Vue-for-all/pulls)
### 变更记录
具体见提交commits。




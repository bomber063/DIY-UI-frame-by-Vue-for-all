---
title:快速上手
---
# 快速上手

## 安装
参考[安装](../install)章节

## 添加 CSS 样式 
* 使用本框架前，请在 CSS 中开启 border-box
```css
*,*::before,*::after{box-sizing: border-box;}
```
IE 8 及以上浏览器都支持此样式。
   
* 设置默认颜色等变量（后续会改为 SCSS 变量）
```css
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

## 快速上手(vue-cli为例)
* 通过[vue-cli](https://cli.vuejs.org/zh/guide/installation.html)
* 如果前面使用的是npm安装，那么vue-cli也要安装配置的时候选择npm才可以，如果选择yarn会报错。
* 根据提示：进入到 hello-world，运行server
```sh
 $ cd hello-world
 $ npm run serve
```
## 推荐通过yarn安装
* 安装gulu-bomber
```sh
yarn add gulu-bomber
```

* 引入CSS
```sh
import 'gulu-bomber/dist/index.css'
```
* 组件的名字
```js
import Button from './src/button'
import ButtonGroup from './src/button-group'
import Icon from './src/icon'
import Col from './src/col'
import Collapse from './src/collapse'
import CollapseItem from './src/collapse-item'
import Content from './src/content'
import Footer from './src/footer'
import Header from './src/header'
import Input from './src/input'
import Layout from './src/layout'
import Plugin from './src/plugin'
import Popover from './src/popover'
import Row from './src/row'
import Sider from './src/sider'
import Svg from './src/tabs'
import TabsBody from './src/tabs-body'
import TabsHead from './src/tabs-head'
import TabsItem from './src/tabs-item'
import TabsPane from './src/tabs-pane'
import Toast from './src/toast'

export {Button,ButtonGroup,Icon,Col,Collapse,CollapseItem,Content,Footer,Header,Input,Layout,Plugin,Popover,Row,Sider,Svg,TabsBody,TabsHead,TabsItem,TabsPane,Toast}
```
* 使用哪个组件就引入哪个组件的名字，比如需要使用button及popover组件
```js
import {Button} from 'gulu-bomber'
import {Popover} from 'gulu-bomber'

import 'gulu-bomber/dist/index.css'

export default {
  name: 'app',
  components: {
    'g-button':Button,
    'g-popover':Popover
  }
}
```

## 通过npm安装
```sh
npm install gulu-bomber
```

* 引入CSS和组件名字同上

* 使用哪个组件就引入哪个组件的名字。
    * <strong>可能</strong>需要有全部路径。
    * <strong>可能</strong>提示需要安装node-sass和sass-loader。
```js
import {Button} from 'gulu-bomber'
import {Popover} from 'gulu-bomber'

import 'gulu-bomber/dist/index.css'

export default {
  name: 'app',
  components: {
    'g-button':Button,
    'g-popover':Popover
  }
}
```






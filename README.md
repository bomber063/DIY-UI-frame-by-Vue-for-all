## 默认布局
### 我们先看需求，可以参考已有的框架
* 第一个参考是[ant.design的布局Layout](https://ant.design/components/layout-cn/)
    1. 上-Header,中-Content,下-Footer
    ```
    <g-layout>
        <g-header></g-header>
        <g-content></g-content>
        <g-footer></g-footer>
    </g-layout>
    ```
    2. 上-Header,中(左边窄Sider,右边宽Content),下-Footer
    ```
        <g-layout>
            <g-header></g-header>
            <g-layout>
                <g-sider></g-sider>
                <g-content></g-content>
            </g-layout>
            <g-footer></g-footer>
        </g-layout>
    ```
    3. 上-Header,中(左边宽Content,右边窄Sider,),下-Footer
    ```
            <g-layout>
                <g-header></g-header>
                <g-layout>
                    <g-content></g-content>
                    <g-sider></g-sider>
                </g-layout>
                <g-footer></g-footer>
            </g-layout>
    ```
    4. 左-Sider,右(上-Header,中-Content,下-Footer)
    ```
            <g-layout>
                <g-sider></g-sider>
                <g-layout>
                    <g-header></g-header>
                    <g-content></g-content>
                    <g-footer></g-footer>
                </g-layout>
            </g-layout>
    ```
* 第二参考是[element的布局容器container](https://element.eleme.cn/#/zh-CN/component/container),它跟ant.design是一样的，不过它重复用的是container
### 知道需求我们开始写代码
* 首先我们创建content，footer,layout,sider组件。


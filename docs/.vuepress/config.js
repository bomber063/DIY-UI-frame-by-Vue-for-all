module.exports = {
    title: '轱辘UI',
    description: '一个好用的UI框架',
    themeConfig: {
        sidebar: [
            // '/',
            //这里的install目录所以需要加斜杆。
            {
                title: '入门',
                children: [
                    '/install/',
                    // ['/get-started/','Explicit link text'],
                    //上面这句话是把/get-started/路径，但是名字按照Explicit link text显示
                    '/get-started/',
                ]
            },
            {
                title: '组件',
                children: [ '/components/button' ]
            },
        ]
    }
}
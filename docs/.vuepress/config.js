module.exports = {
    base:'/DIY-UI-frame-by-Vue-for-all/',
    title: '轱辘UI',
    description: '一个好用的UI框架',
    themeConfig: {
        nav: [
            {text: '主页', link: '/'},
            {text: '文档', link: '/guide/'},
            {text: '交流', link: 'https://google.com'},
        ],
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
                children: [
                    '/components/button',
                    '/components/grid',
                    '/components/input',
                    '/components/layout',
                    '/components/popover',
                    '/components/tabs',
                    '/components/toast',
                ]
            },

        ]
    }
}
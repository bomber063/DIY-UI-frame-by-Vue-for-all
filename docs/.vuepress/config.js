module.exports = {
    base:'/DIY-UI-frame-by-Vue-for-all/',
    title: 'gulu-bomber',
    description: '一个好用的UI框架',
    themeConfig: {
        nav: [
            {text: '主页', link: 'https://bomber063.github.io/DIY-UI-frame-by-Vue-for-all/'},
            {text: '欢迎star', link: 'https://github.com/bomber063/DIY-UI-frame-by-Vue-for-all'},
            {text: 'Github', link: 'https://github.com/bomber063'},
        ],
        sidebar: [
            {
                title: '介绍',
                collapsable: false,
                sidebarDepth: 0,    // 可选的, 默认值是 1
                children: [
                    '/introduce/',
                ]
            },
            // '/',
            //这里的install目录所以需要加斜杆。
            {
                title: '入门',
                collapsable:false,
                sidebarDepth: 0,    // 可选的, 默认值是 1
                children: [
                    '/install/',
                    // ['/get-started/','Explicit link text'],
                    //上面这句话是把/get-started/路径，但是名字按照Explicit link text显示
                    '/get-started/',
                ]
            },
            {
                title: '组件',
                collapsable:false,
                children: [
                    '/components/button',
                    '/components/grid',
                    '/components/input',
                    '/components/layout',
                    '/components/popover',
                    '/components/tabs',
                    '/components/toast',
                    '/components/collapse',
                ]
            },

        ]
    }
}
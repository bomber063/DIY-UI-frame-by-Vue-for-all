//我们没有import vue ,这个vue是外面的app.js通过Vue.use(plugin)传进来的
import Toast from './toast'
export default {
    install(Vue,options){
        Vue.prototype.$toast=function(message,toastOptions){
            let Constructor=Vue.extend(Toast)
            let toast=new Constructor({
                propsData:
                    toastOptions
                    // closeButton:{
                    //     text:'知道了',
                    //     callback(){
                    //         console.log('用户说他知道了')
                    //         console.log()
                    //     }
                    // }


            })//toast.vue组件创造的实例就是toast
            toast.$slots.default=message//这个toast.$slots.default必须要放到$mount()之前,他是给toast传了一个默认的插槽slot的内容
            toast.$mount()//这句话是使toast的所有生命周期的钩子执行
            document.body.appendChild(toast.$el)//如果没有提供 elementOrSelector 参数，这个参数就是vm.$mounte(elementOrSelector)里面的参数，模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。
        }
    }
}
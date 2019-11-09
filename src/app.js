import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'
import Input from './input'
import Row from './row'
import Col from './col'
import Sider from './sider'
import Content from './content'
import  Footer from './footer'
import  Header from './header'
import Layout from './layout'
import Toast from './toast'
import plugin from './plugin.js'

Vue.component('g-button', Button)
Vue.component('g-icon', Icon)
Vue.component('g-button-group', ButtonGroup)
Vue.component('g-input', Input)
Vue.component('g-row', Row)
Vue.component('g-col', Col)
Vue.component('g-layout', Layout)
Vue.component('g-header', Header)
Vue.component('g-footer', Footer)
Vue.component('g-sider', Sider)
Vue.component('g-content', Content)
Vue.component('g-toast', Toast)
Vue.use(plugin)//这个use会去执行plugin里面的install方法,并且这个是用户主动写的


// console.log(Button.props.loading)
new Vue({
    el: '#app',
    data: {
        loading1: false,
        loading2: true,
        loading3: false,
        message:'hi'
    },
    created(){
        // setTimeout(()=>{
        //     // var a=this.$children[4].$el
        //     // console.log(this)
        //     let event = new Event('change');
        //     let inputElement=this.$children[4].$el.querySelector('input')
        //     // console.log(inputElement)
        //     inputElement.dispatchEvent(event)
        //     console.log('hi')
        // },1000)

        // setInterval(()=>{
        //     this.message=this.message+'1'
        // },1000)
        this.$toast('你的智商需要充值！',{
            closeButton: {
                text: '已充值',
                callback() {
                    console.log('他说已经充值智商了')
                }
            },
            autoClose:false,
            autoCloseDelay:3,
            enableHtml: false,
            position:'middle'
        })



    },
    methods:{
        showToast(){
        }
    }
})

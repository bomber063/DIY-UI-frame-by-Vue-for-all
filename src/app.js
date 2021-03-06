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
import Tabs from './tabs'
import TabsHead from './tabs-head'
import TabsItem from './tabs-item'
import TabsBody from './tabs-body'
import TabsPane from './tabs-pane'
import Popover from './popover'
import Collapse from './collapse'
import CollapseItem from './collapse-item'


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
Vue.component('g-tabs', Tabs)
Vue.component('g-tabs-item', TabsItem)
Vue.component('g-tabs-body', TabsBody)
Vue.component('g-tabs-pane', TabsPane)
Vue.component('g-tabs-head', TabsHead)
Vue.component('g-popover', Popover)
Vue.component('g-collapse', Collapse)
Vue.component('g-collapse-item', CollapseItem)



// console.log(Button.props.loading)
new Vue({
    el: '#app',
    data: {
        selectedTab:['2','1'],
        message:'hi',
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
        // this.eventBus.$on('update:selected',(name)=>{
        //     this.selectedTab=name
        // })




    },
    methods:{
            inputChange(e) {
                console.log(e)
        },
        yyy(){
          console.log('yyy')
        },
        showToastTop() {
            this.showToast('top')
        },
        showToastMiddle() {
            this.showToast('middle')
        },
        showToastBottom() {
            this.showToast('bottom')
        },
        showToast(position){
            this.$toast(`你的智商为${parseInt(Math.random()*100)}需要充值！`,{
                closeButton: {
                    text: '已充值',
                    callback() {
                        console.log('他说已经充值智商了')
                    }
                },
                autoClose:3,
                // autoCloseDelay:3,
                enableHtml: false,
                position
            })
        }
    }
})

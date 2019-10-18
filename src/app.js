import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'
import Input from './input'

Vue.component('g-button', Button)
Vue.component('g-icon', Icon)
Vue.component('g-button-group', ButtonGroup)
Vue.component('g-input', Input)

// console.log(Button.props.loading)
new Vue({
    el: '#app',
    data: {
        loading1: false,
        loading2: true,
        loading3: false
    },
    created(){
        setTimeout(()=>{
            // var a=this.$children[4].$el
            // console.log(this)
            let event = new Event('change');
            let inputElement=this.$children[4].$el.querySelector('input')
            // console.log(inputElement)
            inputElement.dispatchEvent(event)
            console.log('hi')
        },1000)

    },
    methods:{
        inputChange(e){
            console.log(e)
        }
    }
})

// let vm
// const Constructor = Vue.extend(Input)
//
//
//     vm = new Constructor({}).$mount()
//     vm.$on('changea',function(){console.log(1)})
//     // vm.$emit('changea',$event)
//     // var a=vm.$children('input').$on('change',callback)
//     var event = new Event('change');
//     let inputElement=vm.$el.querySelector('input')
//     inputElement.addEventListener('change', function (e) { console.log(e) }, false);
//     inputElement.dispatchEvent(event)
//     console.log(event)
//     // vm.$emit('changea',callback)


// console.log(a.$el)

// console.log(a.$el.data===a.data)

// console.log(a)

//单元测试
//一个测试代码是测试输入一个icon:setting，得到对应的xlink:href是否与#i-setting匹配。
// import chai from 'chai'
// import spies from 'chai-spies'
//
// chai.use(spies)
// const expect = chai.expect
//
// try {
//     {
//         const Constructor = Vue.extend(Button)
//         const vm = new Constructor({
//             propsData: {
//                 icon: 'setting'
//             }
//         })
//         vm.$mount(test)
//         let useElement = vm.$el.querySelector('use')
//         expect(useElement.getAttribute('xlink:href')).to.equal('#i-setting')//这个看起来很像英文的写法
//         // console.assert(useElement.getAttribute('xlink:href')==='#i-setting') 这个JS语法的写法
//         vm.$el.remove()//测试完后为了不增加页面多余的button和内存最好移除。
//         vm.$destroy()//测试完后为了不增加多余内存最好移除。
//     }
//
// //测试输入一个icon:setting并且loadings:true，得到对应的xlink:href是否与#i-loading匹配。也就是loading在true的时候隐藏掉icon，只显示loading
//     {
//         const Constructor = Vue.extend(Button)
//         const vm = new Constructor({
//             propsData: {
//                 icon: 'setting',
//                 loadings: true
//             }
//         })
//         vm.$mount()
//         let useElement = vm.$el.querySelector('use')
//         expect(useElement.getAttribute('xlink:href')).to.equal('#i-loading')
//
//         vm.$el.remove()//测试完后为了不增加页面多余的button和内存最好移除。
//         vm.$destroy()//测试完后为了不增加多余内存最好移除。
//     }
//
// //测试svg的order,order就是顺序，也就是左边还是右边
//     {
//         const div = document.createElement('div')
//         document.body.appendChild(div)
//         const Constructor = Vue.extend(Button)
//         const vm = new Constructor({
//             propsData: {
//                 icon: 'setting'
//                 // iconPosition:'right'
//             }
//         })
//         vm.$mount(div)
//         let svg = vm.$el.querySelector('svg')
//         let order = window.getComputedStyle(svg).order
//         expect(order).to.equal('1')//因为CSS所有的属性值都是字符串，所以这个是字符串'1'.这里默认的就是order 1
//
//         vm.$el.remove()//测试完后为了不增加页面多余的button和内存最好移除。
//         vm.$destroy()//测试完后为了不增加多余内存最好移除。
//     }
//
//     {
//         const div = document.createElement('div')
//         document.body.appendChild(div)
//         const Constructor = Vue.extend(Button)
//         const vm = new Constructor({
//             propsData: {
//                 icon: 'setting',
//                 iconPosition: 'right'
//             }
//         })
//         vm.$mount(div)
//         let svg = vm.$el.querySelector('svg')
//         let order = window.getComputedStyle(svg).order
//         expect(order).to.equal('2')//这里iconPosition:'right',所以的order就是'2'
//
//         vm.$el.remove()//测试完后为了不增加页面多余的button和内存最好移除。
//         vm.$destroy()//测试完后为了不增加多余内存最好移除。
//     }
//
// //如果只是通过设置属性这样的方式也可以，代码也比较简答
//     {
//         const div = document.createElement('div')
//         document.body.appendChild(div)
//         const Constructor = Vue.extend(Button)
//         const vm = new Constructor({
//             propsData: {
//                 icon: 'setting',
//                 iconPosition: 'right'
//             }
//         })
//         vm.$mount(div)
//         // let svg=button.$el.querySelector('svg')
//         // let order=window.getComputedStyle(svg).order
//         // expect(order).to.equal('2')//这里iconPosition:'right',所以的order就是'2'
//
//         let useElement = vm.$el
//         expect(useElement.getAttribute('class')).to.equal('g-button icon-right')
//
//         vm.$el.remove()//测试完后为了不增加页面多余的button和内存最好移除。
//         vm.$destroy()//测试完后为了不增加多余内存最好移除。
//     }
//
// //触发click的测试
//     {
//         const div = document.createElement('div')
//         document.body.appendChild(div)
//         const Constructor = Vue.extend(Button)
//         const vm = new Constructor({
//             propsData: {
//                 icon: 'setting',
//                 iconPosition: 'right'
//             }
//         })
//         vm.$mount(div)
//         vm.$on('click', function () {
//             console.log(1)
//         })
//         // vm.$emit('click')//下面的代码其实就是这句的意思，效果是一样的。
//         vm.$el.click()
//
//
//         vm.$el.remove()//测试完后为了不增加页面多余的button和内存最好移除。
//         vm.$destroy()//测试完后为了不增加多余内存最好移除。
//     }
//
// // 用mock触发click的测试，点击事件测试不需要挂到到某个div上面。
//     {
//         // const div=document.createElement('div')
//         // document.body.appendChild(div)
//         const Constructor = Vue.extend(Button)
//         const vm = new Constructor({
//             propsData: {
//                 icon: 'setting',
//                 iconPosition: 'right'
//             }
//         })
//         //用spy来监听function(){}函数
//         let spy = chai.spy(function () {
//         })
//         vm.$mount()
//         vm.$on('click', spy)//click来触发这个spy函数，前面spy已经监听了function(){}
//         vm.$el.click()//在根元素上触发这个click事件，也就是执行了这个click事件，也就是调用了click
//         expect(spy).to.have.been.called()//我们期待spy这个间谍已经被调用了
//
//         vm.$el.remove()//测试完后为了不增加页面多余的button和内存最好移除。
//         vm.$destroy()//测试完后为了不增加多余内存最好移除。
//     }
// }catch(error){
//     // console.dir(error)
//     window.errors=[error]//如果前面的try报错，那么报错信息就是这个参数error，这里只是给window增加一个errors的属性，它的值赋值为数组[error]，这个error是一个对象，它有message和stack等属性。
//     // window.errors=[error]
// }finally{
//     window.errors&&window.errors.forEach((error)=>{//如果window.errors存在的前提，就把window.errors通过遍历并按照报错的方式打印出error的message属性
//         console.error(error.message)
//     })
// }

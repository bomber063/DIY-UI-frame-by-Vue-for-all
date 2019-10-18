const expect = chai.expect;
import Vue from 'vue'
import Input from '../src/input'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Input', () => {
    '可以设置icon'
    it('存在.', () => {
        expect(Input).to.exist
    })
    describe('props', () => {
        let vm
        const Constructor = Vue.extend(Input)
        afterEach(function() {
            vm.$destroy()
        });
        it('可以接收value.', () => {
            vm = new Constructor({
                propsData: {
                    valuea: 'settings'
                }
            }).$mount()
            const inputElement = vm.$el.querySelector('input')
            // expect(inputElement.getAttribute('value')).to.equal('settings')//这个在这里是有问题的，可能value是一个JS语法对象
            expect(inputElement.value).to.equal('settings')
        })
        it('可以接收disabled.', () => {
            vm = new Constructor({
                propsData: {
                    disableda: true
                }
            }).$mount()
            const inputElement = vm.$el.querySelector('input')
            expect(inputElement.disabled).to.equal(true)
        })
        it('可以接收readOnly.', () => {
            vm = new Constructor({
                propsData: {
                    readonlya: true
                }
            }).$mount()
            const inputElement = vm.$el.querySelector('input')
            expect(inputElement.readOnly).to.equal(true)//需要注意这里的readOnly的O必须是大写的，可能是这个API就是这样规定的吧
        })
        it('可以接收error,并显示error的信息.', () => {
            vm = new Constructor({
                propsData: {
                    errora: '你错了'
                }
            }).$mount()
            const inputElement = vm.$el.querySelector('use')
            const spanElement = vm.$el.querySelector('span')
            expect(inputElement.getAttribute('xlink:href')).to.equal('#i-error')//这个因为input本省就已经传了name=error了
            expect(spanElement.innerHTML).to.equal('你错了')//这个因为我们用的自定义属性是errora，我们这里传的是'你错了'
        })
    })
    describe('事件测试',()=>{
        let vm
        const Constructor = Vue.extend(Input)
        afterEach(function() {
            vm.$destroy()
        })
        it('支持change事件',()=>{
            vm = new Constructor({}).$mount()

            const callback=sinon.fake()
            vm.$on('changea',callback)
            // var a=vm.$children('input').$on('change',callback)
            var event = new Event('change');
            let inputElement=vm.$el.querySelector('input')
            // inputElement.addEventListener('change', function (e) { console.log(e) }, false);
            inputElement.dispatchEvent(event)
            // vm.$emit('changea',callback)
            expect(callback).to.have.been.calledWith(event)
        })
        it('支持blur事件',()=>{
            vm = new Constructor({}).$mount()

            const callback=sinon.fake()
            vm.$on('blura',callback)
            // var a=vm.$children('input').$on('change',callback)
            var event = new Event('blur');
            let inputElement=vm.$el.querySelector('input')
            // inputElement.addEventListener('change', function (e) { console.log(e) }, false);
            inputElement.dispatchEvent(event)
            // vm.$emit('changea',callback)
            expect(callback).to.have.been.calledWith(event)
        })
        it('支持focus事件',()=>{
            vm = new Constructor({}).$mount()

            const callback=sinon.fake()
            vm.$on('focusa',callback)
            // var a=vm.$children('input').$on('change',callback)
            var event = new Event('focus');
            let inputElement=vm.$el.querySelector('input')
            // inputElement.addEventListener('change', function (e) { console.log(e) }, false);
            inputElement.dispatchEvent(event)
            // vm.$emit('changea',callback)
            expect(callback).to.have.been.calledWith(event)
        })
        it('支持input事件',()=>{
            vm = new Constructor({}).$mount()

            const callback=sinon.fake()
            vm.$on('inputa',callback)
            // var a=vm.$children('input').$on('change',callback)
            var event = new Event('input');
            let inputElement=vm.$el.querySelector('input')
            // inputElement.addEventListener('input', function (e) { console.log(e) }, false);
            inputElement.dispatchEvent(event)
            // vm.$emit('changea',callback)
            expect(callback).to.have.been.calledWith(event)
        })
    })
})


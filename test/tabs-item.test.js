const expect = chai.expect;
import Vue from 'vue'
import Tabs from '../src/tabs'
import TabsHead from '../src/tabs-head'
import TabsBody from '../src/tabs-body'
import TabsItem from '../src/tabs-item'
import TabsPane from '../src/tabs-pane'

Vue.component('g-tabs', Tabs)
Vue.component('g-tabs-body', TabsBody)
Vue.component('g-tabs-head', TabsHead)
Vue.component('g-tabs-item', TabsItem)
Vue.component('g-tabs-pane', TabsPane)

Vue.config.productionTip = false
Vue.config.devtools = false

describe('TabsItem', () => {
    it('存在TabsItem', () => {
        expect(TabsItem).to.exist
    })
    it('可以接收name属性.', () => {
        const Constructor = Vue.extend(TabsItem)
        const vm = new Constructor({
            propsData: {
                name: 'xxx'
            }
        }).$mount()
        expect(vm.$el.getAttribute('data-name')).to.equal('xxx')
    })
    it('可以接收disabled属性,测试false的时候.', () => {
        const Constructor = Vue.extend(TabsItem)
        const vm = new Constructor({
            propsData: {
                disabled: false
            }
        }).$mount()
        // console.log(vm.$el)
        expect(vm.$el.classList.contains('disabled')).to.equal(false)

        const callback = sinon.fake();
        // const callback=function(){}
        vm.$on('click', callback)
        vm.$el.click()
        expect(callback).to.have.been.called
    })
    it('可以接收disabled属性,测试true的时候.', () => {
        const Constructor = Vue.extend(TabsItem)
        const vm = new Constructor({
            propsData: {
                disabled: true
            }
        }).$mount()
        // console.log(vm.$el)
        expect(vm.$el.classList.contains('disabled')).to.equal(true)

        const callback = sinon.fake();
        // const callback=function(){}
        vm.$on('click', callback)
        vm.$el.click()
        expect(callback).to.have.not.been.called
    })

})
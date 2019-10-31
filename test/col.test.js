import {describe} from "mocha";

const expect = chai.expect;
import Vue from 'vue'
import Col from '../src/col'
import * as chai from "chai";

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Col', () => {
    '存在Col'
    it('存在.', () => {
        expect(Col).to.exist
    })
    it('接受span属性',()=>{
        const div=document.createElement('div');
        document.body.appendChild(div);
        const Constructor = Vue.extend(Col);
        const vm = new Constructor({
            propsData: {
                span: '3'
            }
        }).$mount(div);//因为要用到CSS属性没所以需要渲染后，所以要挂载到div上面
        const col= vm.$el;//因为挂载到div上面，所以就在div根元素就是div自己。
        expect(col.classList.contains('col-3')).to.equal(true)
        div.remove()
        vm.$destroy()
    })
    it('接受offset属性',()=>{
        const div=document.createElement('div');
        document.body.appendChild(div);
        const Constructor = Vue.extend(Col);
        const vm = new Constructor({
            propsData: {
                offset: '3'
            }
        }).$mount(div);//因为要用到CSS属性没所以需要渲染后，所以要挂载到div上面
        const col= vm.$el;//因为挂载到div上面，所以就在div根元素就是div自己。
        expect(col.classList.contains('offset-3')).to.equal(true)
        div.remove()
        vm.$destroy()
    })
    it('接受ipad属性',()=>{
        const div=document.createElement('div');
        document.body.appendChild(div);
        const Constructor = Vue.extend(Col);
        const vm = new Constructor({
            propsData: {
                ipad: {
                    span:3,
                    offset:4
                }
            }
        }).$mount(div);//因为要用到CSS属性没所以需要渲染后，所以要挂载到div上面
        const col= vm.$el;//因为挂载到div上面，所以就在div根元素就是div自己。
        expect(col.classList.contains('col-ipad-3')).to.equal(true)
        expect(col.classList.contains('offset-ipad-4')).to.equal(true)
        div.remove()
        vm.$destroy()
    })
    it('接受narrowPc属性',()=>{
        const div=document.createElement('div');
        document.body.appendChild(div);
        const Constructor = Vue.extend(Col);
        const vm = new Constructor({
            propsData: {
                narrowPc: {
                    span:3,
                    offset:4
                }
            }
        }).$mount(div);//因为要用到CSS属性没所以需要渲染后，所以要挂载到div上面
        const col= vm.$el;//因为挂载到div上面，所以就在div根元素就是div自己。
        expect(col.classList.contains('col-narrow-pc-3')).to.equal(true)
        expect(col.classList.contains('offset-narrow-pc-4')).to.equal(true)
        div.remove()
        vm.$destroy()
    })
    it('接受pc属性',()=>{
        const div=document.createElement('div');
        document.body.appendChild(div);
        const Constructor = Vue.extend(Col);
        const vm = new Constructor({
            propsData: {
                pc: {
                    span:3,
                    offset:4
                }
            }
        }).$mount(div);//因为要用到CSS属性没所以需要渲染后，所以要挂载到div上面
        const col= vm.$el;//因为挂载到div上面，所以就在div根元素就是div自己。
        expect(col.classList.contains('col-pc-3')).to.equal(true)
        expect(col.classList.contains('offset-pc-4')).to.equal(true)
        div.remove()
        vm.$destroy()
    })
    it('接受widePc属性',()=>{
        const div=document.createElement('div');
        document.body.appendChild(div);
        const Constructor = Vue.extend(Col);
        const vm = new Constructor({
            propsData: {
                widePc: {
                    span:3,
                    offset:4
                }
            }
        }).$mount(div);//因为要用到CSS属性没所以需要渲染后，所以要挂载到div上面
        const col= vm.$el;//因为挂载到div上面，所以就在div根元素就是div自己。
        expect(col.classList.contains('col-wide-pc-3')).to.equal(true)
        expect(col.classList.contains('offset-wide-pc-4')).to.equal(true)
        div.remove()
        vm.$destroy()
    })

})
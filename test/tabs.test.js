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

describe('Tabs', () => {
    it('存在Tabs', () => {
        expect(Tabs).to.exist
    })
    // it('子组件只能使 tabs-head和tabs-body',()=>{//这个测试框架默认打印一次之后会马上退出，如果要等异步的函数，需要用到这个done
    //     Vue.component('g-tabs-body', TabsBody)
    //     Vue.component('g-tabs-head', TabsHead)
    //     const div=document.createElement('div');
    //     document.body.appendChild(div);
    //     div.innerHTML=`
    //     <g-tabs>
    //         <div></div>
    //     </g-tabs>
    //     `
    //
    //     // var badFn = function () {
    //     //     throw new TypeError('Illegal salmon!');
    //     // };
    //
    //     expect(
    //         // setTimeout(()=>{
    //             function(){throw new Error('hi')}
    //         // },0)
    //     ).to.throw();
    // })
    it('可以接受selected属性',(done)=>{

            const div=document.createElement('div');
            document.body.appendChild(div);
            div.innerHTML=`
    <g-tabs selected="finance">
        <g-tabs-head>
            <g-tabs-item name="woman">美女</g-tabs-item>
            <g-tabs-item name="finance">财经</g-tabs-item>
            <g-tabs-item name="sports">体育</g-tabs-item>
        </g-tabs-head>
        <g-tabs-body>
            <g-tabs-pane name="woman"> 美女相关资讯 </g-tabs-pane>
            <g-tabs-pane name="finance"> 财经相关资讯 </g-tabs-pane>
            <g-tabs-pane name="sports"> 体育相关资讯 </g-tabs-pane>
        </g-tabs-body>
    </g-tabs>
            `
            let vm=new Vue({
                el:div
            });
            // setTimeout(()=>{
            //      console.log(vm.$el.outerHTML)
                // done()
            // },1000)
            vm.$nextTick(()=>{
                let item=document.querySelector('.tabs-item[data-name="finance"]')
                // console.log(vm.$el.outerHTML)
                expect(item.classList.contains('active')).to.be.true
                done()
            })
    });
    it('可以接受direction属性',()=>{

    });
})
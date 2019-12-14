const expect = chai.expect;
import Vue from 'vue'
import Popover from '../src/popover'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Popover', () => {
    '可以设置popover'
    it('存在.', () => {
        expect(Popover).to.exist
    })
    it('可以接受position属性',(done)=>{
        Vue.component('g-popover',Popover)
        const div=document.createElement('div');
        document.body.appendChild(div);
        div.innerHTML=`
    <g-popover position="bottom" ref="a">
        <template slot="content">
            弹出内容
        </template>
        <button>点我</button>
    </g-popover>
            `
        let vm=new Vue({
            el:div
        });
        // vm.$nextTick(()=>{
            //这里要点击是因为刚开始的visible是false
            vm.$el.querySelector('button').click()
            // console.log(vm.$el.outerHTML)
            setTimeout(()=>{//点击之后延迟才可以得到结果
                // console.log(`vm.$refs.a.$refs.contentWrapper`)
                // console.log(vm.$el.querySelector('div'))
                //下面的代码其实也就是上面的，因为vm是div，组件在这个div里面，所以需要在div里面获取到这个组件
                // console.log(vm.$refs.a.$refs.contentWrapper)
                const {contentWrapper}=vm.$refs.a.$refs;
                expect(contentWrapper.classList.contains('position-bottom')).to.be.true
                done()
            });

            // expect(item.classList.contains('active')).to.be.true
        // })
    });
})
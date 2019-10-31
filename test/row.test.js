const expect = chai.expect;
import Vue from 'vue'
import Row from '../src/row'
import Col from '../src/col'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Row', () => {
    '存在Row'
    it('存在.', () => {
        expect(Row).to.exist
    })
    it('接受gutter属性',(done)=>{//这个测试框架默认打印一次之后会马上退出，如果要等异步的函数，需要用到这个done
        Vue.component('g-row',Row)
        Vue.component('g-col',Col)
        const div=document.createElement('div');
        document.body.appendChild(div);
        //用js代码暂时搜索不到怎么写，但是可以用下面的html标签的方法。
        div.innerHTML=`
        <g-row gutter="20" align="center">
            <g-col span="12"></g-col>
            <g-col span="12"></g-col>
        </g-row>
        `
        const vm=new Vue({
            el:div
        })
        // console.log(vm.$el.outerHTML)
        console.log(vm.$el.outerHTML)//这里的padding-left和right是0px

        setTimeout(()=>{

            console.log('我是setTimeout',vm.$el.outerHTML)//这里的padding-left和right是10px
            const cols=vm.$el.querySelectorAll('.col')
            const row=vm.$el.querySelector('.row')


            console.log(cols)
            expect(getComputedStyle(row).marginRight).to.equal('-10px')//这里需要用到window.getComputedStyle
            expect(getComputedStyle(row).marginLeft).to.equal('-10px')//这里需要用到window.getComputedStyle


            expect(getComputedStyle(cols[0]).paddingRight).to.equal('10px')//这里需要用到window.getComputedStyle
            expect(getComputedStyle(cols[1]).paddingLeft).to.equal('10px')//这里需要用到window.getComputedStyle

            done()//这个测试框架默认打印一次之后会马上退出，如果要等异步的函数，需要调用这个done,也就是done()
            vm.$el.remove()
            vm.$destroy()//这个销毁也要写到异步函数里面


        },0)//就算设置为0也是异步，就是下一次的时候在打印



        // vm.$destroy();//如果设置了这个就清楚了vm，清除vm是在异步之前，那么就导致打印的padding-left和right都是0px

    })
    it('可以接收align属性', () => {
        const div=document.createElement('div');
        document.body.appendChild(div);
        const Constructor = Vue.extend(Row);
        const vm = new Constructor({
            propsData: {
                align: 'left'
            }
        }).$mount(div);//因为要用到CSS属性没所以需要渲染后，所以要挂载到div上面
        const row= vm.$el;//因为挂载到div上面，所以就在div根元素就是div自己。
        //element.querySelector()是找element元素的第一个子元素的选择器。
        //document.querySelector()是找html根元素第一个元素的选择器
        expect(getComputedStyle(row).justifyContent).to.equal('flex-start')//这里需要用到window.getComputedStyle
        div.remove()
        vm.$destroy()
    })
})


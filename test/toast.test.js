const expect = chai.expect;
import Vue from 'vue'
import Toast from '../src/toast'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Toast', () => {
    '可以设置Toast'
    it('存在Toast', () => {
        expect(Toast).to.exist
    })
    'props测试'
    describe('props', function() {//这里只需要测试这个vm实例上面的元素不见了即可
        //这里设置this.timeout15秒的时间，必须上面不能是箭头函数，箭头函数的this不能外面传进来
        // this.timeout(15000)
        it('接受autoClose,同时这里也测试了close事件', (done) => {
            let div=document.createElement('div')
            document.body.appendChild(div)
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    autoClose: 1
                }
            }).$mount(div)
            //下面这里也测试了close事件
            vm.$on('beforeClose',()=>{//因为在toast.vue组件里面close事件里面会触发一个`this.$emit('beforeClose')`，也就是当关闭的时候会触发beforeClose事件
                    expect(document.body.contains(vm.$el)).is.equal(false);
                    done()
            })

            // setTimeout(()=>{//这里用vm.$nextTick()就不用设置延迟事件了
            //     //这里我之前忘记在contains里面写vm.$el了。所以一直测试都是true
            //     expect(document.body.contains(vm.$el)).is.equal(false)
            //     done()
            // },1500)//这个时间比前面的autoCloseDelay事件要大就代表已经关闭不见了。
        });
        it('接受closeButton,我自己用异步的方式，同时也测试了onClickClose事件和close事件。这个方法在app.js里面测试不报错', (done) => {
            const callback=sinon.fake()
            // let div=document.createElement('div')
            // document.body.appendChild(div)
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    closeButton: {
                        text:'你好',
                        callback(){},
                    }
                }
            }).$mount()

            let text=vm.$el.querySelector('.close').textContent.trim();
            // setInterval(()=>{//因为在toast里面的updateStyles方法是延迟的，所以这里也必须要延迟，不然会报错
            //     vm.$el.querySelector('.close').click()
            expect(text).is.equal('你好');
            setTimeout(()=>{
            //    下面的点击之后就会触发toast.vue中的onClickClose事件和close事件
            vm.$el.querySelector('.close').click()
            expect(callback).to.have.been.called
            },0)
            done()
        });
        it('接受closeButton,这里老师写的，没有用异步,同时也测试了onClickClose事件和close事件', () => {
            //此方法在app.js里面测试会报错 Cannot read property 'style' of undefined,也就是updateStyles函数报错，可能是因为获取不到这里的style吧
            const callback=sinon.fake()
            // let div=document.createElement('div')
            // document.body.appendChild(div)
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    closeButton: {
                        text:'你好',
                        callback
                    }
                }
            }).$mount()
                let text=vm.$el.querySelector('.close').textContent.trim();
                // setInterval(()=>{//因为在toast里面的updateStyles方法是延迟的，所以这里也必须要延迟，不然会报错
                //     vm.$el.querySelector('.close').click()
                expect(text).is.equal('你好');
            //    下面的点击之后就会触发toast.vue中的onClickClose事件和close事件
                vm.$el.querySelector('.close').click()
                expect(callback).to.have.been.called
                // },1000)

                // done()

        })
        it('接受enableHtml,我自己用的找字符串办法', () => {
            //这里不需要原生代码把组件放到body上面，因为没有用到style
            // let div=document.createElement('div')
            // document.body.appendChild(div)
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    enableHtml: false
                }
            })
            vm.$slots.default='<h1>你好</h1>'
            vm.$mount()
            let message=vm.$el.querySelector('.message').textContent.trim()
            //下面的也可以是想，只是上面的textContent会把空格也包括了，所以需要trim去掉空格
            // let message=vm.$el.querySelector('.message').innerText
            expect(message).is.equal('<h1>你好</h1>')
                //如果是true就是你好,没有标签
            // expect(message).is.equal('你好')

        })
        it('接受enableHtml,这是老师用的找标签方法', () => {
            //这里不需要原生代码把组件放到body上面，因为没有用到style
            // let div=document.createElement('div')
            // document.body.appendChild(div)
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    enableHtml: true
                }
            })
            vm.$slots.default='<strong id="test">hi</strong>'
            vm.$mount()
            let strong=vm.$el.querySelector('#test')
            expect(strong).to.exist
        })
        it('接受position', () => {
            //这里不需要原生代码把组件放到body上面，因为没有用到style
            // let div=document.createElement('div')
            // document.body.appendChild(div)
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    position: 'top'
                }
            }).$mount()
            let position=vm.$el.classList.contains('position-top')
            expect(position).is.equal(true)
        })
    })
})


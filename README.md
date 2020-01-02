## 完善官网页面的其他组件
* 正则表达式标志m	
    * 多行搜索。
* [正则表达式的量词](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers)
### button组件
* 增加了部分代码，其中下面这行代码，是前面需要空12个字符，也就是前面已经默认空出了4个字符了。
* 由这个
```
.replace(/\t+| +/g, '').trim()
```
* 修改为
```
    .replace(/^ {8}/gm, '').trim()
```
* 这么修改可能是为了在JS代码中比较好看，因为JS代码会有格式化的效果。
### tabs组件
* 这里发现原来的代码有存在问题，原来的代码整个tabs都是贴近视口的，item的绝对定位本来是参考的位置是head，此时head的边界和视口的边界是一样的。所以绝对定位和getBoundingClientRect()都是**靠在最左边的**。那么计算结果就相同，那么就没有发现这个问题。
* 但是我们部署的时候视口边界和item的绝对定位的参考位置head不同。所以需要减去它
* 修改的代码
```
    <div class="tabs-head" ref="head">

    mounted(){
        this.eventBus.$on('update:selected',(name,vm)=> {
            //left是点击的item组件的距离视口左边的距离
            let {width,height,top,left}=vm.$el.getBoundingClientRect();
            //left2是head组件距离视口左边的距离
            let {left: left2} = this.$refs.head.getBoundingClientRect()
            this.$refs.line.style.width=`${width}px`;
            //item在head里面，那么肯定是item距离左边视口要大，这部分大的就是多余的，减去这部分多余的就符合了距离要求了
            this.$refs.line.style.left=`${left-left2}px`;
        })
    }
```
### input组件
* 因为组件里面用的是inputa和valuea,所以用不了v-model,如果需要用v-model就需要把inputa修改为input,valuea修改为value才可以哦。
* 一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件,但是我们之前的用的是valuea和inputa，所以是不可以使用v-model的。
```
        <g-input :valuea="value" @inputa="value=$event"></g-input>
<!--        因为组件里面用的不是value和input所以用不了v-model-->
<!--        <g-input v-model="value"></g-input>-->
        <div>
            value: {{value}}
        </div>
```
### grid组件
* 这个好像没有特别说明的，这里就是代码比较多，但是其实逻辑比较简单。

### layout组件
* 这个好像没有特别说明的.






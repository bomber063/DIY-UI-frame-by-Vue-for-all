<template>
    <div class="collapse">
        <slot></slot>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: "GuluCollapse",
        props:{
          single:{
              type:Boolean,
              default:false
          },
          selected:{
              type:Array
          }
        },
        data(){
            return {
                eventBus:new Vue()
            }
        },
        provide(){
            // if (this.single) {
                return {
                    eventBus: this.eventBus
                }
            // }
        },
        mounted(){
            this.eventBus.$emit('update:selected',this.selected)//这里是默认的触发，并不需要点击触发。
            this.eventBus.$on('update:addSelected',(name)=>{
                let selectedCopy=JSON.parse(JSON.stringify(this.selected));
                if(this.single){
                    selectedCopy=[name];
                }
                else{
                    selectedCopy.push(name)
                }
                this.$emit('update:selected',selectedCopy)//这个name传出去给了index.html，是用$event来代替的
                this.eventBus.$emit('update:selected',selectedCopy)//这里当触发增加事件的时候通知eventBus，并传值
            })
            this.eventBus.$on('update:removeSelected',(name)=>{
                let selectedCopy=JSON.parse(JSON.stringify(this.selected));

                let index=selectedCopy.indexOf(name)
                selectedCopy.splice(index,1)
                this.$emit('update:selected',selectedCopy)//这个name传出去给了index.html，是用$event来代替的
                this.eventBus.$emit('update:selected',selectedCopy)//这里当触发减少事件的时候通知eventBus，并传值
            })
            // this.$children.forEach((vm)=>{
            //     vm.single=this.single
            // })
        }
    }
</script>

<style scoped lang="scss">
    $grey:#ddd;
    $border-radius:4px;
    .collapse{
        border: 1px solid $grey;
        border-radius: $border-radius;
    }
</style>
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
              type:String
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
            // this.eventBus.$emit('update:selected',this.selected)//老师加了这句话，这句话不用写，因为触发的地方在子组件里面的@click触发的
            this.eventBus.$on('update:selected',(name)=>{
                this.$emit('update:selected',name)//这个name传出去给了index.html，是用$event来代替的
            })
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
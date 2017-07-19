<style scoped lang='stylus'>
</style>
<template>
   <div v-screen>
      <p v-color="'red'">文字</p>
      <p>{{todos}}</p>
      <p>
         <input type="text" v-model.trim="txt">
         <button @click="add">新增</button>
      </p>
      <ul>
         <li is="todos" v-for="item in todos" :item="item"></li>
      </ul>
      <p>全部{{todos.length}}条 -- 未作{{this.$store.getters.weizuo.length}} -- 已作{{this.$store.getters.yizuo.length}}</p>
      <p>
         <button @click="all">查看全部</button>
         <button @click="yizuo">查看已做</button>
         <button @click="weizuo">查看未作</button>
      </p>

   </div>
</template>
<script>
import todos from "./components/todos.vue"
export default {
   directives: {
      color: {
         inserted: function(el, binding) { 
            $(el).css(binding.name, binding.value)
         }
      },
      screen: {
         bind: function(el, binding) {
            $(el).height($(window).height())
            $(el).width($(window).width())
         }
      }
   },
   data() {
      return {
         state: "all",
         txt: ''
      }
   },
   created() {
      this.$store.dispatch("GETALL")
   },
   computed: {
      todos() {
            if (this.state == "all") {
               return this.$store.state.todos
            } else if (this.state == "yizuo") {
               console.log(this.state);
               return this.$store.getters.yizuo
            } else if (this.state == "weizuo") {
               return this.$store.getters.weizuo
            }
      }
   },
   methods: {
      all() {
         this.state = "all"
      },
      yizuo() {

         this.state = "yizuo"
      },
      weizuo() {
         this.state = "weizuo"
      },
      add() {
         if( this.txt == "") return
         var id = "";
         var str = "1230456789";
         for (var i = 0; i < 8; i++){
            id+=str[parseInt(Math.random() * str.length)]
         }
 
         this.$store.dispatch("ADD",{
            id : id,
            title : this.txt
         })
         this.txt = ""

      }
   },
   components: {
      todos
   }
}
</script>
